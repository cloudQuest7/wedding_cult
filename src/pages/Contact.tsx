import { useState } from "react";
import FloatingBallBackground from "@/components/common/FloatingBallBackground";
import SocialFloatingButton from "@/components/common/SocialFloatingButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Instagram, Youtube, Mail, Phone, MapPin, Calendar, Send, Heart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    weddingDate: "",
    message: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const subject = encodeURIComponent(`Wedding Inquiry from ${formData.name}`);
    const body = encodeURIComponent(`Hello,\n\nI'm interested in your wedding photography services.\n\nDetails:\nName: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nWedding Date: ${formData.weddingDate}\n\nMessage:\n${formData.message}\n\nLooking forward to hearing from you!\n\nBest regards,\n${formData.name}`);
    const mailtoLink = `mailto:theweddingcultfilms@gmail.com?subject=${subject}&body=${body}`;
    
    window.location.href = mailtoLink;
    
    toast({
      title: "Thank you for reaching out!",
      description: "Your email client should open now. We'll get back to you soon!"
    });

    setFormData({
      name: "",
      email: "",
      phone: "",
      weddingDate: "",
      message: ""
    });
  };

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
      href: "https://www.youtube.com/channel/UC8WGJLijaH3cu1fnhbvHcyA",
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
      
      {/* Hero Section - Much more compact */}
      <section className="relative pt-20 pb-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center animate-fade-in-up">
            <div className="inline-flex items-center gap-2 mb-2 px-3 py-1.5 bg-chocolate/10 rounded-full">
              <Heart className="w-4 h-4 text-chocolate fill-chocolate" />
              <span className="font-poppins text-sm font-medium text-chocolate">Let's Create Something Beautiful</span>
            </div>
            
            <h1 className="font-amsterdam text-4xl sm:text-5xl md:text-6xl text-chocolate mb-2 leading-tight">
              Let's Create Magic Together
            </h1>
            
            <p className="font-playfair text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Ready to begin your cinematic love story? We're excited to hear about your special day.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content - Very compact */}
      <section className="pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
            
            {/* Contact Form - Ultra tight spacing */}
            <div className="xl:col-span-2 animate-fade-in-up">
              <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 sm:p-8 shadow-lg border border-beige-light/30">
                {/* Form header - minimal margin */}
                <div className="mb-3">
                  <h2 className="font-amsterdam text-2xl sm:text-3xl text-chocolate mb-0.5">
                    Tell Us About Your Day
                  </h2>
                  <p className="font-poppins text-muted-foreground text-sm sm:text-base">
                    Share your vision with us and let's create magic together
                  </p>
                </div>
                
                {/* Form with ultra-tight spacing */}
                <form onSubmit={handleSubmit} className="space-y-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div>
                      <Label htmlFor="name" className="font-poppins text-sm font-medium text-chocolate flex items-center ">
                        Your Name <span className="text-red-500">*</span>
                      </Label>
                      <Input 
                        id="name" 
                        name="name" 
                        value={formData.name} 
                        onChange={handleInputChange} 
                        required 
                        className="font-poppins h-9 sm:h-10 border-beige-warm focus:border-chocolate focus:ring-chocolate/20 rounded-lg text-sm" 
                        placeholder="Enter your full name" 
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="email" className="font-poppins text-sm font-medium text-chocolate flex items-center gap-1 mb-0.5">
                        Email Address <span className="text-red-500">*</span>
                      </Label>
                      <Input 
                        id="email" 
                        name="email" 
                        type="email" 
                        value={formData.email} 
                        onChange={handleInputChange} 
                        required 
                        className="font-poppins h-9 sm:h-10 border-beige-warm focus:border-chocolate focus:ring-chocolate/20 rounded-lg text-sm" 
                        placeholder="your@email.com" 
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div>
                      <Label htmlFor="phone" className="font-poppins text-sm font-medium text-chocolate mb-0.5 block">
                        Phone Number
                      </Label>
                      <Input 
                        id="phone" 
                        name="phone" 
                        type="tel" 
                        value={formData.phone} 
                        onChange={handleInputChange} 
                        className="font-poppins h-9 sm:h-10 border-beige-warm focus:border-chocolate focus:ring-chocolate/20 rounded-lg text-sm" 
                        placeholder="+91 XXXXX XXXXX" 
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="weddingDate" className="font-poppins text-sm font-medium text-chocolate mb-0.5 block">
                        Wedding/Event Date
                      </Label>
                      <Input 
                        id="weddingDate" 
                        name="weddingDate" 
                        type="date" 
                        value={formData.weddingDate} 
                        onChange={handleInputChange} 
                        className="font-poppins h-9 sm:h-10 border-beige-warm focus:border-chocolate focus:ring-chocolate/20 rounded-lg text-sm" 
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="message" className="font-poppins text-sm font-medium text-chocolate mb-0.5 block">
                      Tell Us About Your Vision
                    </Label>
                    <Textarea 
                      id="message" 
                      name="message" 
                      value={formData.message} 
                      onChange={handleInputChange} 
                      rows={3} 
                      className="font-poppins border-beige-warm focus:border-chocolate focus:ring-chocolate/20 rounded-lg resize-none text-sm" 
                      placeholder="Share details about your wedding, your vision, any specific requirements, or questions you have for us..." 
                    />
                  </div>
                  
                  {/* Button with minimal top margin */}
                  <div className="pt-1">
                    <Button 
                      type="submit" 
                      className="w-full h-10 sm:h-11 bg-gradient-to-r from-chocolate to-chocolate-light hover:from-chocolate-light hover:to-chocolate text-cream font-poppins font-medium text-sm sm:text-base rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-[1.01]" 
                    >
                      <Send className="mr-2 h-4 w-4" />
                      Send Your Story
                    </Button>
                  </div>
                </form>
              </div>
            </div>

            {/* Contact Information Sidebar - Compact */}
            <div className="animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
              <div className="xl:sticky xl:top-8 space-y-3">
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

                {/* Quick Response Promise - Ultra compact */}
                <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-beige-light/30">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-8 h-8 bg-chocolate/10 rounded-full mb-1">
                      <Calendar className="w-4 h-4 text-chocolate" />
                    </div>
                    <h4 className="font-amsterdam text-base text-chocolate mb-1">
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
