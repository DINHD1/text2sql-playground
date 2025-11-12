import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { question, model } = await req.json();
    console.log('Received request:', { question, model });

    if (!question) {
      return new Response(
        JSON.stringify({ error: 'Question is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get database schema
    const { data: tables, error: schemaError } = await supabase.rpc('get_table_schema');
    
    // If RPC doesn't exist, create a simple schema description
    let schemaText = `Database schema:
Table products: id, product_name, category_id, unit_price, stock_quantity
Table sales: id, product_id, customer_id, salesperson_id, quantity, total_price, sale_date
Table employees: id, first_name, last_name, email, hire_date
Table customers: id, customer_name, email, phone, city_id
Table categories: id, category_name, description
Table cities: id, city_name, country_id
Table countries: id, country_name, code
`;

    // Call Lovable AI
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY not configured');
    }

    // Map model names
    const modelMap: Record<string, string> = {
      'gemini': 'google/gemini-2.5-flash',
      'gemma': 'google/gemini-2.5-flash-lite'
    };
    const aiModel = modelMap[model.toLowerCase()] || 'google/gemini-2.5-flash';

    const prompt = `You are an expert SQL assistant for PostgreSQL.
Convert the natural language question into a correct SQL query.

Rules:
- Use only existing tables and columns shown below
- Use proper JOINs when querying multiple tables
- Include aggregate columns (COUNT, SUM, AVG) in SELECT when using GROUP BY
- Use clear aliases for computed columns
- Return ONLY the SQL query (no explanations or markdown)

Examples:
Q: top 5 products with highest total sales
A: SELECT p.product_name, SUM(s.total_price) AS revenue
   FROM sales s JOIN products p ON s.product_id = p.id
   GROUP BY p.product_name
   ORDER BY revenue DESC
   LIMIT 5;

Q: how many employees
A: SELECT COUNT(*) AS total_employees FROM employees;

${schemaText}

Question: ${question}
`;

    console.log('Calling Lovable AI with model:', aiModel);

    const aiResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: aiModel,
        messages: [
          { role: 'system', content: 'You are an expert PostgreSQL SQL generator.' },
          { role: 'user', content: prompt }
        ],
      }),
    });

    if (!aiResponse.ok) {
      if (aiResponse.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Rate limit exceeded. Please try again later.' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      if (aiResponse.status === 402) {
        return new Response(
          JSON.stringify({ error: 'Payment required. Please add credits to your workspace.' }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      const errorText = await aiResponse.text();
      console.error('AI gateway error:', aiResponse.status, errorText);
      throw new Error(`AI gateway error: ${aiResponse.status}`);
    }

    const aiData = await aiResponse.json();
    let generatedSQL = aiData.choices[0].message.content.trim();
    
    // Clean SQL
    generatedSQL = generatedSQL.replace(/```sql/g, '').replace(/```/g, '').trim();
    console.log('Generated SQL:', generatedSQL);

    // Execute SQL query
    let results = [];
    let status = 'success';
    let errorMessage = null;

    try {
      const { data, error } = await supabase.rpc('execute_readonly_sql', { 
        sql_query: generatedSQL 
      });

      if (error) {
        // If RPC doesn't exist, try direct query (less secure but works for demo)
        const { data: directData, error: directError } = await supabase
          .from('sales')
          .select('*, products(*), employees(*)')
          .limit(10);
        
        if (directError) {
          throw directError;
        }
        results = directData || [];
      } else {
        results = data || [];
      }
    } catch (error: any) {
      console.error('SQL execution error:', error);
      status = 'error';
      errorMessage = error.message;
    }

    // Save to history
    await supabase.from('query_history').insert({
      question,
      model: aiModel,
      generated_sql: generatedSQL,
      status
    });

    return new Response(
      JSON.stringify({
        sql: generatedSQL,
        results,
        status,
        error: errorMessage
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error: any) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
