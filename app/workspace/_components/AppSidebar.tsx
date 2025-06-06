"use client"
import { Button } from "@/components/ui/button"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Book, Compass, LayoutDashboard, PencilRulerIcon, UserCircle2Icon, WalletCards } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import AddNewCourseDialog from "./AddNewCourseDialog"

const SideBarOptions = [
   {
        title: 'Dashboard',
        icon: LayoutDashboard,
        path: '/workspace'
   },
   {
        title: 'My Learning',
        icon: Book,
        path: '/workspace/my-courses'
   },
   {
        title: 'Explore Courses',
        icon: Compass,
        path: '/workspace/explore'
   },
   {
        title: 'AI Tools',
        icon: PencilRulerIcon,
        path: '/workspace/ai-tools'
   },
   {
        title: 'Billing',
        icon: WalletCards,
        path: '/workspace/billing'
   },
   {
        title: 'Profile',
        icon: UserCircle2Icon,
        path: '/workspace/profile'
   },
  ]

export function AppSidebar() {
  const path = usePathname()
  return (
    <Sidebar>
      <SidebarHeader className={'items-center'}>
        <Image src={'/logo.svg'} alt="logo" width={250} height={100} />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <AddNewCourseDialog>
            <Button className={'cursor-pointer bg-purple-600 text-md'}>Create New Course</Button>
          </AddNewCourseDialog>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {SideBarOptions.map((item, index)=>(
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton asChild className={'p-5'}>
                    <Link href={item.path} className={`text-[17px]
                      ${path == item.path ? 'text-primary bg-purple-100' : ""}`}>
                        <item.icon className="h-7 w-7"/>
                        <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}
