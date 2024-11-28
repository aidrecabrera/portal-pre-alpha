import { useMotion } from "@/components/providers/motion-provider";
import { useTheme } from "@/components/providers/theme-provider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useMediaQuery } from "@/hooks/use-media-query";
import { IRouteInterface } from "@/resources";
import { useLogout } from "@/supabase/authHooks";
import {
  CircleHelp,
  Laptop,
  LogOut,
  Menu,
  Moon,
  Pause,
  Play,
  Settings,
  Shield,
  Sparkles,
  Sun,
  User,
} from "lucide-react";
import { SemesterDropdown } from "../semester/semester-dropdown";
import { SidebarTree } from "./sidebar-tree";

export const Sidebar = ({ routes }: { routes: IRouteInterface[] }) => {
  const isMobile = useMediaQuery("(max-width: 1024px)");
  const { setTheme } = useTheme();
  const { mutate: postLogout } = useLogout();
  const { setIsMotionEnabled } = useMotion();
  const handleLogout = async () => {
    await postLogout(undefined, {
      onSuccess: () => {
        // TODO: add toast prompts
        // Clear local storage and reload the page
        window.localStorage.clear();
        window.location.reload();
      },
      onError: (error) => {
        // TODO: add toast prompts
        console.error("Failed to logout:", error);
      },
    });
  };
  const SidebarContent = () => (
    <div className="flex flex-col h-screen max-h-screen">
      <div className="flex flex-col items-center gap-2 mt-6 md:px-4">
        <Card className="flex items-center w-full gap-3 px-4 py-3 shadow-none">
          <div className="flex flex-row justify-start w-full gap-4">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-semibold tracking-tight">
                Cabrera, Aidre Love S.
              </span>
              <span className="text-xs text-muted-foreground">2023-12345</span>
            </div>
          </div>
        </Card>
        <SemesterDropdown />
      </div>
      <div className="flex-1 overflow-y-auto">
        <nav className="grid items-start py-4 text-sm font-medium md:px-4">
          <SidebarTree routes={routes} />
        </nav>
      </div>
      <div className="mt-auto sm:p-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="w-full mt-auto mb-14 sm:mb-0">
              <Button variant="outline" className="justify-start w-full py-5">
                <div className="inline-flex items-center">
                  <Settings className="w-4 h-4 mr-2 " />
                  <span>More</span>
                </div>
              </Button>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-64 mb-1">
            {/* TODO: categorize each and add support */}
            {[
              { icon: User, label: "Account", action: () => {} },
              {
                icon: Sun,
                label: "Theme",
                subItems: [
                  {
                    icon: Sun,
                    label: "Light",
                    action: () => setTheme("light"),
                  },
                  { icon: Moon, label: "Dark", action: () => setTheme("dark") },
                  {
                    icon: Laptop,
                    label: "System",
                    action: () => setTheme("system"),
                  },
                ],
              },
              {
                icon: Sparkles,
                label: "Motion",
                subItems: [
                  {
                    icon: Play,
                    label: "Enable",
                    action: () => setIsMotionEnabled(true),
                  },
                  {
                    icon: Pause,
                    label: "Disable",
                    action: () => setIsMotionEnabled(false),
                  },
                ],
              },
              { icon: Shield, label: "Security", action: () => {} },
              { icon: CircleHelp, label: "Help", action: () => {} },
              {
                icon: LogOut,
                label: "Logout",
                action: () => handleLogout(),
              },
            ].map((item, index) =>
              item.subItems ? (
                <DropdownMenuSub key={index}>
                  <DropdownMenuSubTrigger>
                    <item.icon className="w-4 h-4 mr-2" />
                    <span>{item.label}</span>
                  </DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent>
                      {item.subItems.map((subItem, subIndex) => (
                        <DropdownMenuItem
                          key={subIndex}
                          onClick={subItem.action}
                        >
                          <subItem.icon className="w-4 h-4 mr-2" />
                          <span>{subItem.label}</span>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>
              ) : (
                <DropdownMenuItem key={index} onClick={item.action}>
                  <item.icon className="w-4 h-4 mr-2" />
                  <span>{item.label}</span>
                </DropdownMenuItem>
              )
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon">
            <Menu className="w-4 h-4" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[300px] sm:w-[400px]">
          <SidebarContent />
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <div className="border-r w-72">
      <SidebarContent />
    </div>
  );
};
