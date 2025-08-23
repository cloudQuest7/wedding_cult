import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Briefcase,
  Users,
  HelpCircle,
  Mail,
  Image,
  Heart,
  Menu,
  X,
  Phone,
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
import logo from "@/assets/brand-logo.png";
import centerlogo from "@/assets/new-logo.png";
import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { useIsMobile } from "@/hooks/use-mobile";

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

// Clean Mobile Bottom Navigation with Cream + Coffee Theme - UPDATED

export default function MobileBottomNav() {
  const location = useLocation();
  const currentPath = location.pathname;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [scrollTimeout, setScrollTimeout] = useState(null);
  const isActive = (path) => currentPath === path;

  // Handle scroll visibility
  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;
    let scrollTimeout: NodeJS.Timeout | null = null;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (!ticking) {
        window.requestAnimationFrame(() => {
          // Hide immediately when scrolling down
          if (currentScrollY > lastScrollY && currentScrollY > 200) {
            setIsVisible(false);
          }
          
          // Clear any existing timeout
          if (scrollTimeout) {
            clearTimeout(scrollTimeout);
          }
          
          // Set a new timeout to show the buttons after scrolling stops
          scrollTimeout = setTimeout(() => {
            setIsVisible(true);
          }, 800);
          
          lastScrollY = currentScrollY;
          ticking = false;
        });

        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
    };
  }, []);

  useEffect(() => { setIsMenuOpen(false); }, [currentPath]);
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [isMenuOpen]);

  return (
    <>
      {/* Top Navbar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-cream/95 via-cream/90 to-beige-warm/95 backdrop-blur-lg border-b-2 border-chocolate/30">
        <div className="flex items-center justify-between px-6 py-2">
          <h1 className="text-base font-playfair  text-chocolate tracking-tight">
            The Wedding Cult
          </h1>
          <img src={logo} alt="Logo" className="h-12 w-auto" />
        </div>
      </div>
      <div className="h-20" />

      {/* Left Side Menu Capsule - Professional Border */}
      <div 
        className={`fixed bottom-8 left-0 z-50 transition-all duration-150 ease-out will-change-transform ${
          isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
        }`}
      >
        <button
          onClick={() => setIsMenuOpen(true)}
          className={`flex items-center justify-center py-3 px-7 pr-8 rounded-r-full transition-all duration-300 relative overflow-hidden group ${
            isMenuOpen 
              ? "bg-gradient-to-r from-chocolate to-chocolate-light text-cream border-2 border-chocolate/50" 
              : "bg-gradient-to-r from-cream to-beige-warm text-chocolate/90 hover:from-beige-warm hover:to-cream hover:border-chocolate/40 border-2 border-chocolate/25"
          }`}
          style={{
            background: `linear-gradient(135deg, #f5f2e8 0%, #e8d5b7 100%)`,
            minWidth: '120px'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-600 transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%]" />
          
          {/* <Menu className="h-6 w-6 mr-3 relative z-10" /> */}
          <span className="text-base font-poppins font-bold relative z-10 tracking-wide">MENU</span>
        </button>
      </div>

      {/* Right Side Enquire Capsule - Professional Border */}
      <div 
        className={`fixed bottom-8 right-0 z-50 transition-all duration-150 ease-out will-change-transform ${
          isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
        }`}
      >
        <Link
          to="/contact"
          className={`flex items-center justify-center py-3 px-6 pl-10 rounded-l-full transition-all duration-300 relative overflow-hidden group ${
            isActive("/contact") 
              ? "bg-gradient-to-l from-chocolate to-chocolate-light text-cream border-2 border-chocolate/50" 
              : "bg-gradient-to-l from-cream to-beige-warm text-chocolate/90 hover:from-beige-warm hover:to-cream hover:border-chocolate/40 border-2 border-chocolate/25"
          }`}
          style={{
            background: `linear-gradient(225deg, #f5f2e8 0%, #e8d5b7 100%)`,
            minWidth: '140px'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-600 transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%]" />
          
          <span className="text-base font-poppins font-bold relative z-10 tracking-wide">ENQUIRE</span>
          {/* <Heart className="h-6 w-6 ml-3 relative z-10" /> */}
        </Link>
      </div>

      {/* Clean Modal with Professional Borders */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-lg flex items-center justify-center p-4 transition-opacity duration-300 ease-out">
          <div className="relative bg-gradient-to-br from-cream via-beige-warm to-cream rounded-3xl w-full max-w-md mx-auto overflow-hidden border-3 border-chocolate/40 transform transition-transform duration-300 ease-out will-change-transform premium-modal">
            
            {/* Decorative top border */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-chocolate via-chocolate-light to-chocolate" />
            
            {/* Modal header with clean border */}
            <div className="flex items-center justify-between p-6 border-b-2 border-chocolate/20 bg-gradient-to-r from-cream/95 to-beige-warm/95">
              <div className="flex items-center gap-4">
                <img src={logo} alt="Logo" className="h-12 w-auto" />
                <div>
                  <h2 className="font-amsterdam text-chocolate text-sm">The Wedding Cult</h2>
                  
                </div>
              </div>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="w-14 h-14 rounded-full bg-gradient-to-br from-white/90 to-cream/70 hover:from-chocolate/10 hover:to-chocolate/20 flex items-center justify-center transition-all duration-300 border-2 border-chocolate/20 hover:border-chocolate/30 hover:scale-105"
                aria-label="Close Menu"
              >
                <X className="h-7 w-7 text-chocolate" />
              </button>
            </div>
            
            {/* Navigation items with professional borders */}
            <nav className="p-6 space-y-3 pb-8">
              {navigationItems.map((item, index) => {
                const IconComponent = item.icon;
                const active = isActive(item.url);
                return (
                  <Link
                    key={item.title}
                    to={item.url}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center space-x-4 px-4 py-3 rounded-2xl text-lg font-poppins font-medium transition-all duration-300 relative overflow-hidden group ${
                      active 
                        ? "bg-gradient-to-r from-chocolate via-chocolate-light to-chocolate text-cream border-2 border-chocolate/50" 
                        : "text-chocolate hover:bg-gradient-to-r hover:from-white/60 hover:to-cream/40 border-2 border-chocolate/15 hover:border-chocolate/30"
                    }`}
                    style={{ 
                      animationDelay: `${index * 0.1}s`
                    }}
                  >
                    {/* Shimmer effect */}
                    {!active && (
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-600 transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%]" />
                    )}
                    
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center relative z-10 ${
                      active 
                        ? 'bg-white/20 border border-white/30' 
                        : 'bg-gradient-to-br from-cream to-beige-warm/90 group-hover:bg-white/50 border border-chocolate/15 group-hover:border-chocolate/25'
                    }`}>
                      <IconComponent className={`h-6 w-6 ${active ? "text-cream" : "text-chocolate"}`} />
                    </div>
                    <span className="relative z-10 flex-1">{item.title}</span>
                    {active && (
                      <div className="w-3 h-3 rounded-full bg-cream/90 border border-white/30 animate-pulse relative z-10" />
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      )}
      
      <div className="h-28" />

      {/* CSS Animations */}
      <style jsx>{`
        .premium-modal {
          animation: modalSlideIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        
        .border-3 {
          border-width: 3px;
        }
        
        @keyframes modalSlideIn {
          from { 
            opacity: 0; 
            transform: scale(0.85) translateY(60px) rotateX(20deg); 
          }
          to   { 
            opacity: 1; 
            transform: scale(1) translateY(0) rotateX(0); 
          }
        }
        
        nav > a {
          animation: menuItemSlide 0.6s ease-out forwards;
          opacity: 0;
          transform: translateX(-30px);
        }
        
        @keyframes menuItemSlide {
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        nav > a:nth-child(1) { animation-delay: 0.1s; }
        nav > a:nth-child(2) { animation-delay: 0.2s; }
        nav > a:nth-child(3) { animation-delay: 0.3s; }
        nav > a:nth-child(4) { animation-delay: 0.4s; }
        nav > a:nth-child(5) { animation-delay: 0.5s; }
        nav > a:nth-child(6) { animation-delay: 0.6s; }
      `}</style>
    </>
  );
}


// Desktop Sidebar Component
export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const isCollapsed = state === "collapsed";
  const isActive = (path: string) => currentPath === path;
  const isMobile = useIsMobile();

  // Show mobile bottom nav on mobile devices
  if (isMobile) {
    return <MobileBottomNav />;
  }

  // Desktop sidebar
  return (
    <Sidebar
      className="border-r border-border/30 bg-gradient-to-b from-background/95 via-background/80 to-background/95 backdrop-blur-sm shadow-xl"
      side="left"
      style={{ 
        minWidth: "190px",
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
            className="h-32 w-auto transition-transform duration-700 ease-in-out filter drop-shadow-xl hover:scale-105 hover:rotate-[2deg]"
          />
        </Link>
      </SidebarHeader>

      <SidebarContent className="px-2 py-3 flex flex-col justify-between h-full">
        <div>
          {/* Navigation Group */}
          <SidebarGroup>
            <SidebarGroupLabel className="font-poppins font-semibold text-xs uppercase tracking-wider text-muted-foreground/70 px-3 mb-3">
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
                        title={item.title}
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
                          <span className="font-poppins font-medium text-sm tracking-wide select-none">
                            {item.title}
                          </span>
                          {/* Active indicator dot */}
                          {active && (
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
        <SidebarCtaCard />
      </SidebarContent>
    </Sidebar>
  );
}
