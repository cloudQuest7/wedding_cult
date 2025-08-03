const FloatingBallBackground = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Floating ball animation */}
      <div className="absolute top-1/4 left-1/4 w-16 h-16 bg-gradient-to-r from-chocolate/10 to-beige-warm/10 rounded-full blur-xl animate-float-slow"></div>
      <div className="absolute top-3/4 right-1/4 w-24 h-24 bg-gradient-to-r from-beige-warm/10 to-cream/10 rounded-full blur-xl animate-float-slower"></div>
      <div className="absolute top-1/2 right-1/3 w-12 h-12 bg-gradient-to-r from-gold-accent/10 to-chocolate/10 rounded-full blur-xl animate-float-gentle"></div>
    </div>
  );
};

export default FloatingBallBackground;