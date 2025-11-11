import { Database, Zap, Shield, BarChart3, Code2, Clock } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    icon: Zap,
    title: "Nhanh chóng & Chính xác",
    description: "AI hiểu câu hỏi và tạo SQL chính xác trong vài giây",
    color: "text-primary",
  },
  {
    icon: Database,
    title: "Hỗ trợ đa database",
    description: "Tương thích với SQLite, PostgreSQL, MySQL và nhiều hơn nữa",
    color: "text-secondary",
  },
  {
    icon: Code2,
    title: "Sinh SQL tối ưu",
    description: "Tự động tối ưu hóa truy vấn với JOIN, GROUP BY hiệu quả",
    color: "text-primary",
  },
  {
    icon: Shield,
    title: "An toàn & Bảo mật",
    description: "Kiểm tra và ngăn chặn SQL injection tự động",
    color: "text-secondary",
  },
  {
    icon: Clock,
    title: "Lịch sử truy vấn",
    description: "Lưu trữ và quản lý tất cả truy vấn đã thực hiện",
    color: "text-primary",
  },
  {
    icon: BarChart3,
    title: "Phân tích kết quả",
    description: "Hiển thị dữ liệu trực quan, dễ hiểu và xuất CSV",
    color: "text-secondary",
  },
];

export const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Tính năng nổi bật
          </h2>
          <p className="text-xl text-muted-foreground">
            Công nghệ AI tiên tiến giúp bạn làm việc với database dễ dàng hơn bao giờ hết
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="border-2 hover:border-primary/50 hover:shadow-elegant transition-smooth bg-gradient-card"
            >
              <CardHeader>
                <div className={`w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center mb-4`}>
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
