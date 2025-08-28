"use client"

import { useState, useRef } from "react"
import emailjs from "@emailjs/browser"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

const EnquiryForm = () => {
  const formRef = useRef<HTMLFormElement>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [eventType, setEventType] = useState<string>("")
  const [otherEventType, setOtherEventType] = useState<string>("")
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formRef.current) return

    setIsSubmitting(true)

    try {
      // Add event type to form data before sending
      const eventTypeInput = document.createElement("input")
      eventTypeInput.type = "hidden"
      eventTypeInput.name = "eventType"
      eventTypeInput.value = eventType === "other" ? otherEventType : eventType
      formRef.current.appendChild(eventTypeInput)

      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formRef.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )

      // Clean up the temporary input
      formRef.current.removeChild(eventTypeInput)

      toast({
        title: "Enquiry Sent!",
        description: "Thank you — your enquiry has been sent successfully.",
      })

      formRef.current.reset()
    } catch (error) {
      console.error("Email send failed", error)
      toast({
        title: "Submission Failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    }

    setIsSubmitting(false)
  }

  return (
    <section className="py-15 px-4 bg-gradient-to-b from-background to-beige-light">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-6 animate-fade-in-up">
          <h2 className="font-amsterdam text-chocolate mb-4 text-xl leading-loose">
            Let’s Create Magic Together
          </h2>
          <p className="font-playfair text-lg text-muted-foreground max-w-2xl mx-auto">
            Tell us about your special day and let's begin crafting your cinematic love story.
          </p>
        </div>

        <div
          className="bg-card rounded-lg shadow-romantic p-8 animate-fade-in-up"
          style={{ animationDelay: "0.2s" }}
        >
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="font-poppins font-medium text-chocolate">
                  Name *
                </Label>
                <Input
                  id="name"
                  name="name"
                  required
                  className="border-beige focus:border-chocolate"
                  placeholder="Your full name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="font-poppins font-medium text-chocolate">
                  Email *
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="border-beige focus:border-chocolate"
                  placeholder="your.email@example.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="phone" className="font-poppins font-medium text-chocolate">
                  Phone Number *
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  className="border-beige focus:border-chocolate"
                  placeholder="+91 12345 67890"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="eventDate" className="font-poppins font-medium text-chocolate">
                  Event Date
                </Label>
                <Input
                  id="eventDate"
                  name="eventDate"
                  type="text"
                  className="border-beige focus:border-chocolate"
                  placeholder="e.g., 15th December 2025"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="font-poppins font-medium text-chocolate mb-2 block">
                Event Type
              </Label>
              <ToggleGroup
                type="single"
                value={eventType}
                onValueChange={(value) => {
                  setEventType(value)
                  if (value !== "other") {
                    setOtherEventType("")
                  }
                }}
                className="flex flex-wrap gap-2"
              >
                <ToggleGroupItem
                  value="wedding"
                  className="bg-beige-light/30 data-[state=on]:bg-chocolate data-[state=on]:text-white px-4 py-2 rounded-lg font-poppins"
                >
                  Wedding
                </ToggleGroupItem>
                <ToggleGroupItem
                  value="pre-event"
                  className="bg-beige-light/30 data-[state=on]:bg-chocolate data-[state=on]:text-white px-4 py-2 rounded-lg font-poppins"
                >
                  Pre-Event
                </ToggleGroupItem>
                <ToggleGroupItem
                  value="other"
                  className="bg-beige-light/30 data-[state=on]:bg-chocolate data-[state=on]:text-white px-4 py-2 rounded-lg font-poppins"
                >
                  Other
                </ToggleGroupItem>
              </ToggleGroup>
              {eventType === "other" && (
                <div className="mt-2">
                  <Input
                    id="otherEventType"
                    name="otherEventType"
                    value={otherEventType}
                    onChange={(e) => setOtherEventType(e.target.value)}
                    className="border-beige focus:border-chocolate"
                    placeholder="Please specify your event type"
                  />
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="message" className="font-poppins font-medium text-chocolate">
                Tell us about your vision
              </Label>
              <Textarea
                id="message"
                name="message"
                required
                rows={4}
                className="border-beige focus:border-chocolate resize-none"
                placeholder="Share details about your event, preferred style, location, or any special requirements..."
              />
            </div>

            <div className="text-center">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-chocolate hover:bg-chocolate-light text-cream px-8 py-3 rounded-lg font-poppins font-medium shadow-soft hover:shadow-glow transition-all duration-300"
              >
                {isSubmitting ? "Submitting..." : "Submit Enquiry"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default EnquiryForm
