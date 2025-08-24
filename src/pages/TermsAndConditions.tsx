import { useEffect } from 'react';
import { 
  BookOpenIcon, 
  CameraIcon, 
  UserGroupIcon, 
  MusicalNoteIcon, 
  CreditCardIcon, 
  ScaleIcon, 
  PhoneIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';

const TermsAndConditions = () => {
  useEffect(() => {
    document.title = "Terms & Conditions - The Wedding Cult";
  }, []);

  const sections = [
    {
      id: "services",
      title: "Our Services",
      icon: <CameraIcon className="w-6 h-6" />,
      content: "We provide wedding photography, pre-wedding shoots, and videography services. Details of each package will be shared at the time of booking."
    },
    {
      id: "client-responsibilities",
      title: "Client Responsibilities",
      icon: <UserGroupIcon className="w-6 h-6" />,
      isList: true,
      content: [
        "Provide accurate personal details (name, contact number, email)",
        "Obtain necessary permissions for shoot locations",
        "Ensure timely payment as per the agreed schedule"
      ] as string[]
    },
    {
      id: "image-usage",
      title: "Use of Images and Videos",
      icon: <CameraIcon className="w-6 h-6" />,
      content: "We may showcase selected photos and videos from your event in our portfolio, website, and social media for promotional purposes unless you request in writing not to do so."
    },
    {
      id: "music-copyright",
      title: "Music and Copyright",
      icon: <MusicalNoteIcon className="w-6 h-6" />,
      content: "We may use licensed or publicly available songs, as well as music from films, for creating your wedding films. The Wedding Cult does not claim ownership over such third-party content. Any rights or licenses for music are handled in compliance with applicable laws."
    },
    {
      id: "payments",
      title: "Payments and Refunds",
      icon: <CreditCardIcon className="w-6 h-6" />,
      content: "All payments are due as per the agreed contract. Booking amounts are generally non-refundable unless otherwise stated in writing."
    },
    {
      id: "liability",
      title: "Limitation of Liability",
      icon: <ScaleIcon className="w-6 h-6" />,
      content: "We take utmost care in capturing and delivering your moments. However, we are not liable for unforeseen circumstances such as technical failures, natural disasters, or other events beyond our control."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <div className="bg-chocolate text-cream">
        <div className="max-w-6xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-cream/10 rounded-full backdrop-blur-sm">
                <BookOpenIcon className="w-12 h-12 text-cream" />
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
              Terms & Conditions
            </h1>
            <p className="text-xl text-cream/90 max-w-3xl mx-auto leading-relaxed">
              Please read these terms carefully before engaging our services
            </p>
            <div className="mt-6 inline-flex items-center text-cream/80">
              <span className="text-sm">Last updated: August 21, 2025</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        {/* Introduction */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 mb-12 border border-chocolate/10 shadow-romantic">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <BookOpenIcon className="w-8 h-8 text-chocolate mt-1" />
            </div>
            <div>
              <h2 className="font-amsterdam text-2xl text-chocolate mb-4">Introduction</h2>
              <p className="font-playfair text-lg text-muted-foreground">
                Welcome to The Wedding Cult. By engaging our services or using our website (www.theweddingcult.com), you agree to comply with these Terms & Conditions.
              </p>
            </div>
          </div>
        </div>

        {/* Terms Sections */}
        <div className="space-y-8">
          {sections.map((section) => (
            <div key={section.id} className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-romantic hover:shadow-xl transition-shadow duration-300 border border-chocolate/10 leading-loose">
              <div className="p-8">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="flex-shrink-0 p-3 bg-chocolate rounded-xl text-cream">
                    {section.icon}
                  </div>
                  <h3 className="font-amsterdam text-2xl text-chocolate leading-loose">{section.title}</h3>
                </div>
                
                {section.isList ? (
                  <ul className="space-y-3">
                    {section.content.map((item: string, itemIndex: number) => (
                      <li key={itemIndex} className="flex items-start space-x-3">
                        <ChevronRightIcon className="w-5 h-5 text-chocolate mt-1 flex-shrink-0" />
                        <span className="font-playfair text-lg text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="font-playfair text-lg text-muted-foreground">{section.content}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Governing Law Section */}
        <div className="bg-chocolate rounded-3xl shadow-romantic p-8 mt-12 text-cream">
          <h3 className="font-amsterdam text-2xl mb-4 flex items-center">
            <ScaleIcon className="w-8 h-8 mr-3" />
            Governing Law
          </h3>
          <p className="font-playfair text-lg text-cream/90">
            These Terms are governed by the laws of India, and any disputes will be subject to the exclusive jurisdiction of the courts in Mumbai, Maharashtra.
          </p>
        </div>

        {/* Contact Section */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-romantic p-8 mt-8 border border-chocolate/10">
          <h3 className="font-amsterdam text-2xl mb-6 text-chocolate flex items-center">
            <PhoneIcon className="w-7 h-7 mr-3 text-chocolate" />
            Contact Us
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="font-playfair text-lg text-muted-foreground mb-4">
                For any questions about these Terms, please don't hesitate to reach out to us:
              </p>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-chocolate rounded-full"></div>
                  <span className="text-muted-foreground">Email:</span>
                  <a href="mailto:info@theweddingcult.com" className="text-chocolate font-medium hover:text-chocolate/80">
                    info@theweddingcult.com
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-chocolate rounded-full"></div>
                  <span className="text-muted-foreground">Location:</span>
                  <span className="text-chocolate font-medium">Mumbai, India</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center mt-12 py-8">
          <p className="text-muted-foreground text-sm font-playfair">
            © 2025 The Wedding Cult. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
