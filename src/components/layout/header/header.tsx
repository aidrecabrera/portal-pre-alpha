import SidebarButtonContainer from '@/components/layout/sidebar/sidebar-button-container'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from '@/components/ui/sheet'
import { routes } from '@/resources/constants'
import { useLogout } from '@/supabase/authHooks'
import { useLocation } from '@tanstack/react-router'
import { PanelLeft } from 'lucide-react'

export const Header = () => {
  const { pathname } = useLocation()
  const formattedPathname = pathname.charAt(1).toUpperCase() + pathname.slice(2)
  const { mutate: postLogout } = useLogout()
  const handleLogout = () => {
    postLogout(undefined, {
      onSuccess: () => window.location.reload(),
    })
  }
  return (
    <header className="sticky top-0 z-30 flex items-center gap-4 px-4 border-b h-14 bg-background sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline" className="sm:hidden">
            <PanelLeft className="w-5 h-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="sm:max-w-xs ">
          <SheetHeader>
            <img
              src="/cjc.png"
              alt="Cor Jesu Portal"
              className="rounded-full w-14 h-14"
            />
          </SheetHeader>
          <nav className="grid gap-2 mt-6 text-lg font-medium">
            <SidebarButtonContainer routes={routes} variant="ghost" size="lg" />
          </nav>
        </SheetContent>
      </Sheet>
      <Breadcrumb className="ml-[250px] mt-4 hidden md:flex">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="#">Portal</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="#">
              {formattedPathname ? formattedPathname : 'Dashboard'}
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="relative flex-1 mt-4 ml-auto md:grow-0" />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="overflow-hidden rounded-full sm:mt-3"
          >
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuItem>Support</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  )
}
