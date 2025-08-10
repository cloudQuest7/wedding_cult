import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { Menu } from "lucide-react";
import SocialFloatingButton from "@/components/common/SocialFloatingButton";

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          {/* Top bar with trigger for mobile */}
          <header className="lg:hidden h-16 flex items-center px-4 border-b border-border/30 bg-background/95 backdrop-blur-md sticky top-0 z-40 shadow-sm">
            <SidebarTrigger className="p-2 hover:bg-muted/60 rounded-lg transition-all duration-200">
              <Menu className="h-5 w-5" />
            </SidebarTrigger>
            <span className="ml-3 font-playfair font-bold text-lg text-foreground">The Wedding Cult</span>
          </header>

          {/* Main content */}
          <main className="flex-1 overflow-auto">
            {children}
          </main>
        </div>

        {/* Floating Social Media Button - Adjusted position for mobile */}
        <div className="fixed right-6 bottom-28 lg:bottom-6 z-50">
          <SocialFloatingButton />
        </div>
      </div>
    </SidebarProvider>
  );
}
