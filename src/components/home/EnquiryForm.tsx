import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
const EnquiryForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    eventDate: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    toast
  } = useToast();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {
      name,
      value
    } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.phone || !formData.eventDate || !formData.message) {
      toast({
        title: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Create mailto link with form data
      const subject = encodeURIComponent(`Wedding Enquiry from ${formData.name}`);
      const body = encodeURIComponent(`
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Event Date: ${formData.eventDate}

Message:
${formData.message}

---
Sent from The Wedding Cult website
      `);
      
      const mailtoLink = `mailto:theweddingcultfilms@gmail.com?subject=${subject}&body=${body}`;
      
      // Create hidden link and click it
      const link = document.createElement('a');
      link.href = mailtoLink;
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast({
        title: "Enquiry Sent Successfully!",
        description: "Your email client should open. Please send the email to complete your enquiry.",
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        eventDate: "",
        message: ""
      });

    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      });
    }

    setIsSubmitting(false);
  };
  return <section className="py-20 px-4 bg-gradient-to-b from-background to-beige-light">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 animate-fade-in-up">
          <h2 className="font-amsterdam text-chocolate mb-4 text-2xl">
            Let's Create Magic Together
          </h2>
          <p className="font-playfair text-lg text-muted-foreground max-w-2xl mx-auto">
            Tell us about your special day and let's begin crafting your cinematic love story.
          </p>
        </div>

        <div className="bg-card rounded-lg shadow-romantic p-8 animate-fade-in-up" style={{
        animationDelay: "0.2s"
      }}>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="font-poppins font-medium text-chocolate">
                  Name *
                </Label>
                <Input id="name" name="name" value={formData.name} onChange={handleChange} required className="border-beige focus:border-chocolate" placeholder="Your full name" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="font-poppins font-medium text-chocolate">
                  Email *
                </Label>
                <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required className="border-beige focus:border-chocolate" placeholder="your.email@example.com" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="phone" className="font-poppins font-medium text-chocolate">
                  Phone Number *
                </Label>
                <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} required className="border-beige focus:border-chocolate" placeholder="+91 12345 67890" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="eventDate" className="font-poppins font-medium text-chocolate">
                  Event Date
                </Label>
                <Input id="eventDate" name="eventDate" type="date" value={formData.eventDate} onChange={handleChange} className="border-beige focus:border-chocolate" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message" className="font-poppins font-medium text-chocolate">
                Tell us about your vision
              </Label>
              <Textarea id="message" name="message" value={formData.message} onChange={handleChange} rows={4} className="border-beige focus:border-chocolate resize-none" placeholder="Share details about your event, preferred style, location, or any special requirements..." />
            </div>

            <div className="text-center">
              <Button type="submit" disabled={isSubmitting} className="bg-chocolate hover:bg-chocolate-light text-cream px-8 py-3 rounded-lg font-poppins font-medium shadow-soft hover:shadow-glow transition-all duration-300">
                {isSubmitting ? "Submitting..." : "Submit Enquiry"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>;
};
export default EnquiryForm;