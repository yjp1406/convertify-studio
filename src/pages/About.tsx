import Layout from "@/components/Layout";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function About() {
  return (
    <Layout
      title="About Convertify - Free Online File Conversion Tools"
      description="Learn about Convertify's mission to provide free, secure, browser-based file conversion tools. Your files never leave your device."
      keywords="about convertify, file converter, online tools, privacy, secure conversion"
    >
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">About Convertify</h1>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="text-muted-foreground mb-4">
            Convertify exists because file conversion should be simple, free, and private. We built 
            this platform after experiencing the frustration of online converters that require 
            sign-ups, bombard users with ads, or upload files to unknown servers. There had to be 
            a better way.
          </p>
          <p className="text-muted-foreground mb-4">
            Our mission is straightforward: provide powerful file conversion tools that respect 
            your privacy and cost you nothing. Every tool on Convertify processes files directly 
            in your browser. Your documents, images, and PDFs never travel to our servers or any 
            third-party service. This is not just a feature—it is the foundation of everything we build.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Why We Built Convertify</h2>
          <p className="text-muted-foreground mb-4">
            The idea for Convertify came from a common scenario: needing to quickly convert a file 
            and finding that every online tool either required payment, forced account creation, 
            or seemed questionable about data handling. Converting a simple image should not require 
            trusting a random website with your personal photos.
          </p>
          <p className="text-muted-foreground mb-4">
            Modern web browsers are remarkably capable. They can process images, manipulate PDFs, 
            and handle complex file operations without any server involvement. We realized we could 
            build professional-quality conversion tools that run entirely client-side, giving users 
            the convenience of online tools with the security of desktop software.
          </p>
          <p className="text-muted-foreground mb-4">
            That realization became Convertify. Every tool we develop follows the same principle: 
            maximum functionality, zero data collection, completely free access.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Privacy and Security</h2>
          <p className="text-muted-foreground mb-4">
            We take a fundamentally different approach to privacy than most online services. 
            Rather than promising to protect your data after you upload it, we designed our 
            system so your data never leaves your device in the first place.
          </p>
          <p className="text-muted-foreground mb-4">
            When you use any Convertify tool, the processing happens locally in your web browser. 
            Your files are read, converted, and made available for download without ever being 
            transmitted over the internet. We cannot see your files because they never reach us. 
            This is not a policy decision—it is how the technology works.
          </p>
          <p className="text-muted-foreground mb-4">
            This approach means you can safely convert sensitive documents, personal photos, 
            confidential business materials, or anything else without concern. There is no data 
            to breach because there is no data stored.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Meet the Creator</h2>
          <p className="text-muted-foreground mb-4">
            Hello! I am Yagnesh, the developer behind Convertify. I created this platform because 
            I believe essential tools should be accessible to everyone, regardless of their technical 
            expertise or budget.
          </p>
          <p className="text-muted-foreground mb-4">
            With a background in web development and a passion for user-friendly design, I spent 
            considerable time researching and implementing the most efficient client-side processing 
            techniques. My goal was creating tools that feel instant and effortless while maintaining 
            professional quality output.
          </p>
          <p className="text-muted-foreground mb-4">
            I use Convertify myself daily. Whether converting screenshots for documentation, 
            compressing PDFs for email, or merging documents for submissions, these tools solve 
            real problems I encounter regularly. This personal investment ensures every feature 
            works exactly as expected.
          </p>
          <p className="text-muted-foreground mb-4">
            Feedback from users helps shape Convertify's future. If you have suggestions, encounter 
            issues, or want to see new tools added, I genuinely want to hear from you. This platform 
            grows based on what users actually need.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Our Values</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-muted/30 p-6 rounded-lg">
              <h3 className="font-semibold mb-2">Privacy First</h3>
              <p className="text-sm text-muted-foreground">
                Your files stay on your device. We designed our tools so we cannot access 
                your data even if we wanted to.
              </p>
            </div>
            <div className="bg-muted/30 p-6 rounded-lg">
              <h3 className="font-semibold mb-2">Always Free</h3>
              <p className="text-sm text-muted-foreground">
                No hidden costs, no premium tiers, no paywalls. Every tool is completely 
                free to use without limitations.
              </p>
            </div>
            <div className="bg-muted/30 p-6 rounded-lg">
              <h3 className="font-semibold mb-2">No Account Required</h3>
              <p className="text-sm text-muted-foreground">
                Use any tool immediately. No sign-up, no email verification, no barriers 
                between you and getting work done.
              </p>
            </div>
            <div className="bg-muted/30 p-6 rounded-lg">
              <h3 className="font-semibold mb-2">Quality Output</h3>
              <p className="text-sm text-muted-foreground">
                Our tools produce professional results. Conversions maintain quality, 
                compressions preserve readability, merges work seamlessly.
              </p>
            </div>
          </div>
        </section>

        <Separator className="my-10" />

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>Is Convertify really free?</AccordionTrigger>
              <AccordionContent>
                Yes, completely free. There are no premium tiers, no usage limits, and no hidden 
                costs. Every tool is fully functional without payment. We sustain the platform 
                through minimal, non-intrusive advertising.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>How do you protect my files?</AccordionTrigger>
              <AccordionContent>
                Your files never leave your device. All processing happens locally in your browser 
                using JavaScript and WebAssembly technology. We cannot see, access, or store your 
                files because they are never transmitted to any server.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Do I need to create an account?</AccordionTrigger>
              <AccordionContent>
                No. You can use every tool immediately without signing up, providing an email address, 
                or creating any form of account. Just visit the tool page and start converting.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>What browsers are supported?</AccordionTrigger>
              <AccordionContent>
                Convertify works in all modern browsers including Chrome, Firefox, Safari, and Edge. 
                We recommend keeping your browser updated for the best experience. Our tools also 
                work on mobile browsers for on-the-go conversions.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger>Are there file size limits?</AccordionTrigger>
              <AccordionContent>
                Since processing happens in your browser, limits depend on your device's available 
                memory. Most devices handle files up to 50-100MB without issues. Very large files 
                may require more powerful devices or desktop browsers.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-6">
              <AccordionTrigger>Can I suggest new features or tools?</AccordionTrigger>
              <AccordionContent>
                Absolutely! User feedback drives development priorities. Contact us with suggestions 
                for new tools or improvements to existing ones. We regularly add features based on 
                user requests.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

        <section className="bg-muted/30 p-8 rounded-lg text-center">
          <h2 className="text-2xl font-semibold mb-4">Ready to Get Started?</h2>
          <p className="text-muted-foreground mb-6">
            Explore our collection of free tools and experience file conversion the way it should be.
          </p>
          <a 
            href="/" 
            className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Browse All Tools
          </a>
        </section>
      </div>
    </Layout>
  );
}
