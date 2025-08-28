import FloatingBallBackground from "@/components/common/FloatingBallBackground";
import SocialFloatingButton from "@/components/common/SocialFloatingButton";
import { Instagram, Youtube, Mail, Phone, MapPin, Calendar, Heart } from "lucide-react";
import EnquiryForm from "@/components/home/EnquiryForm";

const Contact = () => {
  const contactInfo = [
    {
      icon: Phone,
      label: "WhatsApp",
      value: "+91 70216 83240",
      href: "https://wa.me/917021683240",
      description: "Quick response guaranteed"
    },
    {
      icon: Mail,
      label: "Email",
      value: "theweddingcultfilms@gmail.com",
      href: "mailto:theweddingcultfilms@gmail.com",
      description: "Detailed inquiries welcome"
    },
    {
      icon: Instagram,
      label: "Instagram",
      value: "@wedding_cult",
      href: "https://www.instagram.com/wedding_cult?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
      description: "Latest work & stories"
    },
    {
      icon: Youtube,
      label: "YouTube",
      value: "The Wedding Cult Films",
      href: "https://www.youtube.com/channel/UC8WGJLijaH3cu1fnbvHcyA",
      description: "Full wedding films"
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Mumbai, India",
      href: "#",
      description: "Available worldwide"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-beige-light/20 to-background">
      <FloatingBallBackground />
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center animate-fade-in-up">
            <div className="inline-flex items-center gap-2 mb-2 px-3 py-1.5 bg-chocolate/10 rounded-full">
              <Heart className="w-4 h-4 text-chocolate fill-chocolate" />
              <span className="font-poppins text-sm font-medium text-chocolate">Let's Create Something Beautiful</span>
            </div>
            
            <h1 className="font-amsterdam text-xl sm:text-xl md:text-3xl text-chocolate mb-5 mt-3 leading-tight">
              Let's Create Magic Together
            </h1>
            
            <p className="font-playfair text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Ready to begin your cinematic love story? We're excited to hear about your special day.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-8 sm:pb-12 lg:pb-16 xl:pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
            
            {/* Contact Form */}
            <div className="xl:col-span-2 animate-fade-in-up">
              <EnquiryForm />
            </div>

            {/* Contact Information Sidebar */}
            <div className="animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
              <div className="space-y-3 mb-4 sm:mb-6 lg:mb-8">
                <div className="bg-gradient-to-br from-chocolate to-chocolate-light rounded-xl p-5 shadow-lg text-white">
                  <h3 className="font-amsterdam text-xl sm:text-2xl mb-2">
                    Get In Touch
                  </h3>
                  <p className="font-poppins text-cream/90 mb-3 text-sm sm:text-base leading-relaxed">
                    We're based in Mumbai but we travel anywhere love takes us.
                  </p>
                  
                  <div className="space-y-2">
                    {contactInfo.map((info, index) => {
                      const IconComponent = info.icon;
                      return (
                        <a
                          key={index}
                          href={info.href}
                          target={info.href.startsWith("http") ? "_blank" : undefined}
                          rel={info.href.startsWith("http") ? "noopener noreferrer" : undefined}
                          className="flex items-center space-x-3 p-2 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-all duration-300 group"
                        >
                          <div className="bg-white/20 p-2 rounded-lg group-hover:bg-white/30 transition-all duration-300 flex-shrink-0">
                            <IconComponent className="h-4 w-4 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-poppins font-medium text-white text-sm">
                              {info.label}
                            </p>
                            <p className="font-poppins text-cream/90 text-xs truncate">
                              {info.value}
                            </p>
                          </div>
                        </a>
                      );
                    })}
                  </div>
                </div>

                {/* Quick Response Promise */}
                <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-beige-light/30">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-8 h-8 bg-chocolate/10 rounded-full mb-1">
                      <Calendar className="w-4 h-4 text-chocolate" />
                    </div>
                    <h4 className="font-amsterdam text-base text-chocolate mb-2">
                      Quick Response Promise
                    </h4>
                    <p className="font-poppins text-muted-foreground text-xs leading-relaxed">
                      We respond within 24 hours. WhatsApp is fastest!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <SocialFloatingButton />
    </div>
  );
};

export default Contact;
