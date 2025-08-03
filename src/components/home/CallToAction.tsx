import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
const CallToAction = () => {
  return <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
        <h2 className="font-amsterdam text-2xl sm:text-3xl text-chocolate mb-4 sm:mb-6 mx-0 px-0 md:text-3xl">
          Your Story Deserves to be Remembered the Right Way
        </h2>
        <p className="font-playfair text-lg sm:text-xl text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto italic px-4 sm:px-0">
          Let's capture your forever.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 sm:px-0">
          <Link to="/portfolio">
            <Button size="lg" className="bg-chocolate hover:bg-chocolate-light text-cream font-poppins font-medium px-6 sm:px-8 py-3 sm:py-4 shadow-soft hover:shadow-glow transition-smooth w-full sm:w-auto">
              View Portfolio
            </Button>
          </Link>
          <Link to="/contact">
            <Button variant="outline" size="lg" className="border-2 border-chocolate text-chocolate hover:bg-chocolate hover:text-cream font-poppins font-medium px-6 sm:px-8 py-3 sm:py-4 transition-smooth w-full sm:w-auto">
              Contact Us
            </Button>
          </Link>
        </div>
      </div>
    </section>;
};
export default CallToAction;