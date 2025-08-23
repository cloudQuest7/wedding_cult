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
import OffersSection from "@/components/home/OffersSection";
import FilmStripGSAP from "@/components/home/FilmStripGSAP";

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
    <main className="min-h-screen bg-background w-full ">
      <Hero />
      
      {/* Main Content Sections */}
      <div className=" relative z-10 bg-background max-w-[100vw] overflow-hidden">
        <About />
        {/* <OffersSection /> */}
        <WhyChooseUs />
        <VideoPreview />
        <FilmStripGSAP />
        <PhotoGallery />
        {/* <Reviews /> */}
        <CallToAction />
        <EnquiryForm />
        <FeedbackSection />
        <Footer />
      </div>
    </main>
  );
};

export default Index;
