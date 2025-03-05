
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CollapseButtonProps {
  collapsed: boolean;
  onClick: () => void;
}

const CollapseButton = ({ collapsed, onClick }: CollapseButtonProps) => {
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={onClick}
      className="absolute top-20 -right-4 h-8 w-8 rounded-full border bg-background shadow-md"
    >
      {collapsed ? (
        <ChevronRight className="h-4 w-4" />
      ) : (
        <ChevronLeft className="h-4 w-4" />
      )}
    </Button>
  );
};

export default CollapseButton;
