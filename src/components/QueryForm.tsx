import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Sparkles, Loader2 } from "lucide-react";

interface QueryFormProps {
  onSubmit: (question: string, model: string) => void;
  isLoading: boolean;
}

export const QueryForm = ({ onSubmit, isLoading }: QueryFormProps) => {
  const [question, setQuestion] = useState("");
  const [selectedModel, setSelectedModel] = useState("gemini");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (question.trim()) {
      onSubmit(question, selectedModel);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-3">
        <Label htmlFor="question" className="text-base font-semibold">
          Đặt câu hỏi của bạn
        </Label>
        <Textarea
          id="question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="VD: top 5 sản phẩm bán chạy nhất là gì?"
          className="min-h-[120px] text-base resize-none bg-background border-2 focus:border-primary transition-smooth"
          disabled={isLoading}
        />
      </div>

      <div className="space-y-3">
        <Label className="text-base font-semibold">Chọn Model AI</Label>
        <RadioGroup
          value={selectedModel}
          onValueChange={setSelectedModel}
          className="grid grid-cols-2 gap-4"
          disabled={isLoading}
        >
          <div className="relative">
            <RadioGroupItem
              value="gemini"
              id="gemini"
              className="peer sr-only"
            />
            <Label
              htmlFor="gemini"
              className="flex flex-col items-center justify-between rounded-xl border-2 border-muted bg-card p-4 hover:bg-accent hover:border-primary cursor-pointer peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 transition-smooth"
            >
              <Sparkles className="mb-3 h-6 w-6 text-primary" />
              <div className="text-center">
                <div className="font-semibold">Gemini</div>
                <div className="text-xs text-muted-foreground mt-1">
                  Mạnh mẽ & chính xác
                </div>
              </div>
            </Label>
          </div>

          <div className="relative">
            <RadioGroupItem value="gemma" id="gemma" className="peer sr-only" />
            <Label
              htmlFor="gemma"
              className="flex flex-col items-center justify-between rounded-xl border-2 border-muted bg-card p-4 hover:bg-accent hover:border-secondary cursor-pointer peer-data-[state=checked]:border-secondary peer-data-[state=checked]:bg-secondary/5 transition-smooth"
            >
              <Sparkles className="mb-3 h-6 w-6 text-secondary" />
              <div className="text-center">
                <div className="font-semibold">Gemma</div>
                <div className="text-xs text-muted-foreground mt-1">
                  Nhanh & hiệu quả
                </div>
              </div>
            </Label>
          </div>
        </RadioGroup>
      </div>

      <Button
        type="submit"
        disabled={isLoading || !question.trim()}
        className="w-full h-12 text-base font-semibold bg-gradient-primary hover:shadow-glow transition-smooth"
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Đang xử lý...
          </>
        ) : (
          <>
            <Sparkles className="mr-2 h-5 w-5" />
            Tạo truy vấn SQL
          </>
        )}
      </Button>
    </form>
  );
};
