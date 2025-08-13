import { useState, useEffect } from "react";
import { Instagram, Youtube, MessageCircle, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const SocialFloatingButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Close button on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isOpen]);

  const socialLinks = [
    {
      icon: MessageCircle,
      href: "https://wa.me/917021683240",
      label: "WhatsApp",
      color: "bg-green-500 hover:bg-green-600"
    },
    {
      icon: Instagram,
      href: "https://www.instagram.com/wedding_cult?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
      label: "Instagram",
      color: "bg-pink-500 hover:bg-pink-600"
    },
    {
      icon: Youtube,
      href: "https://www.youtube.com/channel/UC8WGJLijaH3cu1fnhbvHcyA",
      label: "YouTube",
      color: "bg-red-500 hover:bg-red-600"
    }
  ];

  return (
   <div className="fixed right-4 bottom-28 z-50 flex flex-col items-end gap-3">


      {/* Social Media Links */}
      {isOpen && (
        <div className="flex flex-col gap-3 animate-fade-in">
          {socialLinks.map((link, index) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg transition-all duration-200 hover:scale-110 animate-fade-in ${link.color}`}
              style={{ animationDelay: `${index * 0.1}s` }}
              title={link.label}
            >
              <link.icon className="w-5 h-5" />
            </a>
          ))}
        </div>
      )}

      {/* Toggle Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full shadow-lg transition-all duration-300 ${
          isOpen 
            ? "bg-red-500 hover:bg-red-600 rotate-45" 
            : "bg-chocolate hover:bg-chocolate-light"
        }`}
        size="icon"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <Plus className="w-6 h-6 text-cream" />
        )}
      </Button>
    </div>
  );
};

export default SocialFloatingButton;
