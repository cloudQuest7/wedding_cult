import { Instagram, Youtube, Mail, Phone } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const socialLinks = [
    {
      icon: Instagram,
      href: "https://www.instagram.com/wedding_cult?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
      label: "Instagram"
    }, 
    {
      icon: Youtube,
      href: "https://www.youtube.com/channel/UC8WGJLijaH3cu1fnhbvHcyA",
      label: "YouTube"
    }, 
    {
      icon: Mail,
      href: "mailto:theweddingcultfilms@gmail.com",
      label: "Email"
    }, 
    {
      icon: Phone,
      href: "https://wa.me/917021683240",
      label: "WhatsApp"
    }
  ];

  return (
    <footer className="bg-chocolate text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Main Footer Content */}
        <div className="py-12 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
            
            {/* Brand Section */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <h2 className="font-amsterdam text-2xl pt-5 sm:text-3xl lg:text-3xl text-cream mb-8 text-center lg:text-left">
                  The Wedding Cult
                </h2>
                <p className="text-neutral-300 pt-5 text-base sm:text-lg leading-relaxed max-w-md">
                  Capturing timeless love stories with cinematic beauty and emotional truth.
                </p>
              </div>
              
              {/* Social Links */}
              <div className="flex justify-center lg:justify-start space-x-4">
                {socialLinks.map((social) => {
                  const IconComponent = social.icon;
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-chocolate-light rounded-full flex items-center justify-center hover:bg-cream hover:text-neutral-900 transition-all duration-300 group"
                      aria-label={social.label}
                    >
                      <IconComponent className="h-5 w-5" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Contact and Services - Side by side on mobile, separate on desktop */}
            <div className="lg:col-span-7 grid grid-cols-2 lg:grid-cols-2 gap-6 lg:gap-16">
              
              {/* Contact Information */}
              <div className="space-y-4 lg:space-y-8">
                <h3 className="text-lg lg:text-xl font-playfair text-white mb-4 lg:mb-6">Contact</h3>
                
                <div className="space-y-4 lg:space-y-6">
                  <div>
                    <p className="text-neutral-100 text-xs lg:text-sm uppercase tracking-wider mb-1 lg:mb-2">Email</p>
                    <a 
                      href="mailto:theweddingcultfilms@gmail.com" 
                      className="text-neutral-300 hover:text-cream transition-colors text-xs lg:text-base break-words"
                    >
                      theweddingcultfilms@gmail.com
                    </a>
                  </div>
                  
                  <div>
                    <p className="text-neutral-400 text-xs lg:text-sm uppercase tracking-wider mb-1 lg:mb-2">Phone</p>
                    <a 
                      href="tel:+917021683240" 
                      className="text-neutral-300 hover:text-cream transition-colors text-xs lg:text-base"
                    >
                      +91 70216 83240
                    </a>
                  </div>
                  
                  <div>
                    <p className="text-neutral-400 text-xs lg:text-sm uppercase tracking-wider mb-1 lg:mb-2">Location</p>
                    <p className="text-neutral-300 text-xs lg:text-base">Mumbai, India</p>
                  </div>
                </div>
              </div>

              {/* Services */}
              <div className="space-y-4 lg:space-y-8 pl-4 lg:pl-0">
                <h3 className="text-lg lg:text-xl font-playfair text-white mb-4 mt-2 lg:mb-6 text-left">Services</h3>
                
                <div className="space-y-3 lg:space-y-4 flex flex-col items-start">
                  <Link to="/wedding-films" className="block text-neutral-300 hover:text-cream transition-colors text-xs lg:text-base">
                    Wedding Films
                  </Link>
                  <Link to="/pre-wedding" className="block text-neutral-300 hover:text-cream transition-colors text-xs lg:text-base">
                    Pre-Wedding
                  </Link>
                  <Link to="/photography" className="block text-neutral-300 hover:text-cream transition-colors text-xs lg:text-base">
                    Photography
                  </Link>
                  <Link to="/about" className="block text-neutral-300 hover:text-cream transition-colors text-xs lg:text-base">
                    About Us
                  </Link>
                  <Link to="/contact" className="block text-neutral-300 hover:text-cream transition-colors text-xs lg:text-base">
                    Contact
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-neutral-800 py-6 lg:py-8">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-6">
              <p className="text-white text-xs sm:text-sm">
                © 2024 The Wedding Cult. All rights reserved.
              </p>
            </div>
            
            <div className="flex items-center space-x-4 lg:space-x-6 text-xs sm:text-sm">
              <Link to="/privacy-policy" className="text-white hover:text-cream transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-white hover:text-cream transition-colors">
                Terms & Conditions
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
