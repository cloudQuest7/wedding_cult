import { useEffect, useRef } from "react";
import FloatingBallBackground from "@/components/common/FloatingBallBackground";
import Hero from "@/components/home/Hero";
import About from "@/components/home/About";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import VideoPreview from "@/components/home/VideoPreview";
import PhotoGallery from "@/components/home/PhotoGallery";
import Reviews from "@/components/home/Reviews";
import CallToAction from "@/components/home/CallToAction";
import EnquiryForm from "@/components/home/EnquiryForm";
import FeedbackSection from "@/components/feedback/FeedbackSection";
import Footer from "@/components/home/Footer";

const Index = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Auto-play video when component mounts
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay failed, user interaction required
        console.log("Autoplay was prevented");
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Floating Ball Background */}
      <FloatingBallBackground />
      
      <Hero />
      
      {/* Main Content Sections */}
      <div className="relative z-10 bg-background">
        <About />
        <WhyChooseUs />
        <VideoPreview />
        <PhotoGallery />
        <Reviews />
        <CallToAction />
        <EnquiryForm />
        <FeedbackSection />
        <Footer />
      </div>
    </div>
  );
};

export default Index;