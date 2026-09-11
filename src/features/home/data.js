export const heroCards = [
  {
    title: "Residential",
    icon: "healthicons:home-outline",
    description:
      "Residential spaces including apartments, duplexes, villas, shortlets, and private rooms.",
    mobileDescription: "Apartments, villas, shortlets.",
    tone: "light",
  },
  {
    title: "Commercial",
    icon: "emojione-monotone:japanese-post-office",
    description:
      "Commercial spaces for offices, co-working hubs, retail stores, and banking environments.",
    mobileDescription: "Corporate, retail, banking.",
    tone: "gold",
  },
];

export const accessoriesSection = {
  title: "Accessories",
  imageSrc: "/acessory-feature.png",
  imageAlt: "Featured accessories collage",
  href: "/projects/accessories",
  paragraphs: [
    "All accessories are carefully sourced and picked from our sister company, Mimz Homes. From statement pieces to the smallest finishing touches, everything is thoughtfully curated to ensure quality, style, and perfect cohesion.",
    "This allows us to maintain a consistent design language across every project, ensuring that nothing feels out of place.",
    "With a dedicated showroom and a global sourcing network, Mimz Homes offers access to both accessories and furniture from around the world. This means every piece is not just selected, but discovered, giving your space a distinctive, well-traveled, and elevated finish.",
  ],
};

export const testimonials = [
  {
    name: "Pradley Luv",
    quote:
      "MIMZ interiors is the absolute best, they literally transform a space to a complete beauty. And also they offer a lot of services including cleaning, so all you need to do is get your properties and move in 🚚😁STRESS FREE!!!!!!!! 💃🏿💃🏿💃🏿💃🏿💃🏿",
    rating: 5,
  },
  {
    name: "Adeshina Jude",
    quote:
      "Mimz Interiors has proven with amazing evidence to be the best Interior Design Company. Their job delivery is classic, with clear emphasis on detail and uniqueness. Positive Responsiveness, Quality, Value",
    rating: 5,
  },
  {
    name: "Thelma Dike",
    quote: "One of the best interior designers I've ever met...their designs are excellent and beautiful. You can't help but fall in love 😊😊",
    rating: 5,
  },
  {
    name: "Pastor Miracle Bruno",
    quote: "Absolutely hardworking, excellent, great work ethics, and experienced.",
    rating: 5,
  },
  {
    name: "Moses Ogbleba",
    quote: "Creative company with agile design team. 👍",
    rating: 4,
  },
  {
    name: "Sample Modlen",
    quote: "Very nice place\nSell good and durable Interiors",
    rating: 5,
  },
  {
    name: "Jacqueline Ejenavbo",
    quote: "If simplicity is what you seek, Here You Go!!! 👌👌",
    rating: 5,
  },
  {
    name: "Ogbonda Mirabelle",
    quote: "An absolute work of art and pleasure",
    rating: 5,
  },
  {
    name: "Edidiong",
    quote: "Beautiful experience and",
    rating: 3,
  },
  {
    name: "John Lekwa",
    quote: "Awesome place",
    rating: 5,
  },
  {
    name: "Sophia Enoch",
    quote: "Never seen an interior designing company that is this good.",
    rating: 5,
  },
];

export const googleReviewsUrl = "https://www.google.com/search?q=MIMZ+INTERIORS#lrd=0x103bf5eaa0a35125:0xd6f1719e9f022fa6,3";

export const reviewWallItems = [
  // Row 1: Featured Story (Spans 2 columns on desktop) + Dark Google Bento Tile
  {
    id: "review-handover",
    name: "Adeshina Jude",
    handle: "@adeshinajude",
    role: "Local Guide · 15 reviews",
    rating: 5,
    featured: true,
    span: "md:col-span-2 lg:col-span-2",
    tag: "Verified Client Story",
    quote:
      "Mimz Interiors has proven with amazing evidence to be the best Interior Design Company. Their job delivery is classic, with clear emphasis on detail and uniqueness.",
    highlights: ["best Interior Design Company", "clear emphasis on detail"],
    avatarColor: "bg-[#2563EB]",
    date: "2 weeks ago",
    link: googleReviewsUrl,
  },
  {
    id: "bento-metric-tile",
    isBentoTile: true,
    title: "5.0 Rating",
    subtitle: "Google Business Reviews",
    description: "Rated 5.0 stars by luxury homeowners, developers, and corporate clients across Nigeria.",
    link: googleReviewsUrl,
  },

  // Row 2: 3 Single-Column Review Cards
  {
    id: "review-pradley",
    name: "Pradley Luv",
    handle: "@pradleyluv",
    role: "Verified Client · 8 reviews",
    rating: 5,
    quote:
      "MIMZ interiors is the absolute best, they literally transform a space to a complete beauty. All you need to do is get your properties and move in, stress free!",
    highlights: ["transform a space to a complete beauty", "stress free!"],
    avatarColor: "bg-[#B8860B]",
    date: "1 month ago",
    link: googleReviewsUrl,
  },
  {
    id: "review-thelma",
    name: "Thelma Dike",
    handle: "@thelmadike",
    role: "Verified Client",
    rating: 5,
    quote:
      "One of the best interior designers I've ever met... their designs are excellent and beautiful. You can't help but fall in love with the finished space.",
    highlights: ["best interior designers", "excellent and beautiful"],
    avatarColor: "bg-[#7C3AED]",
    date: "3 weeks ago",
    link: googleReviewsUrl,
  },
  {
    id: "review-pastor",
    name: "Pastor Miracle Bruno",
    handle: "@pastorbruno",
    role: "Local Guide · 24 reviews",
    rating: 5,
    quote:
      "Absolutely hardworking, excellent, great work ethics, and experienced. They delivered right on schedule without compromising on quality.",
    highlights: ["great work ethics", "delivered right on schedule"],
    avatarColor: "bg-[#DC2626]",
    date: "2 months ago",
    link: googleReviewsUrl,
  },

  // Row 3: 1 Single-Column Card + 1 Featured Card (Spans 2 columns on desktop)
  {
    id: "review-sophia",
    name: "Sophia Enoch",
    handle: "@sophiaenoch",
    role: "Google Reviewer",
    rating: 5,
    quote:
      "Never seen an interior designing company that is this good. The coordination from moodboards to final installation is a cheat code for homeowners.",
    highlights: ["company that is this good", "cheat code for homeowners"],
    avatarColor: "bg-[#059669]",
    date: "1 month ago",
    link: googleReviewsUrl,
  },
  {
    id: "review-reveal",
    name: "Ogbonda Mirabelle",
    handle: "@mirabelle_og",
    role: "Verified Client",
    rating: 5,
    featured: true,
    span: "md:col-span-1 lg:col-span-2",
    tag: "Residential Highlight",
    quote:
      "An absolute work of art and pleasure. Walking into my apartment after Mimz styled it feels like stepping into a 5-star boutique hotel every single day.",
    highlights: ["absolute work of art", "5-star boutique hotel"],
    avatarColor: "bg-[#D97706]",
    date: "3 weeks ago",
    link: googleReviewsUrl,
  },
];



