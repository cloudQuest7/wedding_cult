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
            <img src={logo} alt="The Wedding Cult" className="h-12 w-auto sm:h-14 md:h-16" />
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

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden animate-fade-in-down">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-card rounded-lg mt-2 shadow-soft">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`block px-3 py-2 text-base font-medium transition-smooth ${
                    location.pathname === item.path
                      ? "text-chocolate bg-secondary rounded-md"
                      : "text-foreground hover:bg-secondary hover:text-chocolate rounded-md"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              
              {/* Mobile Social Links */}
              <div className="flex justify-center space-x-4 pt-4 border-t border-border">
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
                      <IconComponent className="h-5 w-5" />
                    </a>
                  );
                })}
              </div>
              
              <div className="pt-2">
                <Link to="/contact" onClick={() => setIsOpen(false)}>
                  <Button className="w-full" variant="default">
                    Let's Begin Your Story
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;