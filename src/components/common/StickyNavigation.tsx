import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { MessageCircle, Send, User, Calendar } from "lucide-react";

interface Feedback {
  id: number;
  name: string;
  message: string;
  timestamp: string;
}

const FeedbackSection = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !message.trim()) {
      toast({
        title: "Please fill all fields",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1000));

    const newFeedback: Feedback = {
      id: Date.now(),
      name: name.trim(),
      message: message.trim(),
      timestamp: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    };

    setFeedbacks(prev => [newFeedback, ...prev]);
    setName("");
    setMessage("");
    setIsSubmitting(false);

    toast({
      title: "Feedback submitted!",
      description: "Thank you for your valuable feedback.",
    });
  };

  return (
    <section className="relative py-20 px-4 overflow-hidden">
      {/* Base background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-rose-50 via-amber-50 to-orange-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800"></div>
      
      {/* IMPRESSIVE VISIBLE MINIMAL PATTERNS - Multiple layers for maximum visual impact */}
      
      {/* Layer 1: Diagonal Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: `
            linear-gradient(45deg, rgba(251,191,36,0.3) 1px, transparent 1px),
            linear-gradient(-45deg, rgba(236,72,153,0.3) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px, 40px 40px',
          backgroundPosition: '0 0, 20px 20px'
        }}
      ></div>
      
      {/* Layer 2: Hexagon Dot Pattern */}
      <div 
        className="absolute inset-0 opacity-35"
        style={{
          backgroundImage: `
            radial-gradient(circle at 50% 50%, rgba(251,191,36,0.6) 2px, transparent 2px),
            radial-gradient(circle at 50% 50%, rgba(236,72,153,0.4) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px, 30px 30px',
          backgroundPosition: '0 0, 15px 15px'
        }}
      ></div>
      
      {/* Layer 3: Wavy Lines Pattern */}
      <div 
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 20px,
              rgba(251,191,36,0.4) 20px,
              rgba(251,191,36,0.4) 22px
            ),
            repeating-linear-gradient(
              90deg,
              transparent,
              transparent 20px,
              rgba(236,72,153,0.3) 20px,
              rgba(236,72,153,0.3) 22px
            )
          `
        }}
      ></div>
      
      {/* Layer 4: Triangular Pattern */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(60deg, rgba(251,191,36,0.3) 25%, transparent 25%),
            linear-gradient(-60deg, rgba(236,72,153,0.3) 25%, transparent 25%)
          `,
          backgroundSize: '80px 80px'
        }}
      ></div>
      
      {/* Layer 5: Animated Floating Circles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-r from-rose-200/30 to-amber-200/30 rounded-full animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-24 h-24 bg-gradient-to-r from-amber-200/30 to-orange-200/30 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-gradient-to-r from-rose-300/40 to-pink-300/40 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>
      
      {/* Layer 6: Subtle Mesh Gradient Overlay */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: `
            radial-gradient(ellipse at top left, rgba(251,191,36,0.2), transparent 40%),
            radial-gradient(ellipse at top right, rgba(236,72,153,0.2), transparent 40%),
            radial-gradient(ellipse at bottom left, rgba(124,58,237,0.1), transparent 40%),
            radial-gradient(ellipse at bottom right, rgba(251,146,60,0.2), transparent 40%)
          `
        }}
      ></div>
      
      <div className="relative max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-rose-400 to-amber-400 rounded-full mb-6 shadow-lg animate-bounce">
            <MessageCircle className="w-8 h-8 text-white" />
          </div>
          <h2 className="font-amsterdam text-5xl md:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-amber-600 to-orange-600 mb-4 animate-fade-in-up">
            Share Your Story
          </h2>
          <p className="font-playfair text-xl md:text-2xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed animate-fade-in-up">
            Your thoughts matter to us. Help us create something beautiful together.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Feedback Form */}
          <div className="order-2 lg:order-1">
            <Card className="backdrop-blur-md bg-white/85 dark:bg-slate-900/85 border-0 shadow-2xl shadow-rose-100/50 dark:shadow-slate-900/50 hover:shadow-3xl transition-all duration-500 hover:bg-white/90 dark:hover:bg-slate-900/90">
              <CardContent className="p-8 md:p-10">
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="space-y-2">
                    <label 
                      htmlFor="feedback-name" 
                      className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3"
                    >
                      <User className="w-4 h-4" />
                      Your Name
                    </label>
                    <Input
                      id="feedback-name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Tell us who you are..."
                      className="h-12 border-2 border-slate-200 dark:border-slate-700 rounded-xl focus:border-rose-400 dark:focus:border-rose-400 transition-all duration-300 text-base bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label 
                      htmlFor="feedback-message" 
                      className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3"
                    >
                      <MessageCircle className="w-4 h-4" />
                      Your Message
                    </label>
                    <Textarea
                      id="feedback-message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Share your thoughts, experiences, or suggestions with us..."
                      rows={5}
                      className="border-2 border-slate-200 dark:border-slate-700 rounded-xl focus:border-rose-400 dark:focus:border-rose-400 transition-all duration-300 text-base resize-none bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm"
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-14 bg-gradient-to-r from-rose-500 via-amber-500 to-orange-500 hover:from-rose-600 hover:via-amber-600 hover:to-orange-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 text-lg disabled:opacity-50 disabled:transform-none relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 animate-shimmer"></div>
                    {isSubmitting ? (
                      <div className="flex items-center gap-2 relative z-10">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Sending...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 relative z-10">
                        <Send className="w-5 h-5" />
                        Send Feedback
                      </div>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Feedback Display */}
          <div className="order-1 lg:order-2">
            {feedbacks.length > 0 ? (
              <div className="space-y-6">
                <div className="text-center lg:text-left">
                  <h3 className="font-playfair text-3xl md:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-slate-700 to-slate-500 dark:from-slate-300 dark:to-slate-100 mb-2">
                    Recent Stories
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    What others are sharing
                  </p>
                </div>
                
                <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-rose-300 dark:scrollbar-thumb-slate-600 scrollbar-track-transparent">
                  {feedbacks.map((feedback, index) => (
                    <Card 
                      key={feedback.id} 
                      className="backdrop-blur-md bg-white/75 dark:bg-slate-800/75 border-0 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:scale-[1.02] animate-fade-in-up hover:bg-white/85 dark:hover:bg-slate-800/85"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <CardContent className="p-6">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-rose-400 to-amber-400 rounded-full flex items-center justify-center shadow-md">
                              <User className="w-5 h-5 text-white" />
                            </div>
                            <h4 className="font-poppins font-semibold text-slate-800 dark:text-slate-200 text-lg">
                              {feedback.name}
                            </h4>
                          </div>
                          <div className="flex items-center gap-1 text-sm text-slate-500 dark:text-slate-400">
                            <Calendar className="w-4 h-4" />
                            {feedback.timestamp}
                          </div>
                        </div>
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-base">
                          "{feedback.message}"
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center lg:text-left py-20">
                <div className="w-24 h-24 bg-gradient-to-r from-rose-100 to-amber-100 dark:from-slate-800 dark:to-slate-700 rounded-full flex items-center justify-center mx-auto lg:mx-0 mb-6 animate-pulse">
                  <MessageCircle className="w-12 h-12 text-rose-400" />
                </div>
                <h3 className="font-playfair text-2xl text-slate-600 dark:text-slate-400 mb-3">
                  Be the first to share
                </h3>
                <p className="text-slate-500 dark:text-slate-500 max-w-md mx-auto lg:mx-0">
                  Your feedback will appear here once you submit the form. Help others by sharing your experience!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeedbackSection;
