import Layout from "@/components/Layout";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Clock, MessageSquare } from "lucide-react";
import { toast } from "sonner";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Send form data to Formspree
      const response = await fetch("https://formspree.io/f/xpwzgqkd", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        }),
      });

      if (response.ok) {
        toast.success("Message sent successfully! We'll get back to you within 24-48 hours.");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        throw new Error("Failed to send");
      }
    } catch (error) {
      // Fallback: open email client
      const mailtoLink = `mailto:yagneshjp1406@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`)}`;
      window.location.href = mailtoLink;
      toast.info("Opening your email client to send the message.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout
      title="Contact Us - Convertify Support"
      description="Get in touch with the Convertify team. We're here to help with questions, feedback, and technical support."
      keywords="contact convertify, support, help, feedback, technical support"
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Have questions, suggestions, or need help with our tools? We are here to assist you.
            Fill out the form below or reach out directly via email.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <Card>
            <CardHeader className="text-center">
              <Mail className="h-10 w-10 mx-auto mb-2 text-primary" />
              <CardTitle className="text-lg">Email Us</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <a 
                href="mailto:yagneshjp1406@gmail.com" 
                className="text-primary hover:underline font-medium"
              >
                yagneshjp1406@gmail.com
              </a>
              <p className="text-sm text-muted-foreground mt-2">
                For all inquiries and support
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="text-center">
              <Clock className="h-10 w-10 mx-auto mb-2 text-primary" />
              <CardTitle className="text-lg">Response Time</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="font-medium">24-48 Hours</p>
              <p className="text-sm text-muted-foreground mt-2">
                We aim to respond to all messages within two business days
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="text-center">
              <MessageSquare className="h-10 w-10 mx-auto mb-2 text-primary" />
              <CardTitle className="text-lg">Feedback Welcome</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="font-medium">We Listen</p>
              <p className="text-sm text-muted-foreground mt-2">
                Your suggestions help us improve our tools
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-semibold mb-6">Send Us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Your Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  name="subject"
                  placeholder="What is this regarding?"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Please describe your question, issue, or feedback in detail..."
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-6">How Can We Help?</h2>
            
            <div className="space-y-6">
              <div className="bg-muted/30 p-6 rounded-lg">
                <h3 className="font-semibold mb-2">Technical Support</h3>
                <p className="text-sm text-muted-foreground">
                  Experiencing issues with a tool? Please include the following in your message:
                </p>
                <ul className="text-sm text-muted-foreground mt-2 space-y-1 list-disc list-inside">
                  <li>Which tool you were using</li>
                  <li>Your browser and device type</li>
                  <li>A description of the issue</li>
                  <li>Any error messages you saw</li>
                </ul>
              </div>

              <div className="bg-muted/30 p-6 rounded-lg">
                <h3 className="font-semibold mb-2">Feature Requests</h3>
                <p className="text-sm text-muted-foreground">
                  Have an idea for a new tool or improvement? We love hearing user suggestions. 
                  Describe what you need and how it would help your workflow.
                </p>
              </div>

              <div className="bg-muted/30 p-6 rounded-lg">
                <h3 className="font-semibold mb-2">Business Inquiries</h3>
                <p className="text-sm text-muted-foreground">
                  For partnership opportunities, advertising inquiries, or business-related 
                  questions, please email us directly with details about your proposal.
                </p>
              </div>

              <div className="bg-muted/30 p-6 rounded-lg">
                <h3 className="font-semibold mb-2">General Feedback</h3>
                <p className="text-sm text-muted-foreground">
                  Whether it is praise, constructive criticism, or general thoughts about 
                  Convertify, your feedback is valuable. It helps us understand what is working 
                  and what needs improvement.
                </p>
              </div>
            </div>

            <div className="mt-8 p-6 border border-border rounded-lg">
              <h3 className="font-semibold mb-2">Before You Contact Us</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Many common questions are answered in our documentation:
              </p>
              <ul className="text-sm space-y-2">
                <li>
                  <a href="/about" className="text-primary hover:underline">
                    About Convertify & FAQ
                  </a>
                </li>
                <li>
                  <a href="/privacy-policy" className="text-primary hover:underline">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="/terms-and-conditions" className="text-primary hover:underline">
                    Terms & Conditions
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
