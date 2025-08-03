import { Instagram, Youtube, Mail, Phone } from "lucide-react";
import { useState } from "react";

const Footer = () => {
  const [email, setEmail] = useState("");
  
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

  const handleSubscribe = (e) => {
    e.preventDefault();
    console.log("Subscribed with email:", email);
    setEmail("");
  };

  return (
    <footer className="bg-gradient-to-b from-beige-light to-cream">
      {/* Newsletter Section - Reduced spacing */}
      <section className="py-4 sm:py-6 lg:py-8 px-4 sm:px-6 text-center">
        <div className="max-w-xl sm:max-w-2xl mx-auto">
          <h3 className="font-playfair text-base sm:text-lg lg:text-xl text-chocolate/80 mb-3 sm:mb-4 leading-relaxed px-2">
            Stay in the loop with the latest trends, tips, and exclusive offers. Subscribe to our newsletter
            and be the first to know about upcoming events and promotions.
          </h3>
          
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-sm sm:max-w-lg mx-auto mt-4 sm:mt-6">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address..."
              className="flex-1 px-3 sm:px-4 py-2 sm:py-3 border-b-2 border-chocolate/30 bg-transparent text-chocolate placeholder-chocolate/60 focus:outline-none focus:border-chocolate transition-all duration-300 font-playfair text-sm sm:text-base"
              required
            />
            <button
              type="submit"
              className="px-6 sm:px-8 py-2 sm:py-3 bg-chocolate text-cream font-poppins font-medium hover:bg-chocolate/90 transition-all duration-300 shadow-md hover:shadow-lg text-sm sm:text-base whitespace-nowrap"
            >
              SUBSCRIBE
            </button>
          </form>
        </div>
      </section>

      {/* Main Footer - Significantly reduced padding */}
      <section className="bg-chocolate text-cream pt-4 sm:pt-6 lg:pt-8 pb-3 sm:pb-4">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          
          {/* Hero Text - New elegant text with cursive elements */}
          <div className="text-center mb-2">
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl mb-2 leading-tight font-light tracking-wide text-cream">
              WHERE LOVE MEETS ART AND<br />
              DREAMS BECOME ETERNAL<br />
              <span className="italic font-serif text-cream/90">Wedding Memories</span>
            </h2>
          </div>

          {/* Elegant Flower - Properly centered */}
          <div className="flex justify-center mb-2">
            <div className="w-36 h-36 sm:w-44 sm:h-44 lg:w-52 lg:h-52 opacity-90">
              <svg viewBox="0 0 200 200" className="w-full h-full fill-cream/70">
                {/* Enhanced Elegant Flower Design - Centered at 100,100 */}
                <g transform="translate(100,100)">
                  {/* Outer petals - larger and more detailed */}
                  <path d="M0,-45 Q18,-28 0,-12 Q-18,-28 0,-45 Z" className="fill-cream/50" transform="rotate(0)"/>
                  <path d="M0,-45 Q18,-28 0,-12 Q-18,-28 0,-45 Z" className="fill-cream/50" transform="rotate(72)"/>
                  <path d="M0,-45 Q18,-28 0,-12 Q-18,-28 0,-45 Z" className="fill-cream/50" transform="rotate(144)"/>
                  <path d="M0,-45 Q18,-28 0,-12 Q-18,-28 0,-45 Z" className="fill-cream/50" transform="rotate(216)"/>
                  <path d="M0,-45 Q18,-28 0,-12 Q-18,-28 0,-45 Z" className="fill-cream/50" transform="rotate(288)"/>
                  
                  {/* Middle petals */}
                  <path d="M0,-32 Q14,-20 0,-8 Q-14,-20 0,-32 Z" className="fill-cream/65" transform="rotate(36)"/>
                  <path d="M0,-32 Q14,-20 0,-8 Q-14,-20 0,-32 Z" className="fill-cream/65" transform="rotate(108)"/>
                  <path d="M0,-32 Q14,-20 0,-8 Q-14,-20 0,-32 Z" className="fill-cream/65" transform="rotate(180)"/>
                  <path d="M0,-32 Q14,-20 0,-8 Q-14,-20 0,-32 Z" className="fill-cream/65" transform="rotate(252)"/>
                  <path d="M0,-32 Q14,-20 0,-8 Q-14,-20 0,-32 Z" className="fill-cream/65" transform="rotate(324)"/>
                  
                  {/* Inner petals */}
                  <path d="M0,-20 Q10,-14 0,-6 Q-10,-14 0,-20 Z" className="fill-cream/80" transform="rotate(0)"/>
                  <path d="M0,-20 Q10,-14 0,-6 Q-10,-14 0,-20 Z" className="fill-cream/80" transform="rotate(72)"/>
                  <path d="M0,-20 Q10,-14 0,-6 Q-10,-14 0,-20 Z" className="fill-cream/80" transform="rotate(144)"/>
                  <path d="M0,-20 Q10,-14 0,-6 Q-10,-14 0,-20 Z" className="fill-cream/80" transform="rotate(216)"/>
                  <path d="M0,-20 Q10,-14 0,-6 Q-10,-14 0,-20 Z" className="fill-cream/80" transform="rotate(288)"/>
                  
                  {/* Center circles */}
                  <circle cx="0" cy="0" r="8" className="fill-cream/90"/>
                  <circle cx="0" cy="0" r="5" className="fill-cream/70"/>
                  <circle cx="0" cy="0" r="2" className="fill-cream/50"/>
                  
                  {/* Enhanced decorative leaves */}
                  <path d="M0,15 Q10,25 0,35 Q-10,25 0,15 Z" className="fill-cream/40"/>
                  <path d="M0,15 Q10,25 0,35 Q-10,25 0,15 Z" className="fill-cream/40" transform="rotate(120)"/>
                  <path d="M0,15 Q10,25 0,35 Q-10,25 0,15 Z" className="fill-cream/40" transform="rotate(240)"/>
                  
                  {/* Additional decorative elements */}
                  <path d="M0,25 Q6,30 0,35 Q-6,30 0,25 Z" className="fill-cream/30" transform="rotate(60)"/>
                  <path d="M0,25 Q6,30 0,35 Q-6,30 0,25 Z" className="fill-cream/30" transform="rotate(180)"/>
                  <path d="M0,25 Q6,30 0,35 Q-6,30 0,25 Z" className="fill-cream/30" transform="rotate(300)"/>
                </g>
              </svg>
            </div>
          </div>

          {/* Brand & Social - Much reduced spacing */}
          <div className="text-center space-y-2 mb-3">
            <div>
              <h3 className="font-amsterdam text-lg sm:text-xl lg:text-2xl mb-1.5">The Wedding Cult</h3>
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
              <a href="/privacy" className="hover:text-cream transition-colors">Privacy Policy</a>
              <span>|</span>
              <a href="/terms" className="hover:text-cream transition-colors">Terms & Condition</a>
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
