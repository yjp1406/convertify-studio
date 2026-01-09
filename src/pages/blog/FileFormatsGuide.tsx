import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import AuthorBox from "@/components/AuthorBox";

export default function FileFormatsGuide() {
  return (
    <Layout
      title="Complete Guide to Image & PDF Formats (2025) | Convertify"
      description="The definitive guide to understanding image and PDF formats. Learn when to use JPG, PNG, WebP, HEIC, and PDF, with practical examples and conversion tips."
      keywords="image formats guide, PDF guide, JPG vs PNG, WebP format, HEIC conversion, file format comparison, 2025 guide"
    >
      <article className="max-w-4xl mx-auto prose prose-slate">
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Complete Guide to Image & PDF Formats (2025)</h1>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <time dateTime="2024-10-20">October 20, 2024</time>
            <span>•</span>
            <span>25 min read</span>
          </div>
          <p className="text-lg text-muted-foreground mt-4">
            A comprehensive, practical guide to understanding when and why to use different 
            file formats. Based on real-world experience building file conversion tools.
          </p>
        </header>

        <nav className="bg-muted/30 p-6 rounded-lg mb-8">
          <h2 className="text-xl font-semibold mb-4">Table of Contents</h2>
          <ul className="space-y-2 text-sm">
            <li><a href="#introduction" className="text-primary hover:underline">Introduction: Why Formats Matter</a></li>
            <li><a href="#image-formats" className="text-primary hover:underline">Part 1: Image Formats Explained</a></li>
            <li><a href="#jpg-format" className="text-primary hover:underline">JPG/JPEG: The Universal Standard</a></li>
            <li><a href="#png-format" className="text-primary hover:underline">PNG: Quality and Transparency</a></li>
            <li><a href="#webp-format" className="text-primary hover:underline">WebP: The Modern Web Format</a></li>
            <li><a href="#heic-format" className="text-primary hover:underline">HEIC: Apple's Efficient Format</a></li>
            <li><a href="#pdf-formats" className="text-primary hover:underline">Part 2: PDF Fundamentals</a></li>
            <li><a href="#choosing-formats" className="text-primary hover:underline">Part 3: Choosing the Right Format</a></li>
            <li><a href="#conversion-guide" className="text-primary hover:underline">Part 4: Practical Conversion Guide</a></li>
            <li><a href="#common-mistakes" className="text-primary hover:underline">Part 5: Common Mistakes to Avoid</a></li>
            <li><a href="#conclusion" className="text-primary hover:underline">Conclusion</a></li>
          </ul>
        </nav>

        <section id="introduction">
          <h2 className="text-2xl font-semibold mt-8 mb-4">Introduction: Why Formats Matter</h2>
          
          <p>
            When I first started building Convertify Studio, I assumed file conversion was straightforward. 
            You take a file in one format and save it in another. Simple, right? After processing thousands 
            of user files and reading countless support emails, I learned that format choice has profound 
            implications for file size, quality, compatibility, and even privacy.
          </p>

          <p>
            This guide is everything I wish I knew when I started. It's not just theory—it's practical 
            knowledge gained from building tools that handle real files for real users. Whether you're 
            a photographer managing a portfolio, a business professional sending documents, or someone 
            who just wants their iPhone photos to work on Windows, this guide will help you make informed 
            decisions.
          </p>

          <p>
            I've organized this guide into practical sections. You can read it straight through for 
            comprehensive understanding, or jump to specific formats you need to learn about.
          </p>
        </section>

        <Separator className="my-8" />

        <section id="image-formats">
          <h2 className="text-2xl font-semibold mt-8 mb-4">Part 1: Image Formats Explained</h2>
          
          <p>
            Every image format makes trade-offs between file size, quality, features, and compatibility. 
            Understanding these trade-offs is the key to choosing the right format for any situation.
          </p>

          <h3 id="jpg-format" className="text-xl font-semibold mt-6 mb-3">JPG/JPEG: The Universal Standard</h3>

          <p>
            JPG (also written as JPEG) has been the dominant image format since the 1990s. It uses 
            "lossy" compression, meaning it discards some image data to achieve smaller file sizes. 
            This sounds bad, but in practice, skilled compression produces images that look nearly 
            identical to the original while being 10-20 times smaller.
          </p>

          <p><strong>When I recommend JPG:</strong></p>
          <ul className="list-disc pl-6 space-y-2 my-4">
            <li><strong>Photographs:</strong> JPG's compression algorithm is specifically designed for the gradual color transitions in photos. It excels here.</li>
            <li><strong>Email attachments:</strong> Small file sizes mean faster sending and receiving. Most email clients handle JPG perfectly.</li>
            <li><strong>Social media:</strong> Platforms like Instagram, Facebook, and Twitter prefer JPG. They often recompress other formats anyway.</li>
            <li><strong>Website images (photos):</strong> Good balance of quality and loading speed.</li>
          </ul>

          <p><strong>When I don't recommend JPG:</strong></p>
          <ul className="list-disc pl-6 space-y-2 my-4">
            <li><strong>Images with text:</strong> JPG compression creates visible artifacts around sharp edges and text.</li>
            <li><strong>Graphics with transparency:</strong> JPG doesn't support transparent backgrounds.</li>
            <li><strong>Images you'll edit repeatedly:</strong> Each save adds more compression artifacts.</li>
            <li><strong>Screenshots:</strong> The sharp edges in UI elements get blurry.</li>
          </ul>

          <p>
            <strong>Quality settings matter:</strong> A JPG at 95% quality looks almost identical to the 
            original but is about 5x smaller. At 80%, you might notice slight quality loss but the file 
            is 10x smaller. Below 70%, quality degradation becomes obvious. I typically use 85-90% for 
            photos I care about.
          </p>

          <p>
            <Link to="/png-to-jpg" className="text-primary hover:underline">
              Convert PNG to JPG with our free tool →
            </Link>
          </p>

          <h3 id="png-format" className="text-xl font-semibold mt-6 mb-3">PNG: Quality and Transparency</h3>

          <p>
            PNG uses "lossless" compression—it makes files smaller without discarding any data. 
            Every pixel is preserved exactly as it was created. PNG also supports transparency, 
            making it essential for graphics that need to overlay other content.
          </p>

          <p><strong>When I recommend PNG:</strong></p>
          <ul className="list-disc pl-6 space-y-2 my-4">
            <li><strong>Logos and graphics:</strong> Sharp edges stay sharp. Text remains crisp.</li>
            <li><strong>Screenshots:</strong> UI elements and text are perfectly preserved.</li>
            <li><strong>Images with transparency:</strong> The only widely-supported format for transparent backgrounds.</li>
            <li><strong>Graphics you'll edit later:</strong> No quality loss with repeated saves.</li>
            <li><strong>Digital art:</strong> Preserves exact colors and details.</li>
          </ul>

          <p><strong>When I don't recommend PNG:</strong></p>
          <ul className="list-disc pl-6 space-y-2 my-4">
            <li><strong>Photographs:</strong> PNG files are 5-10x larger than equivalent JPGs with no visible quality benefit.</li>
            <li><strong>Large image collections:</strong> Storage space adds up quickly.</li>
            <li><strong>Social media posts:</strong> Most platforms convert to JPG anyway.</li>
          </ul>

          <p>
            <strong>A common misconception:</strong> Converting a JPG to PNG won't improve quality. 
            The quality lost during JPG compression is gone permanently. PNG just preserves whatever 
            quality remains. However, if you plan to edit the image further, converting to PNG 
            prevents additional quality loss from repeated JPG saves.
          </p>

          <p>
            <Link to="/jpg-to-png" className="text-primary hover:underline">
              Convert JPG to PNG with our free tool →
            </Link>
          </p>

          <h3 id="webp-format" className="text-xl font-semibold mt-6 mb-3">WebP: The Modern Web Format</h3>

          <p>
            WebP was created by Google specifically for the web. It offers better compression than 
            both JPG and PNG while supporting transparency and animation. A WebP file is typically 
            25-35% smaller than an equivalent JPG at the same visual quality.
          </p>

          <p><strong>When I recommend WebP:</strong></p>
          <ul className="list-disc pl-6 space-y-2 my-4">
            <li><strong>Website images:</strong> Faster loading times improve user experience and SEO.</li>
            <li><strong>Web applications:</strong> Reduced bandwidth usage benefits both users and servers.</li>
            <li><strong>Modern platforms:</strong> Many services now accept or prefer WebP.</li>
          </ul>

          <p><strong>When I don't recommend WebP:</strong></p>
          <ul className="list-disc pl-6 space-y-2 my-4">
            <li><strong>Sharing with others:</strong> Not everyone's software can open WebP files.</li>
            <li><strong>Archival storage:</strong> JPG and PNG have decades of support; WebP is relatively new.</li>
            <li><strong>Print applications:</strong> Traditional printing workflows expect JPG, PNG, or TIFF.</li>
          </ul>

          <p>
            <strong>Compatibility note:</strong> All modern browsers support WebP (Chrome, Firefox, Safari, Edge). 
            However, some older software, email clients, and image viewers struggle with it. When I receive 
            WebP files that I need to share with colleagues, I usually convert them to JPG first.
          </p>

          <p>
            <Link to="/webp-to-jpg" className="text-primary hover:underline">
              Convert WebP to JPG with our free tool →
            </Link>
          </p>

          <h3 id="heic-format" className="text-xl font-semibold mt-6 mb-3">HEIC: Apple's Efficient Format</h3>

          <p>
            HEIC (High Efficiency Image Container) is the default photo format on iPhones since iOS 11 
            (2017). It uses advanced compression to store photos at roughly half the size of equivalent 
            JPGs while maintaining the same quality. Apple chose HEIC to help users store more photos 
            on their devices.
          </p>

          <p><strong>Why HEIC is great:</strong></p>
          <ul className="list-disc pl-6 space-y-2 my-4">
            <li><strong>Storage efficiency:</strong> Double the photos in the same storage space.</li>
            <li><strong>Quality preservation:</strong> Better quality than JPG at the same file size.</li>
            <li><strong>Advanced features:</strong> Supports Live Photos, burst shots, and depth maps.</li>
          </ul>

          <p><strong>The compatibility problem:</strong></p>
          <p>
            Here's where it gets frustrating. HEIC is fantastic technology with terrible compatibility. 
            Windows requires a special extension to open HEIC files. Many websites don't accept HEIC 
            uploads. Android phones can't display them. Older software ignores them entirely.
          </p>

          <p>
            This is the most common conversion request I see: people need to share iPhone photos with 
            non-Apple users or upload them to websites that only accept JPG.
          </p>

          <p><strong>My recommendation:</strong></p>
          <p>
            Keep your iPhone set to capture HEIC (it saves storage space). When you need to share 
            photos with non-Apple users, convert them to JPG. Your iPhone can do this automatically 
            in Settings → Photos → "Transfer to Mac or PC" → Automatic.
          </p>

          <p>
            <Link to="/heic-to-jpg" className="text-primary hover:underline">
              Convert HEIC to JPG with our free tool →
            </Link>
          </p>
        </section>

        <Separator className="my-8" />

        <section id="pdf-formats">
          <h2 className="text-2xl font-semibold mt-8 mb-4">Part 2: PDF Fundamentals</h2>
          
          <p>
            PDF (Portable Document Format) isn't really an image format—it's a document container. 
            PDFs can contain text, images, vector graphics, forms, annotations, and even multimedia. 
            This flexibility makes PDF essential for documents that need to look identical on every 
            device and printer.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">What Makes PDFs Large?</h3>

          <p>
            A simple text-only PDF might be 50KB. A PDF with a few high-resolution photos can easily 
            be 50MB. The difference comes from:
          </p>

          <ul className="list-disc pl-6 space-y-2 my-4">
            <li><strong>Embedded images:</strong> The biggest factor. High-resolution photos add megabytes each.</li>
            <li><strong>Embedded fonts:</strong> Custom fonts are included to ensure consistent appearance.</li>
            <li><strong>Vector graphics:</strong> Complex diagrams and illustrations add to file size.</li>
            <li><strong>Metadata and annotations:</strong> Comments, form fields, and editing history.</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-3">PDF Compression Techniques</h3>

          <p>When I built the PDF compression tool for Convertify, I learned there are several approaches:</p>

          <p>
            <strong>Image compression:</strong> Recompressing embedded images at lower quality. This provides 
            the biggest file size reduction for image-heavy PDFs. A 20MB PDF can often be reduced to 2-3MB 
            with minimal visible quality loss.
          </p>

          <p>
            <strong>Downsampling:</strong> Reducing image resolution. A 4000x3000 pixel photo doesn't need 
            that resolution when displayed at 4 inches wide in a PDF. Reducing to appropriate resolution 
            saves significant space.
          </p>

          <p>
            <strong>Font subsetting:</strong> Including only the characters actually used in the document, 
            not the entire font file.
          </p>

          <p>
            <strong>Object stream compression:</strong> Using efficient algorithms to compress the PDF's 
            internal structure.
          </p>

          <p>
            <Link to="/compress-pdf" className="text-primary hover:underline">
              Compress PDF files with our free tool →
            </Link>
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">Common PDF Operations</h3>

          <p><strong>Merging PDFs:</strong></p>
          <p>
            Combining multiple PDFs into one document is straightforward conceptually but has nuances. 
            Page sizes might differ. Bookmarks and links may need adjustment. Form fields could conflict. 
            Modern tools handle these issues automatically.
          </p>
          <p>
            <Link to="/merge-pdf" className="text-primary hover:underline">
              Merge PDF files with our free tool →
            </Link>
          </p>

          <p><strong>Splitting PDFs:</strong></p>
          <p>
            Extracting specific pages is useful when you only need part of a large document. Rather than 
            sending a 100-page report, extract the 5 pages that are relevant.
          </p>
          <p>
            <Link to="/split-pdf" className="text-primary hover:underline">
              Split PDF files with our free tool →
            </Link>
          </p>

          <p><strong>Creating PDFs from Images:</strong></p>
          <p>
            Converting images to PDF is common for creating documents from scanned pages or combining 
            photos into a single shareable file. The key is controlling image compression to balance 
            quality against file size.
          </p>
          <p>
            <Link to="/image-to-pdf" className="text-primary hover:underline">
              Convert images to PDF with our free tool →
            </Link>
          </p>
        </section>

        <Separator className="my-8" />

        <section id="choosing-formats">
          <h2 className="text-2xl font-semibold mt-8 mb-4">Part 3: Choosing the Right Format</h2>
          
          <p>
            After years of building conversion tools and helping users, I've developed a simple 
            decision framework. Ask yourself these questions in order:
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">Question 1: Do you need transparency?</h3>
          <p>
            If yes → Use PNG (or WebP if web-only)<br/>
            If no → Continue to next question
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">Question 2: Is this a photograph or graphic?</h3>
          <p>
            Photograph → JPG (or WebP for web)<br/>
            Graphic/screenshot → PNG (or WebP for web)<br/>
            Mixed content → Consider PDF
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">Question 3: Where will this be used?</h3>
          <p>
            Website → Consider WebP for smaller files<br/>
            Email/sharing → JPG for photos, PNG for graphics<br/>
            Printing → JPG or PNG at high quality<br/>
            Archival → PNG for lossless preservation
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">Question 4: What's your file size budget?</h3>
          <p>
            Tight limits (email) → JPG with moderate compression<br/>
            Moderate limits (web) → WebP or optimized JPG/PNG<br/>
            No limits (storage) → PNG for maximum quality
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">Quick Reference Table</h3>

          <div className="overflow-x-auto my-6">
            <table className="min-w-full border border-border">
              <thead className="bg-muted/30">
                <tr>
                  <th className="border border-border p-3 text-left">Use Case</th>
                  <th className="border border-border p-3 text-left">Best Format</th>
                  <th className="border border-border p-3 text-left">Why</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-3">Website photos</td>
                  <td className="border border-border p-3">WebP or JPG</td>
                  <td className="border border-border p-3">Small files, fast loading</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">Logo on website</td>
                  <td className="border border-border p-3">PNG or SVG</td>
                  <td className="border border-border p-3">Sharp edges, transparency</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">Email photos</td>
                  <td className="border border-border p-3">JPG</td>
                  <td className="border border-border p-3">Universal compatibility</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">Screenshots</td>
                  <td className="border border-border p-3">PNG</td>
                  <td className="border border-border p-3">Crisp text and UI</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">iPhone photo sharing</td>
                  <td className="border border-border p-3">Convert HEIC to JPG</td>
                  <td className="border border-border p-3">Compatibility</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">Multi-page document</td>
                  <td className="border border-border p-3">PDF</td>
                  <td className="border border-border p-3">Single file, consistent layout</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">Print photos</td>
                  <td className="border border-border p-3">JPG at 85-95%</td>
                  <td className="border border-border p-3">Quality + reasonable size</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">Digital art preservation</td>
                  <td className="border border-border p-3">PNG</td>
                  <td className="border border-border p-3">Lossless quality</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <Separator className="my-8" />

        <section id="conversion-guide">
          <h2 className="text-2xl font-semibold mt-8 mb-4">Part 4: Practical Conversion Guide</h2>
          
          <p>
            Based on the support questions I receive most frequently, here are practical guides 
            for common conversion scenarios:
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">Scenario: iPhone Photos Won't Open on Windows</h3>
          <p>
            <strong>Problem:</strong> You took photos on your iPhone, transferred them to a Windows PC, 
            and they won't open. The files have .HEIC extension.
          </p>
          <p>
            <strong>Solution:</strong> Convert HEIC to JPG. Use a browser-based converter for quick, 
            one-off conversions. For future transfers, set your iPhone to "Automatic" in Settings → 
            Photos → Transfer to Mac or PC.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">Scenario: PDF Too Large for Email</h3>
          <p>
            <strong>Problem:</strong> You need to email a PDF but it exceeds the attachment size limit.
          </p>
          <p>
            <strong>Solution:</strong> Compress the PDF. Most PDFs with photos can be reduced by 50-80% 
            with minimal quality loss. If it's still too large, consider splitting into multiple PDFs 
            or using a file-sharing service.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">Scenario: Website Doesn't Accept Your Image Format</h3>
          <p>
            <strong>Problem:</strong> You're trying to upload an image but the site only accepts JPG or PNG.
          </p>
          <p>
            <strong>Solution:</strong> Convert to the accepted format. For photos, use JPG. For graphics 
            with transparency or text, use PNG.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">Scenario: Need to Combine Multiple PDFs</h3>
          <p>
            <strong>Problem:</strong> You have several PDF documents that need to become one file.
          </p>
          <p>
            <strong>Solution:</strong> Use a PDF merge tool. Browser-based tools are fastest and keep 
            your documents private. Just upload the files in the order you want them combined.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">Scenario: Image Has Blurry Text After Conversion</h3>
          <p>
            <strong>Problem:</strong> You converted a screenshot to JPG and now the text looks fuzzy.
          </p>
          <p>
            <strong>Solution:</strong> Use PNG instead of JPG for images with text. JPG compression 
            creates artifacts around sharp edges. If you must use JPG, use 90%+ quality.
          </p>
        </section>

        <Separator className="my-8" />

        <section id="common-mistakes">
          <h2 className="text-2xl font-semibold mt-8 mb-4">Part 5: Common Mistakes to Avoid</h2>
          
          <p>
            After helping thousands of users, I've seen these mistakes repeatedly:
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">Mistake 1: Expecting Conversion to Improve Quality</h3>
          <p>
            Converting a low-quality JPG to PNG won't make it look better. Quality lost during 
            compression is gone permanently. Conversion preserves quality; it doesn't enhance it.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">Mistake 2: Using JPG for Screenshots</h3>
          <p>
            Screenshots contain sharp edges, text, and solid colors—exactly what JPG handles 
            poorly. The result is fuzzy text and visible compression artifacts. Always use PNG 
            for screenshots.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">Mistake 3: Compressing Already-Compressed Files</h3>
          <p>
            Running a JPG through compression again often makes it larger (due to recompression 
            artifacts) while reducing quality. Compress from the original source when possible.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">Mistake 4: Using PNG for Large Photos</h3>
          <p>
            A PNG of a photograph can be 10-20MB while the equivalent JPG might be 1-2MB with 
            no visible quality difference. Use JPG for photos unless you specifically need 
            lossless preservation.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">Mistake 5: Not Testing Results</h3>
          <p>
            Always open converted files before sending or uploading them. Verify that quality 
            is acceptable, all content is intact, and the file works as expected.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">Mistake 6: Deleting Originals Too Soon</h3>
          <p>
            Keep original files until you're certain the converted versions meet your needs. 
            Conversion is often one-way—you can't recover the original quality later.
          </p>
        </section>

        <Separator className="my-8" />

        <section id="conclusion">
          <h2 className="text-2xl font-semibold mt-8 mb-4">Conclusion</h2>
          
          <p>
            File formats might seem like boring technical details, but understanding them saves 
            time, storage space, and frustration. The key takeaways:
          </p>

          <ul className="list-disc pl-6 space-y-2 my-4">
            <li>JPG for photos, PNG for graphics and screenshots</li>
            <li>WebP offers better compression for web use</li>
            <li>HEIC is great for iPhone storage but needs conversion for sharing</li>
            <li>PDF is ideal for multi-page documents and professional distribution</li>
            <li>Conversion preserves quality—it doesn't improve it</li>
            <li>Always keep original files until you verify conversions</li>
          </ul>

          <p>
            I built Convertify Studio to make these conversions simple, fast, and private. Every 
            tool processes files in your browser, so your documents never leave your device. No 
            uploads, no accounts, no privacy concerns.
          </p>

          <p>
            If you have questions about specific conversion scenarios, feel free to reach out 
            through our <Link to="/contact" className="text-primary hover:underline">contact page</Link>. 
            I read every message and use your feedback to improve these tools.
          </p>
        </section>

        <AuthorBox showFullBio />

        <Separator className="my-12" />

        <div className="bg-muted/30 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Explore Our Free Tools</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium mb-2">Image Conversion</h4>
              <ul className="space-y-1">
                <li><Link to="/jpg-to-png" className="text-primary hover:underline">JPG to PNG</Link></li>
                <li><Link to="/png-to-jpg" className="text-primary hover:underline">PNG to JPG</Link></li>
                <li><Link to="/webp-to-jpg" className="text-primary hover:underline">WebP to JPG</Link></li>
                <li><Link to="/heic-to-jpg" className="text-primary hover:underline">HEIC to JPG</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">PDF Tools</h4>
              <ul className="space-y-1">
                <li><Link to="/image-to-pdf" className="text-primary hover:underline">Image to PDF</Link></li>
                <li><Link to="/merge-pdf" className="text-primary hover:underline">Merge PDF</Link></li>
                <li><Link to="/split-pdf" className="text-primary hover:underline">Split PDF</Link></li>
                <li><Link to="/compress-pdf" className="text-primary hover:underline">Compress PDF</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-muted/30 p-6 rounded-lg mt-6">
          <h3 className="text-xl font-semibold mb-4">Related Articles</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/blog/heic-conversion-guide" className="text-primary hover:underline">
                Why iPhones Use HEIC and How to Convert HEIC to JPG
              </Link>
            </li>
            <li>
              <Link to="/blog/pdf-compression-explained" className="text-primary hover:underline">
                What Makes PDF Files Large and How Compression Works
              </Link>
            </li>
            <li>
              <Link to="/blog/jpg-to-png-without-losing-quality" className="text-primary hover:underline">
                How to Convert JPG to PNG Without Losing Quality
              </Link>
            </li>
          </ul>
        </div>
      </article>
    </Layout>
  );
}
