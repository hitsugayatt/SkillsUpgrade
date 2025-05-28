import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./_components/AppSidebar";
import AppHeader from "./_components/AppHeader";

const WorkspaceProvider = ({children} : Readonly<{children: React.ReactNode;}>) => {
  return (
    <SidebarProvider>
        <AppSidebar />
        <div className="w-full">
          <AppHeader />
          <div className="p-10">
            {children}
          </div>
        </div>
    </SidebarProvider>
  )
}
export default WorkspaceProvider