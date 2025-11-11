import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const CTASection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 bg-gradient-primary relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      
      <div className="container mx-auto px-4 relative">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Sẵn sàng trải nghiệm?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Bắt đầu chuyển đổi câu hỏi thành SQL ngay hôm nay.
            Hoàn toàn miễn phí, không cần đăng ký.
          </p>
          <Button
            size="lg"
            onClick={() => navigate("/query")}
            className="bg-white text-primary hover:bg-white/90 shadow-glow text-lg h-14 px-8 gap-2"
          >
            Thử ngay miễn phí
            <ArrowRight className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-white/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-secondary/20 rounded-full blur-3xl"></div>
    </section>
  );
};
