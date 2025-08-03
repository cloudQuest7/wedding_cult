const About = () => {
  return <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="font-amsterdam text-2xl sm:text-3xl md:text-4xl text-chocolate mb-6 sm:mb-8 animate-fade-in-up mx-0 px-0 lg:text-2xl">
          We Don't Just Shoot Weddings — We Craft Stories
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
          <div className="space-y-4 sm:space-y-6 font-playfair text-base sm:text-lg text-foreground animate-fade-in-up px-4 sm:px-0" style={{
          animationDelay: "0.2s"
        }}>
            <p>Every wedding is unique. So is our storytelling.</p>
            <p>We always aim to do better than our last project.</p>
          </div>
          <div className="space-y-4 sm:space-y-6 font-playfair text-base sm:text-lg text-foreground animate-fade-in-up px-4 sm:px-0" style={{
          animationDelay: "0.4s"
        }}>
            <p>We're not expensive like big studios — but our films speak louder.</p>
            <p className="italic text-chocolate">The Wedding Cult is known for capturing real, raw emotions. We don't force moments — we find them.</p>
          </div>
        </div>
      </div>
    </section>;
};
export default About;