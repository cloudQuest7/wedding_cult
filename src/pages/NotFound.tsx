import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import FloatingBallBackground from "@/components/common/FloatingBallBackground";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <FloatingBallBackground />
      <div className="text-center relative z-10">
        <h1 className="font-amsterdam text-6xl text-chocolate mb-4">404</h1>
        <p className="font-playfair text-xl text-muted-foreground mb-6">Oops! Page not found</p>
        <Link to="/">
          <Button className="bg-chocolate text-cream hover:bg-chocolate-light transition-smooth">
            Return to Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
