import icona from "@assets/images/service/icona.svg";
import iconb from "@assets/images/service/iconb.svg";
import iconc from "@assets/images/service/iconc.svg";
import icond from "@assets/images/service/icond.svg";
import icone from "@assets/images/service/icone.svg";
import iconf from "@assets/images/service/iconf.svg";

export const services = [
  "Consultation Services",
  "Space Planning and Layout Design",
  "Concept Development",
  "3D Renderings and Visualizations",
  "Furniture Design",
  "Finishing and furnishing",
  "Renovation and Remodeling",
  "Commercial Interior Design",
  "Residential Interior Design",
  "Home Staging",
  "Service Apartments",
  "Interior Design Accessories",
];

export const serviceShowcase = {
  title: "More Services We Offer",
  intro:
    "At Mimz Interiors, we don’t just design spaces, we curate experiences. Every project is approached with intention, blending functionality, aesthetics, and your unique lifestyle into a seamless, refined result. From concept to completion, we handle every detail with precision and creativity.",
  image: {
    src: '/more seriveces-side.png',
    alt: "Interior project under construction",
  },
  items: [
    {
      title: "Consultation Services",
      description:
        "Every great space begins with a conversation. Our consultation sessions are designed to understand your vision, needs, and preferences, while offering expert guidance to set the direction for your project.",
    },
    {
      title: "Space Planning and Layout Design",
      description:
        "We optimize your space for flow, comfort, and efficiency, ensuring every square meter serves a purpose while maintaining elegance and balance.",
    },
    {
      title: "Concept Development",
      description:
        "We translate your ideas into a clear design direction, creating a cohesive concept that reflects your personality, brand, or lifestyle.",
    },
    {
      title: "3D Renderings and Visualizations",
      description:
        "See your space before it comes to life. Our detailed 3D visuals help you fully experience the design, ensuring clarity and confidence before execution begins.",
    },
    {
      title: "Furniture Design, Finishing and Furnishing",
      description:
        "We create bespoke furniture pieces tailored to your space, combining craftsmanship, comfort, and style to achieve a truly unique interior. From materials and color palettes to soft furnishings and décor, we carefully select and install every element that completes your space beautifully.",
    },
    {
      title: "Renovation and Remodeling",
      description:
        "Transform your existing space into something exceptional. We handle upgrades, structural improvements, and full redesigns with a seamless approach.",
    },
  ],
};

export const processSteps = [
  {
    num: "1",
    icon: iconf,
    title: "BOOK APPOINTMENT",
    desc: "When clients book appointment. Our design process begins when a client reaches out.",
  },
  {
    num: "2",
    icon: icone,
    title: "SITE INSPECTION",
    desc: "Inspection to visit the space and discuss their vision and preferences. During this meeting, we take the time to understand the client's lifestyle, personality, and specific needs.",
  },
  {
    num: "3",
    icon: iconc,
    title: "QUOTATION",
    desc: "Alongside this, we prepare a detailed quotation. Once the client approves the design and makes a payment.",
  },
  {
    num: "4",
    icon: iconb,
    title: "DIGITAL VISUALIZATION",
    desc: "Next, we create a mood board and 3D renderings to give the client a clear visual of what the final space will look like.",
  },
  {
    num: "5",
    icon: icond,
    title: "MANUFACTURING / PRODUCTION",
    desc: "We move into bringing in, producing and manufacturing decor items and Materials.",
  },
  {
    num: "6",
    icon: icona,
    title: "IMPLEMENTATION / ON-SITE SUPERVISION",
    desc: "We move into the implementation phase, bringing the vision to life with precision and attention to detail.",
  },
];
