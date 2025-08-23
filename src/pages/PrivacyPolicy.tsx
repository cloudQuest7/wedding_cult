import { useEffect } from 'react';
import { ChevronRightIcon, ShieldCheckIcon, HeartIcon, CameraIcon, MusicalNoteIcon, UserGroupIcon, DocumentTextIcon, PhoneIcon } from '@heroicons/react/24/outline';

const PrivacyPolicy = () => {
  useEffect(() => {
    document.title = "Privacy Policy - The Wedding Cult";
  }, []);

  const sections = [
    {
      id: "information-collection",
      title: "Information We Collect",
      icon: <DocumentTextIcon className="w-6 h-6" />,
      content: [
        "Your name",
        "Contact number", 
        "Email address",
        "Photos, videos, and related wedding content"
      ]
    },
    {
      id: "how-we-use",
      title: "How We Use Your Information", 
      icon: <CameraIcon className="w-6 h-6" />,
      content: [
        "To communicate with you about our services",
        "To deliver photography and videography projects", 
        "To showcase our portfolio on our website, social media, and marketing materials (with your consent)",
        "To maintain our business records and comply with legal obligations"
      ]
    },
    {
      id: "music-content",
      title: "Use of Music and Third-Party Content",
      icon: <MusicalNoteIcon className="w-6 h-6" />,
      isText: true,
      content: "We may use licensed music, soundtracks from films, and other third-party materials in creating your wedding films. You acknowledge and agree that such content may be used under our professional arrangements, but we do not claim ownership over the original works."
    },
    {
      id: "data-security", 
      title: "Data Security",
      icon: <ShieldCheckIcon className="w-6 h-6" />,
      isText: true,
      content: "We take reasonable measures to protect your personal data from unauthorized access, alteration, disclosure, or destruction. However, no method of online transmission or storage is completely secure."
    },
    {
      id: "sharing-info",
      title: "Sharing of Information",
      icon: <UserGroupIcon className="w-6 h-6" />,
      isText: true, 
      content: "We do not sell or rent your personal information. We may share your details only with trusted vendors or partners involved in delivering your wedding services."
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
                <ShieldCheckIcon className="w-12 h-12 text-cream" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
              Privacy Policy
            </h1>
            <p className="text-xl text-rose-100 max-w-3xl mx-auto leading-relaxed">
              At The Wedding Cult, we value your trust and are committed to protecting your personal information
            </p>
            <div className="mt-6 inline-flex items-center text-rose-200">
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
              <HeartIcon className="w-8 h-8 text-chocolate mt-1" />
            </div>
            <div>
              <h2 className="font-amsterdam text-2xl text-chocolate mb-4">Our Commitment to You</h2>
              <p className="font-playfair text-lg text-muted-foreground">
                At The Wedding Cult ("we," "our," or "us"), we value your trust and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard the details you share with us.
              </p>
            </div>
          </div>
        </div>

        {/* Privacy Sections */}
        <div className="space-y-8">
          {sections.map((section, index) => (
            <div key={section.id} className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-romantic hover:shadow-xl transition-shadow duration-300 border border-chocolate/10">
              <div className="p-8">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="flex-shrink-0 p-3 bg-chocolate rounded-xl text-cream">
                    {section.icon}
                  </div>
                  <h3 className="font-amsterdam text-2xl text-chocolate">{section.title}</h3>
                </div>
                
                {section.isText ? (
                  <p className="font-playfair text-lg text-muted-foreground">{section.content}</p>
                ) : (
                  <ul className="space-y-3">
                    {section.content.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start space-x-3">
                        <ChevronRightIcon className="w-5 h-5 text-chocolate mt-1 flex-shrink-0" />
                        <span className="font-playfair text-lg text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Rights Section */}
        <div className="bg-chocolate rounded-3xl shadow-romantic p-8 mt-12 text-cream">
          <h3 className="font-amsterdam text-2xl mb-4 flex items-center">
            <UserGroupIcon className="w-8 h-8 mr-3" />
            Your Rights
          </h3>
          <p className="font-playfair text-lg text-cream/90">
            You may request access, correction, or deletion of your personal information by contacting us at:{' '}
            <a href="mailto:info@theweddingcult.com" className="text-cream font-semibold hover:text-cream/80 underline decoration-2 underline-offset-2">
              info@theweddingcult.com
            </a>
          </p>
        </div>

        {/* Policy Updates */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-romantic p-8 mt-8 border border-chocolate/10">
          <h3 className="font-amsterdam text-2xl mb-4 text-chocolate flex items-center">
            <DocumentTextIcon className="w-7 h-7 mr-3 text-chocolate" />
            Changes to This Privacy Policy
          </h3>
          <p className="font-playfair text-lg text-muted-foreground">
            We may update this policy from time to time. Any changes will be posted on this page with the updated date.
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
                If you have any questions about this Privacy Policy, please don't hesitate to reach out to us:
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
            <div className="flex items-center justify-center">
              <div className="p-6 bg-white/95 rounded-3xl shadow-romantic">
                <HeartIcon className="w-16 h-16 text-chocolate" />
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

export default PrivacyPolicy;
