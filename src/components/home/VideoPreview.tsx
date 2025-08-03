import { useState } from "react";

const VideoPreview = () => {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  const videos = [
    {
      id: 'video1',
      embedId: 'jF_kNaTp-KA',
      title: 'Neel & Jheel Wedding Film',
      coupleNames: 'Neel & Jheel',
      description: 'Emotional wedding in Jaipur – a story of love and warmth'
    },
    {
      id: 'video2', 
      embedId: 'XOyKGqbR2nM',
      title: 'Rahul & Manisha Wedding Film',
      coupleNames: 'Rahul & Manisha',
      description: 'Classic Mumbai wedding full of energy and joy'
    }
  ];

  const handleVideoPlay = (videoId: string) => {
    setActiveVideo(activeVideo === videoId ? null : videoId);
  };

  return <section className="px-4 sm:px-8 md:px-12 lg:px-[54px] py-12 sm:py-16 md:py-20 lg:py-[84px]">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="font-amsterdam text-2xl sm:text-3xl text-chocolate mb-6 sm:mb-8 animate-fade-in-up mx-0 px-[3px] md:text-2xl">
          Featured Wedding Films
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {videos.map((video, index) => (
            <div key={video.id} className="animate-fade-in-up" style={{
              animationDelay: `${0.2 + index * 0.2}s`
            }}>
              <div className="aspect-video rounded-lg overflow-hidden shadow-soft hover:shadow-romantic transition-smooth relative">
                {activeVideo === video.id ? (
                  <iframe 
                    className="w-full h-full" 
                    src={`https://www.youtube.com/embed/${video.embedId}?autoplay=1&rel=0&modestbranding=1`}
                    title={video.title}
                    allow="autoplay; fullscreen"
                    key={`${video.id}-playing`}
                  />
                ) : (
                  <div 
                    className="w-full h-full bg-cover bg-center cursor-pointer flex items-center justify-center"
                    style={{
                      backgroundImage: `url(https://img.youtube.com/vi/${video.embedId}/maxresdefault.jpg)`
                    }}
                    onClick={() => handleVideoPlay(video.id)}
                  >
                    <div className="bg-chocolate/80 text-cream p-4 rounded-full hover:bg-chocolate transition-smooth">
                      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z"/>
                      </svg>
                    </div>
                  </div>
                )}
              </div>
              <div className="mt-3 sm:mt-4 text-center">
                <h3 className="font-amsterdam text-chocolate text-lg sm:text-xl mb-1 sm:mb-2">{video.coupleNames}</h3>
                <p className="font-playfair text-muted-foreground italic text-sm sm:text-base">{video.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>;
};
export default VideoPreview;