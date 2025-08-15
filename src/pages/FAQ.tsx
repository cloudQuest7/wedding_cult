"use client"

import { useState } from "react"
import FloatingBallBackground from "@/components/common/FloatingBallBackground"
import SocialFloatingButton from "@/components/common/SocialFloatingButton"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Phone, Mail, Instagram, MessageCircle, ArrowRight, Sparkles, Heart, Plus } from "lucide-react"

const FAQ = () => {
  const [openItems, setOpenItems] = useState<string[]>([])

  const faqs = [
    {
      question: "Do you travel for destination weddings?",
      answer:
        "We love capturing love stories in beautiful destinations. We travel across India and internationally for weddings. Travel and accommodation costs are additional to our packages, and we're happy to provide detailed quotes based on your destination.",
    },
    {
      question: "What's included in your packages?",
      answer:
        "Our packages typically include pre-wedding consultation, full-day wedding coverage, cinematic highlight video, photo gallery, raw footage, and professional editing. We customize each package based on your specific needs and preferences.",
    },
    {
      question: "Do you shoot both photo and video?",
      answer:
        "Yes! We specialize in both photography and videography. Our team captures stunning photos alongside cinematic films, ensuring every moment of your special day is beautifully preserved in both formats.",
    },
    {
      question: "Can we request specific edits or songs?",
      answer:
        "Of course! We love incorporating your favorite songs and specific editing styles. During our consultation, we discuss your preferences, musical choices, and any special moments you want highlighted in your wedding film.",
    },
    {
      question: "How long does delivery take?",
      answer:
        "We typically deliver your complete wedding gallery and highlight video within 4-6 weeks after your wedding. We understand how excited you are to relive your special day, so we also provide a sneak peek within 48-72 hours!",
    },
    {
      question: "Can we meet before booking?",
      answer:
        "We encourage meeting before your wedding day. We offer consultation calls and in-person meetings in Mumbai to discuss your vision, show our portfolio, and ensure we're the perfect fit for your special day.",
    },
    {
      question: "What makes you different from other studios?",
      answer:
        "We focus on authentic storytelling rather than posed shots. Our cinematic approach captures real emotions and creates films that feel like beautiful movies. Plus, we offer premium quality at more affordable rates than big studios.",
    },
    {
      question: "Do you offer pre-wedding shoots?",
      answer:
        "Yes! Pre-wedding shoots are one of our specialties. We love capturing your love story in beautiful locations with cinematic lighting and romantic compositions. It's also a great way for us to get comfortable with each other before the wedding day.",
    },
    {
      question: "What equipment do you use?",
      answer:
        "We use professional cinema cameras, high-quality lenses, and advanced lighting equipment to ensure the best possible quality. Our gear includes multiple backup systems to guarantee nothing is missed on your special day.",
    },
    {
      question: "Do you have backup photographers/videographers?",
      answer:
        "Yes, we always have backup team members ready for every wedding. We also use multiple cameras and equipment backups to ensure comprehensive coverage and reliability throughout your wedding day.",
    },
    {
      question: "What's your payment structure?",
      answer:
        "We typically require a booking amount to secure your date, with the remaining balance due before or on the wedding day. We're flexible with payment plans and happy to discuss options that work best for you.",
    },
    {
      question: "Do you provide raw footage?",
      answer:
        "Yes! Along with the edited highlights, we also provide access to the raw footage so you have every precious moment captured during your celebration. This is included in our standard packages.",
    },
  ]

  const contactMethods = [
    {
      icon: Phone,
      title: "Call Us",
      subtitle: "Quick Response",
      value: "+91 70216 83240",
      href: "tel:+917021683240",
      color: "from-emerald-500 to-teal-600",
      hoverColor: "group-hover:from-emerald-600 group-hover:to-teal-700",
    },
    {
      icon: Mail,
      title: "Email Us",
      subtitle: "Detailed Inquiries",
      value: "theweddingcultfilms@gmail.com",
      href: "mailto:theweddingcultfilms@gmail.com",
      color: "from-blue-500 to-indigo-600",
      hoverColor: "group-hover:from-blue-600 group-hover:to-indigo-700",
    },
    {
      icon: Instagram,
      title: "Follow Us",
      subtitle: "Latest Work",
      value: "@wedding_cult",
      href: "https://www.instagram.com/wedding_cult",
      color: "from-pink-500 to-rose-600",
      hoverColor: "group-hover:from-pink-600 group-hover:to-rose-700",
    },
  ]

  const handleValueChange = (value: string) => {
    setOpenItems(value ? [value] : [])
  }

  return (
    <div 
      className="min-h-screen bg-gradient-to-br from-background mb-7 via-beige-light/10 to-background"
      style={{
        overflowX: 'hidden',
        width: '100%',
        maxWidth: '100vw',
        wordBreak: 'break-word'
      }}
    >
      <FloatingBallBackground />

      <div className="pt-20 pb-16 w-full">
        {/* Elegant Header */}
        <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 overflow-hidden">
          <div className="text-center animate-fade-in-up">
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-chocolate/10 rounded-full backdrop-blur-sm">
              <Sparkles className="w-4 h-4 text-chocolate" />
              <span className="font-poppins text-sm font-medium text-chocolate">Your Questions Answered</span>
            </div>

            <h1 className="font-amsterdam text-2xl sm:text-3xl md:text-3xl text-chocolate mb-4 leading-tight max-w-full break-words">
              Frequently Asked Questions
            </h1>

            <p className="font-playfair text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed break-words">
              Everything you need to know about our wedding photography and videography services.
            </p>
          </div>
        </div>

        {/* Enhanced FAQ Accordion */}
        <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden">
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-chocolate/10 p-6 sm:p-8 lg:p-10 animate-fade-in-up w-full">
            <Accordion type="single" collapsible className="w-full space-y-1" onValueChange={handleValueChange}>
              {faqs.map((faq, index) => {
                const isOpen = openItems.includes(`item-${index}`)
                return (
                  <AccordionItem key={index} value={`item-${index}`} className="border-none group w-full">
                    <AccordionTrigger className="text-left font-playfair text-sm sm:text-base lg:text-lg font-medium text-chocolate hover:text-chocolate-light transition-all duration-500 hover:no-underline p-4 sm:p-5 rounded-2xl hover:bg-gradient-to-r hover:from-chocolate/5 hover:to-beige-warm/10 group relative overflow-hidden [&[data-state=open]]:bg-gradient-to-r [&[data-state=open]]:from-chocolate/8 [&[data-state=open]]:to-beige-warm/15 [&[data-state=open]]:shadow-lg w-full">
                      {/* Decorative line that expands on open */}
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-chocolate to-chocolate/50 rounded-r-full transform scale-y-0 group-data-[state=open]:scale-y-100 transition-transform duration-500 origin-top"></div>

                      {/* Question text */}
                      <span className="pr-12 relative z-10 group-data-[state=open]:text-chocolate group-data-[state=open]:font-semibold transition-all duration-300 break-words max-w-full">
                        {faq.question}
                      </span>

                      {/* Custom animated icon */}
                      <div className="absolute right-4 sm:right-5 top-1/2 -translate-y-1/2 flex items-center justify-center">
                        {/* Heart icon that appears when open */}
                        <Heart
                          className={`w-4 h-4 sm:w-5 sm:h-5 text-chocolate absolute transition-all duration-500 ${
                            isOpen ? "opacity-100 scale-100 rotate-0" : "opacity-0 scale-50 rotate-45"
                          }`}
                          fill={isOpen ? "currentColor" : "none"}
                        />

                        {/* Plus/Minus icon */}
                        <div
                          className={`transition-all duration-500 ${isOpen ? "opacity-0 scale-50 rotate-180" : "opacity-100 scale-100 rotate-0"}`}
                        >
                          <Plus className="w-4 h-4 sm:w-5 sm:h-5 text-chocolate/70" />
                        </div>
                      </div>

                      {/* Floating particles on hover */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                        <div className="absolute top-2 right-8 w-1 h-1 bg-chocolate/30 rounded-full animate-pulse delay-0"></div>
                        <div className="absolute top-4 right-12 w-0.5 h-0.5 bg-beige-warm/50 rounded-full animate-pulse delay-300"></div>
                        <div className="absolute bottom-3 right-10 w-1.5 h-1.5 bg-chocolate/20 rounded-full animate-pulse delay-700"></div>
                      </div>
                    </AccordionTrigger>

                    <AccordionContent className="font-poppins text-muted-foreground leading-relaxed px-4 sm:px-5 pb-4 sm:pb-5 text-sm sm:text-base relative overflow-hidden w-full">
                      {/* Animated content with slide-in effect */}
                      <div className="relative pl-4 sm:pl-6 border-l-2 border-chocolate/10 ml-1 w-full">
                        {/* Decorative quote mark */}
                        <div className="absolute -left-2 -top-1 w-4 h-4 bg-chocolate/10 rounded-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-chocolate/30 rounded-full"></div>
                        </div>

                        <div className="animate-in slide-in-from-left-4 duration-500 break-words max-w-full">{faq.answer}</div>

                        {/* Subtle gradient overlay at bottom */}
                        <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-white/50 to-transparent pointer-events-none"></div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                )
              })}
            </Accordion>
          </div>
        </div>

        {/* Still have questions section - Enhanced */}
        <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 overflow-hidden">
          <div className="animate-fade-in-up w-full">
            <div className="relative bg-gradient-to-br from-chocolate via-chocolate-light to-chocolate rounded-2xl p-6 sm:p-8 lg:p-12 shadow-2xl overflow-hidden w-full">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>

              <div className="relative text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6">
                  <MessageCircle className="w-8 h-8 text-white" />
                </div>

                <h2 className="font-amsterdam text-2xl sm:text-3xl lg:text-4xl text-white mb-4 max-w-full break-words">Still have questions?</h2>
                <p className="font-playfair text-base sm:text-lg text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed break-words">
                  We're here to help! Reach out to us and we'll be happy to answer any questions about your special day.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <a
                    href="/contact"
                    className="group inline-flex items-center justify-center bg-white text-chocolate px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-poppins font-semibold hover:bg-cream transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 text-sm sm:text-base"
                  >
                    Contact Us
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </a>
                  <a
                    href="https://wa.me/917021683240"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center justify-center bg-transparent border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-poppins font-semibold hover:bg-white hover:text-chocolate transition-all duration-300 transform hover:scale-105 text-sm sm:text-base"
                  >
                    <MessageCircle className="mr-2 w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                    WhatsApp Us
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Elegant Contact Cards */}
        <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 animate-fade-in-up w-full">
            {contactMethods.map((method, index) => {
              const IconComponent = method.icon
              return (
                <a
                  key={index}
                  href={method.href}
                  target={method.href.startsWith("http") ? "_blank" : undefined}
                  rel={method.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="group relative bg-white/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-lg border border-white/20 hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 overflow-hidden w-full"
                  style={{ maxWidth: '100%' }}
                >
                  {/* Gradient background on hover */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${method.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                  ></div>

                  {/* Icon with gradient background */}
                  <div className="relative mb-4">
                    <div
                      className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br ${method.color} ${method.hoverColor} rounded-xl shadow-lg transition-all duration-300 group-hover:shadow-xl group-hover:scale-110`}
                    >
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="relative">
                    <h3 className="font-amsterdam text-lg text-chocolate mb-2 group-hover:text-chocolate-light transition-colors duration-300 break-words max-w-full">
                      {method.title}
                    </h3>
                    <p className="font-poppins text-xs text-muted-foreground/70 mb-2 uppercase tracking-wider break-words">
                      {method.subtitle}
                    </p>
                    <p 
                      className="font-poppins text-sm text-muted-foreground group-hover:text-chocolate transition-colors duration-300 leading-relaxed max-w-full"
                      style={{ 
                        wordBreak: 'break-all',
                        overflowWrap: 'break-word',
                        maxWidth: '100%'
                      }}
                    >
                      {method.value}
                    </p>
                  </div>

                  {/* Hover arrow */}
                  <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                    <ArrowRight className="w-4 h-4 text-chocolate" />
                  </div>
                </a>
              )
            })}
          </div>
        </div>
      </div>

      <SocialFloatingButton />
    </div>
  )
}

export default FAQ
