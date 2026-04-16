import callIcon from "@assets/images/icons/call.svg";
import clockIcon from "@assets/images/icons/clock.svg";
import locationIcon from "@assets/images/icons/location.svg";
import mailIcon from "@assets/images/icons/mail.svg";

export const contactInfo = [
  {
    icon: locationIcon,
    label: "ADDRESS",
    lines: [
      { text: "Block 52, plot 27A Bisola Durosinmi Etti Dr, Lekki" },
      { text: "Phase 1, Lekki 105102, Lagos" },
    ],
  },
  {
    icon: callIcon,
    label: "GET IN TOUCH",
    lines: [
      {
        prefix: "Phone: ",
        text: "0708 433 7763",
        href: "tel:+2347084333763",
      },
    ],
  },
  {
    icon: clockIcon,
    label: "Visiting Days",
    lines: [
      { text: "Mon-Fri : 8 AM - 5 PM" },
      { text: "By appointment only" },
    ],
  },
  {
    icon: mailIcon,
    label: "BOOK AN APPOINTMENT",
    lines: [
      {
        prefix: "Email: ",
        text: "inquiries@mimzinteriors.com",
        href: "mailto:inquiries@mimzinteriors.com",
      },
    ],
  },
];
