import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Download, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface QueryHistoryEntry {
  timestamp: string;
  question: string;
  model: string;
  sql: string;
  status: string;
}

interface QueryHistoryProps {
  history: QueryHistoryEntry[];
  onDownload?: () => void;
}

export const QueryHistory = ({ history, onDownload }: QueryHistoryProps) => {
  if (!history || history.length === 0) {
    return (
      <div className="rounded-lg border-2 border-dashed border-border bg-muted/30 p-12 text-center">
        <Clock className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
        <p className="text-muted-foreground">
          Chưa có lịch sử truy vấn
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Lịch sử truy vấn
        </h2>
        {onDownload && (
          <Button variant="outline" size="sm" onClick={onDownload} className="gap-2">
            <Download className="h-4 w-4" />
            Tải xuống CSV
          </Button>
        )}
      </div>

      <div className="rounded-lg border-2 border-border bg-card overflow-hidden">
        <ScrollArea className="h-[500px]">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50 hover:bg-muted/50">
                <TableHead className="font-semibold">Thời gian</TableHead>
                <TableHead className="font-semibold">Câu hỏi</TableHead>
                <TableHead className="font-semibold">Model</TableHead>
                <TableHead className="font-semibold">SQL</TableHead>
                <TableHead className="font-semibold">Trạng thái</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {history.map((entry, idx) => (
                <TableRow key={idx} className="hover:bg-muted/30">
                  <TableCell className="text-xs text-muted-foreground whitespace-nowrap">
                    {entry.timestamp}
                  </TableCell>
                  <TableCell className="max-w-[300px] truncate">
                    {entry.question}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={entry.model === "gemini" ? "default" : "secondary"}
                      className="capitalize"
                    >
                      {entry.model}
                    </Badge>
                  </TableCell>
                  <TableCell className="max-w-[400px]">
                    <code className="text-xs bg-muted px-2 py-1 rounded truncate block">
                      {entry.sql}
                    </code>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={entry.status === "✅ OK" ? "default" : "destructive"}
                    >
                      {entry.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </div>
    </div>
  );
};
