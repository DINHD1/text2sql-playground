import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden bg-gradient-primary py-20 md:py-32">
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      
      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
            <Sparkles className="h-4 w-4 text-white" />
            <span className="text-sm font-medium text-white">
              Powered by Gemini & Gemma AI
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Chuyển đổi câu hỏi thành
            <br />
            <span className="text-secondary">SQL tự động</span>
          </h1>

          <p className="text-xl md:text-2xl text-white/90 mb-10 max-w-2xl mx-auto">
            Không cần viết code SQL phức tạp. Chỉ cần hỏi bằng ngôn ngữ tự nhiên,
            AI sẽ tạo truy vấn SQL chính xác cho bạn.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => navigate("/query")}
              className="bg-white text-primary hover:bg-white/90 shadow-glow text-lg h-14 px-8 gap-2"
            >
              Bắt đầu ngay
              <ArrowRight className="h-5 w-5" />
            </Button>
            
            <Button
              size="lg"
              variant="outline"
              onClick={() => {
                document.getElementById("features")?.scrollIntoView({ 
                  behavior: "smooth" 
                });
              }}
              className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 text-lg h-14 px-8"
            >
              Tìm hiểu thêm
            </Button>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-white/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/20 rounded-full blur-3xl"></div>
    </section>
  );
};
