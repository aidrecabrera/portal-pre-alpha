import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useMotion } from "./motion-provider";

export function MotionToggle() {
  const { setIsMotionEnabled } = useMotion();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <span>Toggle animations</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setIsMotionEnabled(true)}>
          Enable Animations
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setIsMotionEnabled(false)}>
          Disable Animations
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
