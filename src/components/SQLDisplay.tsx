import { Copy, Check } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface SQLDisplayProps {
  sql: string;
}

export const SQLDisplay = ({ sql }: SQLDisplayProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(sql);
      setCopied(true);
      toast.success("Đã sao chép SQL!");
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error("Không thể sao chép");
    }
  };

  if (!sql) return null;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold">SQL được sinh ra</h3>
        <Button
          variant="outline"
          size="sm"
          onClick={handleCopy}
          className="gap-2"
        >
          {copied ? (
            <>
              <Check className="h-4 w-4" />
              Đã sao chép
            </>
          ) : (
            <>
              <Copy className="h-4 w-4" />
              Sao chép
            </>
          )}
        </Button>
      </div>
      <div className="rounded-lg bg-muted p-4 font-mono text-sm overflow-x-auto border-2 border-border">
        <pre className="text-foreground whitespace-pre-wrap break-words">
          {sql}
        </pre>
      </div>
    </div>
  );
};
