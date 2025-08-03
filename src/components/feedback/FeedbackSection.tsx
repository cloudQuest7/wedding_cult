import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

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

    // Create new feedback
    const newFeedback: Feedback = {
      id: Date.now(),
      name: name.trim(),
      message: message.trim(),
      timestamp: new Date().toLocaleDateString()
    };

    // Add to feedbacks (prepend to show latest first)
    setFeedbacks(prev => [newFeedback, ...prev]);

    // Reset form
    setName("");
    setMessage("");
    setIsSubmitting(false);

    toast({
      title: "Feedback submitted!",
      description: "Thank you for your valuable feedback.",
    });
  };

  return (
    <section className="py-16 px-4 bg-gradient-warm">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-amsterdam text-4xl text-chocolate mb-4 animate-fade-in-up">
            Share Your Feedback
          </h2>
          <p className="font-playfair text-lg text-muted-foreground animate-fade-in-up">
            We'd love to hear from you. Your feedback helps us improve.
          </p>
        </div>

        {/* Feedback Form */}
        <Card className="mb-12 shadow-soft">
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="feedback-name" className="block text-sm font-medium text-foreground mb-2">
                  Your Name *
                </label>
                <Input
                  id="feedback-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="transition-smooth"
                  required
                />
              </div>

              <div>
                <label htmlFor="feedback-message" className="block text-sm font-medium text-foreground mb-2">
                  Your Message *
                </label>
                <Textarea
                  id="feedback-message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Share your thoughts, suggestions, or experience..."
                  rows={4}
                  className="transition-smooth"
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full gradient-romantic text-cream font-medium shadow-soft hover:shadow-glow transition-smooth"
              >
                {isSubmitting ? "Submitting..." : "Submit Feedback"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Feedback Display */}
        {feedbacks.length > 0 && (
          <div>
            <h3 className="font-playfair text-2xl text-chocolate mb-6 text-center">
              Recent Feedback
            </h3>
            <div className="space-y-4">
              {feedbacks.map((feedback) => (
                <Card key={feedback.id} className="shadow-soft animate-fade-in-up">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-poppins font-medium text-chocolate">
                        {feedback.name}
                      </h4>
                      <span className="text-sm text-muted-foreground">
                        {feedback.timestamp}
                      </span>
                    </div>
                    <p className="text-foreground leading-relaxed">
                      {feedback.message}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeedbackSection;