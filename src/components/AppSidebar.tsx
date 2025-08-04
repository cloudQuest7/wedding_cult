import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Briefcase,
  Users,
  HelpCircle,
  Mail,
  Image,
  Heart,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";
import logo from "@/assets/new-logo.png";
import { useRef, useEffect } from "react";
import gsap from "gsap";

// Modern CTA card with particle border animation and cool hover effects
function SidebarCtaCard() {
  const cardRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const particleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power3.out", delay: 0.1 }
    );
  }, []);

  useEffect(() => {
    if (btnRef.current) {
      const btn = btnRef.current;
      const enter = () =>
        gsap.to(btn, {
          scale: 1.05,
          boxShadow: "0 12px 30px 0 #b7865a35",
          duration: 0.3,
          ease: "power2.out",
        });
      const leave = () =>
        gsap.to(btn, {
          scale: 1,
          boxShadow: "0 4px 12px 0 #b7865a15",
          duration: 0.3,
          ease: "power2.out",
        });
      btn.addEventListener("mouseenter", enter);
      btn.addEventListener("mouseleave", leave);
      return () => {
        btn.removeEventListener("mouseenter", enter);
        btn.removeEventListener("mouseleave", leave);
      };
    }
  }, []);

  // Particle border animation
  useEffect(() => {
    if (particleRef.current) {
      gsap.to(particleRef.current, {
        rotate: 360,
        duration: 4,
        ease: "none",
        repeat: -1,
      });
    }
  }, []);

  return (
    <div
      ref={cardRef}
      className="relative mx-2 mb-3 p-2.5 rounded-lg bg-white/80 backdrop-blur-sm border border-beige-warm/30 shadow-lg flex flex-col items-center gap-1.5 overflow-hidden group cursor-pointer transition-all duration-500 hover:shadow-2xl hover:bg-white/90"
      style={{
        minWidth: 0,
        userSelect: "none",
      }}
      tabIndex={-1}
      aria-label="Sidebar call to action"
    >
      {/* Animated particle border */}
      <div
        ref={particleRef}
        className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `conic-gradient(
            from 0deg,
            transparent 0deg,
            #ff6b6b 45deg,
            #4ecdc4 90deg,
            #45b7d1 135deg,
            #96ceb4 180deg,
            #ffeaa7 225deg,
            #dda0dd 270deg,
            #ff9ff3 315deg,
            transparent 360deg
          )`,
          padding: "2px",
          zIndex: 0,
        }}
      >
        <div className="w-full h-full rounded-lg bg-white/80 backdrop-blur-sm"></div>
      </div>

      {/* Particles floating effect */}
      <div className="absolute inset-0 overflow-hidden rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-700">
        <div className="particle particle-1"></div>
        <div className="particle particle-2"></div>
        <div className="particle particle-3"></div>
        <div className="particle particle-4"></div>
        <div className="particle particle-5"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center gap-1.5 w-full transition-transform duration-300 group-hover:scale-105">
        <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-chocolate/85 to-chocolate/45 flex items-center justify-center shadow-md transition-all duration-300 group-hover:shadow-lg group-hover:from-pink-500 group-hover:to-purple-500">
          <Heart className="text-cream w-3.5 h-3.5 transition-transform duration-300 group-hover:scale-110" />
        </div>
        <h3 className="font-playfair font-semibold text-xs text-chocolate mb-0.5 text-center leading-tight transition-colors duration-300 group-hover:text-purple-600">
          Ready to begin?
        </h3>
        <p className="text-xs text-muted-foreground text-center leading-snug mb-1 px-1 transition-colors duration-300 group-hover:text-gray-600">
          Let's create your perfect wedding story.
        </p>
        <Link to="/contact" tabIndex={-1} className="w-full">
          <button
            ref={btnRef}
            className="w-full bg-gradient-to-r from-chocolate to-chocolate-light hover:from-purple-500 hover:to-pink-500 text-cream font-poppins font-medium py-1.5 px-2 rounded-md shadow-sm text-xs focus:outline-none focus:ring-2 focus:ring-purple-300 transition-all duration-300"
          >
            Get Started
          </button>
        </Link>
      </div>

      <style jsx>{`

       @keyframes twinkle {
    0%, 100% { opacity: 0.3; transform: scale(0.8); }
    50% { opacity: 1; transform: scale(1.2); }
  }
  
  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    33% { transform: translateY(-10px) rotate(5deg); }
    66% { transform: translateY(5px) rotate(-3deg); }
  }
  
  @keyframes fade-in {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  .animate-twinkle { animation: twinkle linear infinite; }
  .animate-float { animation: float ease-in-out infinite; }
  .animate-fade-in { animation: fade-in 0.6s ease-out forwards; }
  .hover-scale { transition: transform 0.3s ease; }
  .hover-scale:hover { transform: scale(1.02); }
  
  .bg-gradient-radial {
    background: radial-gradient(circle, var(--tw-gradient-stops));
  }
  
  .grid {
    grid-auto-rows: 200px;
  }
  
  @media (min-width: 768px) {
    .grid {
      grid-auto-rows: 250px;
    }
  }
  
  @media (min-width: 1024px) {
    .grid {
      grid-auto-rows: 220px;
    }
  }

        .particle {
          position: absolute;
          width: 4px;
          height: 4px;
          background: #ff6b6b;
          border-radius: 50%;
          animation: float 3s ease-in-out infinite;
        }
        
        .particle-1 {
          top: 10%;
          left: 20%;
          background: #4ecdc4;
          animation-delay: 0s;
          animation-duration: 3s;
        }
        
        .particle-2 {
          top: 80%;
          right: 15%;
          background: #45b7d1;
          animation-delay: 0.5s;
          animation-duration: 3.5s;
        }
        
        .particle-3 {
          top: 60%;
          left: 10%;
          background: #ffeaa7;
          animation-delay: 1s;
          animation-duration: 2.8s;
        }
        
        .particle-4 {
          top: 30%;
          right: 25%;
          background: #dda0dd;
          animation-delay: 1.5s;
          animation-duration: 3.2s;
        }
        
        .particle-5 {
          top: 50%;
          left: 50%;
          background: #ff9ff3;
          animation-delay: 2s;
          animation-duration: 2.5s;
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) scale(0.8);
            opacity: 0.7;
          }
          50% {
            transform: translateY(-10px) scale(1.2);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}

const navigationItems = [
  { title: "Home", url: "/", icon: Home },
  { title: "Portfolio", url: "/portfolio", icon: Briefcase },
  { title: "Gallery", url: "/gallery", icon: Image },
  { title: "About & Reviews", url: "/about", icon: Users },
  { title: "FAQ", url: "/faq", icon: HelpCircle },
  { title: "Contact", url: "/contact", icon: Mail },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const isCollapsed = state === "collapsed";
  const isActive = (path: string) => currentPath === path;

  return (
    <Sidebar
      className="border-r border-border/30 bg-gradient-to-b from-background/95 via-background/80 to-background/95 backdrop-blur-sm shadow-xl"
      collapsible="icon"
      side="left"
      style={{ 
        minWidth: isCollapsed ? "60px" : "190px",
        transition: "min-width 0.4s ease" 
      }}
    >
      {/* Header & Logo */}
      <SidebarHeader
        className="p-3 border-b border-border/20 bg-gradient-to-r from-primary/10 to-secondary/10 backdrop-blur-md flex flex-col items-center"
        style={{ userSelect: "none" }}
      >
        <Link to="/" className="group flex flex-col items-center">
          <img
            src={logo}
            alt="Logo"
            className={`transition-transform duration-700 ease-in-out filter drop-shadow-xl hover:scale-105 hover:rotate-[2deg] ${
              isCollapsed ? "h-12 w-auto" : "h-32 w-auto"
            }`}
          />
        </Link>
      </SidebarHeader>

      <SidebarContent className="px-2 py-3 flex flex-col justify-between h-full">
        <div>
          {/* Navigation Group */}
          <SidebarGroup>
            <SidebarGroupLabel
              className={`font-poppins font-semibold text-xs uppercase tracking-wider text-muted-foreground/70 px-3 mb-3 ${
                isCollapsed ? "sr-only" : ""
              }`}
            >
              Navigation
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="space-y-0.5">
                {navigationItems.map((item) => {
                  const IconComponent = item.icon;
                  const active = isActive(item.url);

                  return (
                    <SidebarMenuItem key={item.title} className="relative">
                      <SidebarMenuButton
                        asChild
                        className={`group relative overflow-hidden transition-all duration-300 rounded-lg mx-0.5 py-2.5 px-2 ${
                          active
                            ? "bg-gradient-to-r from-primary/25 to-primary/10 text-primary font-semibold shadow-sm border-l-4 border-primary hover:from-primary/30 hover:to-primary/15"
                            : "hover:bg-muted/50 hover:text-primary/90"
                        }`}
                        tabIndex={0}
                        title={isCollapsed ? item.title : undefined}
                      >
                        <Link
                          to={item.url}
                          className="flex items-center space-x-2.5"
                          aria-current={active ? "page" : undefined}
                        >
                          <IconComponent
                            className={`h-5 w-5 min-w-[20px] transition-colors duration-300 ${
                              active
                                ? "text-primary drop-shadow-sm"
                                : "text-muted-foreground group-hover:text-primary/90"
                            }`}
                          />
                          {!isCollapsed && (
                            <span className="font-poppins font-medium text-sm tracking-wide select-none">
                              {item.title}
                            </span>
                          )}
                          {/* Active indicator dot */}
                          {active && !isCollapsed && (
                            <span
                              className="absolute right-3 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-primary rounded-full animate-pulse shadow-sm"
                              aria-hidden="true"
                            />
                          )}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </div>

        {/* Enhanced CTA card with particle effects */}
        {!isCollapsed && <SidebarCtaCard />}
      </SidebarContent>
    </Sidebar>
  );
}
