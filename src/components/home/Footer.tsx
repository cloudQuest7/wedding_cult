import { Instagram, Youtube, Mail, Phone, Link as LinkIcon } from "lucide-react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Link } from "react-router-dom";

const Footer = () => {
  const flowerRef = useRef(null);
  
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

  // Beautiful spinning flower animation
  useEffect(() => {
    if (flowerRef.current) {
      // Continuous smooth spinning animation
      gsap.to(flowerRef.current, {
        rotation: 360,
        duration: 15, // 15 seconds for one full rotation
        ease: "none", // Linear rotation for consistent speed
        repeat: -1 // Infinite loop
      });

      // Optional: Add gentle scale breathing while spinning
      gsap.to(flowerRef.current, {
        scale: 1.05,
        duration: 4,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1
      });
    }
  }, []);

  return (
    <footer className="bg-gradient-to-b from-beige-light to-cream mb-20">
      {/* Main Footer - Significantly reduced padding */}
      <section className="bg-chocolate text-cream pt-4 sm:pt-6 lg:pt-8 pb-3 sm:pb-4">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          
          {/* Hero Text - New elegant text with cursive elements */}
          <div className="text-center mt-2">
          <h3 className="font-amsterdam text-lg sm:text-xl lg:text-2xl mb-1.5">The Wedding Cult</h3>
          </div>

          {/* Spinning Elegant Flower - Properly centered */}
          <div className="flex justify-center ">
            <div 
  ref={flowerRef}
  className="w-44 h-44 sm:w-52 sm:h-52 lg:w-70 lg:h-70 opacity-90"
>

              <svg viewBox="0 0 200 200" className="w-full h-full fill-cream/70">
                {/* Enhanced Elegant Flower Design - Centered at 100,100 with spinning animation */}
                <g transform="translate(100,100)">
                  {/* Outer petals - larger and more detailed */}
                  <path className="fill-cream/50" d="M0,-45 Q18,-28 0,-12 Q-18,-28 0,-45 Z" transform="rotate(0)"/>
                  <path className="fill-cream/50" d="M0,-45 Q18,-28 0,-12 Q-18,-28 0,-45 Z" transform="rotate(72)"/>
                  <path className="fill-cream/50" d="M0,-45 Q18,-28 0,-12 Q-18,-28 0,-45 Z" transform="rotate(144)"/>
                  <path className="fill-cream/50" d="M0,-45 Q18,-28 0,-12 Q-18,-28 0,-45 Z" transform="rotate(216)"/>
                  <path className="fill-cream/50" d="M0,-45 Q18,-28 0,-12 Q-18,-28 0,-45 Z" transform="rotate(288)"/>
                  
                  {/* Middle petals */}
                  <path className="fill-cream/65" d="M0,-32 Q14,-20 0,-8 Q-14,-20 0,-32 Z" transform="rotate(36)"/>
                  <path className="fill-cream/65" d="M0,-32 Q14,-20 0,-8 Q-14,-20 0,-32 Z" transform="rotate(108)"/>
                  <path className="fill-cream/65" d="M0,-32 Q14,-20 0,-8 Q-14,-20 0,-32 Z" transform="rotate(180)"/>
                  <path className="fill-cream/65" d="M0,-32 Q14,-20 0,-8 Q-14,-20 0,-32 Z" transform="rotate(252)"/>
                  <path className="fill-cream/65" d="M0,-32 Q14,-20 0,-8 Q-14,-20 0,-32 Z" transform="rotate(324)"/>
                  
                  {/* Inner petals */}
                  <path className="fill-cream/80" d="M0,-20 Q10,-14 0,-6 Q-10,-14 0,-20 Z" transform="rotate(0)"/>
                  <path className="fill-cream/80" d="M0,-20 Q10,-14 0,-6 Q-10,-14 0,-20 Z" transform="rotate(72)"/>
                  <path className="fill-cream/80" d="M0,-20 Q10,-14 0,-6 Q-10,-14 0,-20 Z" transform="rotate(144)"/>
                  <path className="fill-cream/80" d="M0,-20 Q10,-14 0,-6 Q-10,-14 0,-20 Z" transform="rotate(216)"/>
                  <path className="fill-cream/80" d="M0,-20 Q10,-14 0,-6 Q-10,-14 0,-20 Z" transform="rotate(288)"/>
                  
                  {/* Center circles */}
                  <circle cx="0" cy="0" r="8" className="fill-cream/90"/>
                  <circle cx="0" cy="0" r="5" className="fill-cream/70"/>
                  <circle cx="0" cy="0" r="2" className="fill-cream/50"/>
                  
                  {/* Enhanced decorative leaves */}
                  <path className="fill-cream/40" d="M0,15 Q10,25 0,35 Q-10,25 0,15 Z"/>
                  <path className="fill-cream/40" d="M0,15 Q10,25 0,35 Q-10,25 0,15 Z" transform="rotate(120)"/>
                  <path className="fill-cream/40" d="M0,15 Q10,25 0,35 Q-10,25 0,15 Z" transform="rotate(240)"/>
                  
                  {/* Additional decorative elements */}
                  <path className="fill-cream/30" d="M0,25 Q6,30 0,35 Q-6,30 0,25 Z" transform="rotate(60)"/>
                  <path className="fill-cream/30" d="M0,25 Q6,30 0,35 Q-6,30 0,25 Z" transform="rotate(180)"/>
                  <path className="fill-cream/30" d="M0,25 Q6,30 0,35 Q-6,30 0,25 Z" transform="rotate(300)"/>
                </g>
              </svg>
            </div>
          </div>

          {/* Brand & Social - Much reduced spacing */}
          <div className="text-center space-y-2 mb-3">
            <div>
              
              <p className="font-playfair text-cream/80 text-xs sm:text-sm lg:text-base leading-relaxed mb-2 max-w-xl mx-auto px-4">
                "Capturing timeless love stories with cinematic beauty and emotional truth in Mumbai."
              </p>
            </div>
            
            {/* Social Links - Smaller buttons with reduced spacing */}
            <div className="flex justify-center space-x-2.5 sm:space-x-3">
              {socialLinks.map(social => {
                const IconComponent = social.icon;
                return (
                  <a 
                    key={social.label} 
                    href={social.href} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="bg-cream text-chocolate p-2 sm:p-2.5 rounded-full hover:bg-beige-light transition-all duration-300 shadow-md hover:shadow-lg hover:scale-110"
                    aria-label={social.label}
                  >
                    <IconComponent className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Contact Information Bar - Much reduced spacing */}
          <div className="border-t border-cream/20 pt-2 mb-2">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-2 text-center font-playfair">
              <div className="space-y-0.5">
                <p className="text-cream/60 text-xs uppercase tracking-wide">EMAIL</p>
                <a href="mailto:theweddingcultfilms@gmail.com" className="text-cream hover:text-beige-light transition-colors text-xs sm:text-sm break-all sm:break-normal">
                  theweddingcultfilms@gmail.com
                </a>
              </div>
              <div className="space-y-0.5">
                <p className="text-cream/60 text-xs uppercase tracking-wide">PHONE</p>
                <a href="tel:+917021683240" className="text-cream hover:text-beige-light transition-colors text-xs sm:text-sm">
                  +91 70216 83240
                </a>
              </div>
              <div className="space-y-0.5">
                <p className="text-cream/60 text-xs uppercase tracking-wide">LOCATION</p>
                <p className="text-cream text-xs sm:text-sm">Mumbai, India</p>
              </div>
            </div>
          </div>

          {/* Copyright - Minimal spacing */}
          <div className="border-t border-cream/20 pt-2 flex flex-col sm:flex-row justify-between items-center text-xs text-cream/60 font-poppins space-y-1 sm:space-y-0">
            <p className="text-center sm:text-left">Copyright © 2024. All rights reserved.</p>
            <div className="flex space-x-3 sm:space-x-4">
              <Link to="/privacy-policy" className="hover:text-cream transition-colors">Privacy Policy</Link>
              <span>|</span>
              <Link to="/terms" className="hover:text-cream transition-colors">Terms & Conditions</Link>
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
