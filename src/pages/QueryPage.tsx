import { useState } from "react";
import { QueryForm } from "@/components/QueryForm";
import { SQLDisplay } from "@/components/SQLDisplay";
import { ResultsTable } from "@/components/ResultsTable";
import { QueryHistory } from "@/components/QueryHistory";
import { Database, Sparkles, Home } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface QueryHistoryEntry {
  timestamp: string;
  question: string;
  model: string;
  sql: string;
  status: string;
}

const QueryPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [generatedSQL, setGeneratedSQL] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [history, setHistory] = useState<QueryHistoryEntry[]>([]);

  const handleQuery = async (question: string, model: string) => {
    setIsLoading(true);
    
    // Simulate API call - In real app, this would call your backend
    try {
      // Simulated delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Mock SQL generation
      const mockSQL = `SELECT p.ProductName, SUM(s.TotalPrice) AS Revenue
FROM sales s 
JOIN products p ON s.ProductID = p.ProductID
GROUP BY p.ProductName
ORDER BY Revenue DESC
LIMIT 5;`;

      setGeneratedSQL(mockSQL);

      // Mock results
      const mockResults = [
        { ProductName: "Laptop Pro", Revenue: 125000 },
        { ProductName: "Smartphone X", Revenue: 98000 },
        { ProductName: "Tablet Ultra", Revenue: 76500 },
        { ProductName: "Smartwatch", Revenue: 54200 },
        { ProductName: "Headphones", Revenue: 43100 },
      ];

      setResults(mockResults);

      // Add to history
      const newEntry: QueryHistoryEntry = {
        timestamp: new Date().toLocaleString("vi-VN"),
        question,
        model,
        sql: mockSQL,
        status: "✅ OK",
      };

      setHistory((prev) => [newEntry, ...prev]);
      toast.success("Truy vấn thành công!");
    } catch (error) {
      toast.error("Có lỗi xảy ra khi xử lý truy vấn");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadHistory = () => {
    // Convert history to CSV
    const csv = [
      ["Thời gian", "Câu hỏi", "Model", "SQL", "Trạng thái"],
      ...history.map((h) => [h.timestamp, h.question, h.model, h.sql, h.status]),
    ]
      .map((row) => row.map((cell) => `"${cell}"`).join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `query_history_${Date.now()}.csv`;
    link.click();
    toast.success("Đã tải xuống lịch sử!");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Header */}
      <header className="border-b border-border bg-gradient-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="container mx-auto px-4 py-8 relative">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-white/20 backdrop-blur-sm">
                <Database className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white">
                Text-to-SQL AI
              </h1>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate("/")}
              className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 gap-2"
            >
              <Home className="h-4 w-4" />
              Trang chủ
            </Button>
          </div>
          <p className="text-white/90 text-lg max-w-2xl">
            Chuyển đổi câu hỏi tự nhiên thành truy vấn SQL với sức mạnh của AI
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Query Form */}
          <div className="space-y-6">
            <div className="rounded-xl border-2 border-border bg-gradient-card p-6 shadow-elegant">
              <div className="flex items-center gap-2 mb-6">
                <Sparkles className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-bold">Tạo truy vấn</h2>
              </div>
              <QueryForm onSubmit={handleQuery} isLoading={isLoading} />
            </div>

            {generatedSQL && (
              <div className="rounded-xl border-2 border-border bg-gradient-card p-6 shadow-elegant animate-in fade-in slide-in-from-bottom-4 duration-500">
                <SQLDisplay sql={generatedSQL} />
              </div>
            )}
          </div>

          {/* Right Column - Results */}
          <div className="space-y-6">
            <div className="rounded-xl border-2 border-border bg-gradient-card p-6 shadow-elegant">
              <ResultsTable data={results} />
            </div>
          </div>
        </div>

        {/* Query History Section */}
        {history.length > 0 && (
          <div className="mt-12 rounded-xl border-2 border-border bg-gradient-card p-6 shadow-elegant animate-in fade-in slide-in-from-bottom-4 duration-500">
            <QueryHistory history={history} onDownload={handleDownloadHistory} />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-16 py-6">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>Powered by Gemini & Gemma AI Models</p>
        </div>
      </footer>
    </div>
  );
};

export default QueryPage;
