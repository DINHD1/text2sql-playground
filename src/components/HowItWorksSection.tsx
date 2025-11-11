import { MessageSquare, Wand2, Database, CheckCircle } from "lucide-react";

const steps = [
  {
    icon: MessageSquare,
    title: "1. Đặt câu hỏi",
    description: "Nhập câu hỏi bằng tiếng Việt hoặc tiếng Anh",
    color: "bg-primary",
  },
  {
    icon: Wand2,
    title: "2. AI xử lý",
    description: "Model AI phân tích và sinh SQL tối ưu",
    color: "bg-secondary",
  },
  {
    icon: Database,
    title: "3. Thực thi truy vấn",
    description: "Hệ thống chạy SQL và lấy dữ liệu",
    color: "bg-primary",
  },
  {
    icon: CheckCircle,
    title: "4. Nhận kết quả",
    description: "Xem kết quả trực quan và tải xuống",
    color: "bg-secondary",
  },
];

export const HowItWorksSection = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Cách thức hoạt động
          </h2>
          <p className="text-xl text-muted-foreground">
            Chỉ 4 bước đơn giản để có truy vấn SQL hoàn hảo
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="text-center">
                <div className={`w-16 h-16 ${step.color} rounded-xl flex items-center justify-center mx-auto mb-4 shadow-glow`}>
                  <step.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>

              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-primary to-secondary -translate-x-1/2"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
