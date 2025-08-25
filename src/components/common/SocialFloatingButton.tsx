import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const SocialFloatingButton = () => {
  return (
    <div className="fixed right-4 bottom-28 z-50">
      <a
        href="https://wa.me/917021683240"
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        <Button
          className="w-14 h-14 rounded-full shadow-lg transition-all duration-300 bg-green-500 hover:bg-green-600"
          size="icon"
        >
          <MessageCircle className="w-6 h-6 text-white" />
        </Button>
      </a>
    </div>
  );
};

export default SocialFloatingButton;
