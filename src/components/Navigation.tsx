import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Instagram, Youtube, Mail, Phone } from "lucide-react";
import logo from "@/assets/new-logo.png";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/portfolio", label: "Portfolio" },
    { path: "/about", label: "About & Reviews" },
    { path: "/faq", label: "FAQ" },
    { path: "/contact", label: "Contact" },
  ];

  const socialLinks = [
    { icon: Instagram, href: "https://www.instagram.com/wedding_cult?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==", label: "Instagram" },
    { icon: Youtube, href: "https://www.youtube.com/channel/UC8WGJLijaH3cu1fnhbvHcyA", label: "YouTube" },
    { icon: Mail, href: "mailto:theweddingcultfilms@gmail.com", label: "Email" },
    { icon: Phone, href: "https://wa.me/917021683240", label: "WhatsApp" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border transition-smooth">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img src={"logo.png"} alt="The Wedding Cult" className="h-12 w-auto sm:h-14 md:h-16" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`font-poppins text-sm font-medium transition-smooth hover:text-chocolate ${
                  location.pathname === item.path
                    ? "text-chocolate border-b-2 border-chocolate"
                    : "text-foreground"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Social Links & CTA */}
          <div className="hidden md:flex items-center space-x-4">
            {socialLinks.map((social) => {
              const IconComponent = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-chocolate transition-smooth"
                >
                  <IconComponent className="h-4 w-4" />
                </a>
              );
            })}
            <Link to="/contact">
              <Button variant="default" size="sm" className="ml-4 shadow-soft hover:shadow-glow transition-smooth">
                Let's Begin Your Story
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Modern Mobile Navigation */}
        {isOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            {/* Backdrop */}
            <div className="fixed inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
            
            {/* Navigation Panel */}
            <div className="fixed inset-y-0 right-0 w-[85%] max-w-sm bg-gradient-to-b from-cream via-background to-cream/90 backdrop-blur-md shadow-2xl">
              {/* Content Container */}
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="p-4 border-b border-chocolate/10">
                  <h2 className="font-dancing text-2xl text-chocolate text-center">Menu</h2>
                </div>

                {/* Navigation Links */}
                <div className="flex-1 overflow-y-auto py-6 px-4">
                  <div className="space-y-4">
                    {navItems.map((item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        className="group block"
                        onClick={() => setIsOpen(false)}
                      >
                        <div className={`relative px-4 py-3 rounded-xl transition-all duration-300 ${
                          location.pathname === item.path
                            ? "bg-chocolate/10 text-chocolate"
                            : "hover:bg-chocolate/5"
                        }`}>
                          <div className="flex items-center">
                            <span className={`font-dancing text-xl ${
                              location.pathname === item.path
                                ? "text-chocolate"
                                : "text-chocolate/70 group-hover:text-chocolate"
                            }`}>
                              {item.label}
                            </span>
                            <div className="ml-auto">
                              <div className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                                location.pathname === item.path
                                  ? "bg-chocolate"
                                  : "bg-chocolate/0 group-hover:bg-chocolate/40"
                              }`} />
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Footer with Social Links and CTA */}
                <div className="p-4 border-t border-chocolate/10 bg-cream/50">
                  {/* Social Links */}
                  <div className="flex justify-center space-x-6 mb-4">
                    {socialLinks.map((social) => {
                      const IconComponent = social.icon;
                      return (
                        <a
                          key={social.label}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={social.label}
                          title={social.label}
                          className="text-chocolate/70 hover:text-chocolate transition-all duration-300 hover:scale-110"
                        >
                          <IconComponent className="h-5 w-5" />
                        </a>
                      );
                    })}
                  </div>

                  {/* CTA Button */}
                  <Link to="/contact" onClick={() => setIsOpen(false)}>
                    <Button 
                      className="w-full bg-gradient-to-r from-chocolate to-chocolate-light hover:opacity-90 text-cream shadow-lg" 
                      variant="default"
                    >
                      Let's Begin Your Story
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;