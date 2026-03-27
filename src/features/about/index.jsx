import Image from "next/image";
import roots from "@assets/images/roots.png";
import aboutgallerya from "@assets/images/aboutgallerya.png";
import aboutgalleryb from "@assets/images/aboutgalleryb.png";
import aboutgalleryc from "@assets/images/aboutgalleryc.png";
import visiona from "@assets/images/visiona.png";
import visionb from "@assets/images/visionb.png";
import visionc from "@assets/images/visionc.png";
import thefirm from "@assets/images/thefirm.png";
import teampic from "@assets/images/teampic.png";
import mimza from "@assets/images/mimza.png";
import mimzb from "@assets/images/mimzb.png";
import sawarda from "@assets/images/sawarda.png";
import sawardb from "@assets/images/sawardb.png";
import sawardc from "@assets/images/sawardc.png";

export const metadata = {
  title: "About — Mimz Interiors",
  description: "Award-winning interior design studio",
};

export default function AboutPage() {
  return (
    <main className="about-main">

      {/* ── ROOTS SECTION ───────────────────────────────── */}
      <section className="about-roots">
        <div className="about-roots-inner">
          <div className="about-roots-image">
            <div className="about-roots-img-wrap">
              <Image
                src={roots}
                alt="Mimz Ferunmise — Interior Designer"
                fill
                className="about-img"
              />
            </div>
          </div>

          <div className="about-roots-content">
            <h2 className="about-section-label">ROOTS.</h2>
            <div className="about-roots-body">
              <p>
                Mimza Ferunmise, is an award-winning Interior designer. Katilaa
                embraces both a national window to the founder and encompassing a
                multiple-award-winning interior design company. Mimza has established
                a reputation for excellence in the industry, she has garnered significant
                recognition, including a recent prestigious accolade from the African
                Property Awards for Interior Design. Known for his creative flair and
                commitment to inspiring the next generation, Mimza continues to redefine
                interior design and consistently sets new standards in creativity.
              </p>
              <p>
                From mastering the art of adapting the perfect vision to sophisticated
                and worthy, to earning the first building globally recognized Interior
                Designer, Mimza Ferunmise's journey reflects a rare sense of style,
                creativity, and dedication.
              </p>
              <p>
                In his early days as an undergraduate, Mimza Ferunmise, demonstrated
                exceptional ability in balancing academic excellence, fashion, and
                innovative design. His passion for creating beautiful, functional spaces
                instilling him to gain valuable insights into diverse cultures, art forms,
                and architectural styles around the world. This global exposure has proven
                pivotal, and he has become as an International Interior Designer. Over the
                passing years, his designs have consistently stood out for their innovation
                and sophistication.
              </p>
              <p>
                Mimza's philosophy and commitment to his craft can be summed up in three
                words: doing work that resonates. This unwavering dedication to creating
                timeless, meaningful spaces has earned him prestigious local and
                international acclaim from across the globe.
              </p>
              <p>
                Having successfully completed over 200 projects and secured the trust of
                more than 40,000 followers across Nigeria and globally, Mimza has built a
                reputation for excellence and unwavering client satisfaction.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── QUOTE SECTION ───────────────────────────────── */}
      <section className="about-quote-section">
        <div className="about-quote-inner">
          <blockquote className="about-quote">
            <span className="about-quote-mark about-quote-open">"</span>
            Seeing the genuine satisfaction on my clients' faces after every
            project is my greatest source of motivation.
            <span className="about-quote-mark about-quote-close">"</span>
          </blockquote>
        </div>
      </section>

      {/* ── GALLERY ROW ─────────────────────────────────── */}
      {/* will make this a carousel later, for now just a grid of images */}
      <section className="about-gallery-row">
        <div className="about-gallery-grid">
          <div className="about-gallery-item">
            <Image src={aboutgallerya} alt="Interior project" fill className="about-img" />
          </div>
          <div className="about-gallery-item">
            <Image src={aboutgalleryb} alt="Interior project" fill className="about-img" />
          </div>
          <div className="about-gallery-item">
            <Image src={aboutgalleryc} alt="Interior project" fill className="about-img" />
          </div>
          <div className="about-gallery-item">
            <Image src={aboutgallerya} alt="Interior project" fill className="about-img" />
          </div>
        </div>
      </section>

      {/* ── VISION SECTION ──────────────────────────────── */}
      <section className="about-vision">
        <div className="about-vision-inner">
          <div className="about-vision-card">
            <div className="about-vision-label">
              <span className="about-vision-dot" />
              VISION
            </div>
            <p className="about-vision-text">
              To create and deliver exceptional work for impacting and intentional
              crafting through our continuous efforts to innovation and excellence.
            </p>
            <span className="about-vision-leaf">🌿</span>
          </div>

          <div className="about-vision-card">
            <div className="about-vision-label">
              <span className="about-vision-dot" />
              VISION
            </div>
            <p className="about-vision-text">
              To design and create spaces that genuinely resemble style, in the
              manner of a home, or the institutional architecture of a workplace.
            </p>
            <span className="about-vision-leaf">🌿</span>
          </div>
        </div>
      </section>

      {/* ── VISION GALLERY ──────────────────────────────── */}
      {/* convert to a carousel later */}
      <section className="about-vision-gallery">
        <div className="about-vision-gallery-grid">
          <div className="about-vision-gallery-item">
            <Image src={visiona} alt="Design vision" fill className="about-img" />
          </div>
          <div className="about-vision-gallery-item">
            <Image src={visionb} alt="Design vision" fill className="about-img" />
          </div>
          <div className="about-vision-gallery-item">
            <Image src={visionc} alt="Design vision" fill className="about-img" />
          </div>
        </div>
      </section>

      {/* ── THE FIRM SECTION ────────────────────────────── */}
      <section className="about-firm">
        <div className="about-firm-inner">
          <div className="about-firm-content">
            <h2 className="about-section-label">THE FIRM</h2>
            <div className="about-firm-body">
              <p>
                Mimza Interiors was founded in 2019 with a desire to provide
                comprehensive interior solutions in its design, fabrication, and
                sophisticated processes. The studio was established with the core
                mission of creating unique design of both formal and offices, creating
                spaces that function and reflect the aspirations of our clients.
              </p>
              <p>
                At Mimza Interiors, we specialise in delivering exceptional,
                contemporary, and customised furniture for our objective areas across
                sectors, including corporate offices, restaurants, retail spaces, shops,
                health, villas, and modern homes. Our comprehensive suite of services
                ensures that clients have access to a wide range of inspiring designs,
                high-quality furnishings, innovative services, and welcoming environments
                from rest of the modern with competitive prices.
              </p>
              <p>
                As one of the best sources offering a complete Design & Build service,
                we also offer interior project solutions of furniture, building solutions,
                fabricating, crafting and ensuring customer satisfaction. Our commitment
                to excellence encompasses not only great technical achievement but also
                deep relationship-based relationships with strong presence of the latest
                trends in design and furnishings.
              </p>
              <p>
                In December 2023, we brought Mimza Partners on board, extending our
                design business even more by granting domestic firms our clients who
                wanted to purchase the furniture, fittings, and accessories that fit
                their lifestyle. With Mimza Partners, we provide a convenient way for
                clients to access these products from interior engaging in the full
                design service.
              </p>
              <p>
                Our intention is to deliver bespoke design ideas that meet their need
                and exceed our client's expectations through collaborative efforts and
                exceptional service. We pride ourselves on fostering fresh insight to
                each and every client across various industries and complex areas. Each
                of our business is built on respect, dedication, attention to detail,
                quality, focused solutions. They inform us, and we're happy to recommend
                to our clients.
              </p>
            </div>
          </div>

          <div className="about-firm-image">
            <div className="about-firm-img-wrap">
              <Image
                src={thefirm}
                alt="Mimz Interiors showroom"
                fill
                className="about-img"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── TEAM PHOTO ──────────────────────────────────── */}
      <section className="about-team">
        <div className="about-team-img-wrap">
          <Image
            src={teampic}
            alt="Mimz Interiors team"
            fill
            className="about-img about-team-img"
          />
          <div className="about-team-overlay" />
        </div>
      </section>

      {/* ── AWARDS SECTION ──────────────────────────────── */}
      <section className="about-awards">
        <div className="about-awards-inner">
          <div className="about-awards-badges">
            <div className="about-award-badge">
              <Image
                src={mimza}
                alt="African Property Awards — Best Interior Design"
                width={140}
                height={180}
                className="about-award-badge-img"
              />
            </div>
            <div className="about-award-badge">
              <Image
                src={mimzb}
                alt="African Property Awards — Interior Design"
                width={140}
                height={180}
                className="about-award-badge-img"
              />
            </div>
            <div className="about-award-badge-small">
              <Image
                src={sawarda}
                alt="Laufen Award"
                width={80}
                height={80}
                className="about-award-badge-img"
              />
            </div>
            <div className="about-award-badge-small">
              <Image
                src={sawardb}
                alt="Roca Award"
                width={80}
                height={80}
                className="about-award-badge-img"
              />
            </div>
            <div className="about-award-badge-small">
              <Image
                src={sawardc}
                alt="Roca Award"
                width={80}
                height={80}
                className="about-award-badge-img"
              />
            </div>
          </div>

          <div className="about-awards-content">
            <h2 className="about-section-label">AWARDS</h2>
            <p className="about-awards-intro">
              In the last four times, Mimza has proved to be a worthy award winning
              interior design studio. Standing above all from these three awards listed
              is just one step.
            </p>
            <p className="about-awards-body">
              Business awards like the recent African property awards, Lusaka Georgia
              Studio, Nairobi-Africa Luanda etc. are not enough. Mimza has been
              incredibly marketing these awards and individuals attributes that are only
              the bright spot and daring working inspiration. Great solutions not only
              have transformed their role also provide information that quality including
              incomparable feature are reaching their empire.
            </p>
            <p className="about-awards-body">
              It's a great distinction but an in-internal delicacy for excellence. Every
              success is a reflection of the collective effort of the entire team,
              including the fact the work is making a difference.
            </p>
            <blockquote className="about-awards-quote">
              "When it comes to interiors, uniqueness is the ultimate luxury."
            </blockquote>
          </div>
        </div>
      </section>
    </main>
  );
}