"use client";

import Image from "next/image";
import { motion } from "motion/react";
import mapImage from "@assets/images/contact/map.png";
import {
  MOTION_STAGGER,
  MOTION_VIEWPORT,
  fadeUpItem,
  sectionReveal,
} from "@features/lib/motion";

const locationIcon = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path
      d="M21.5 12H19.389M19.389 12C19.389 13.9598 18.611 15.8389 17.2252 17.2247C15.8394 18.6105 13.9598 19.389 12 19.389M19.389 12C19.389 10.0402 18.611 8.16013 17.2252 6.77433C15.8394 5.38853 13.9598 4.611 12 4.611M12 2.5V4.611M12 4.611C10.0403 4.611 8.16089 5.38848 6.77519 6.77419C5.38948 8.15989 4.611 10.0393 4.611 11.999C4.611 13.9587 5.38948 15.8381 6.77519 17.2238C8.16089 18.6095 10.0403 19.389 12 19.389M2.5 12H4.611M12 21.5V19.389"
      stroke="#C28831"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
    />
    <path
      d="M11.9993 16.2223C13.1191 16.2223 14.193 15.7775 14.9847 14.9857C15.7765 14.1939 16.2213 13.1201 16.2213 12.0003C16.2213 10.8806 15.7765 9.80669 14.9847 9.01492C14.193 8.22314 13.1191 7.77832 11.9993 7.77832C10.8796 7.77832 9.80572 8.22314 9.01394 9.01492C8.22216 9.80669 7.77734 10.8806 7.77734 12.0003C7.77734 13.1201 8.22216 14.1939 9.01394 14.9857C9.80572 15.7775 10.8796 16.2223 11.9993 16.2223Z"
      stroke="#C28831"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
    />
  </svg>
);

const callIcon = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path
      d="M12 4V3H21V4H12ZM12 7.385V6.385H21V7.385H12ZM12 10.769V9.769H21V10.769H12ZM17.93 21C16.2447 21 14.5167 20.578 12.746 19.734C10.9753 18.89 9.33033 17.705 7.811 16.179C6.29167 14.653 5.11 13.008 4.266 11.244C3.422 9.48 3 7.75533 3 6.07C3 5.76467 3.1 5.51033 3.3 5.307C3.5 5.10367 3.75 5.00133 4.05 5H6.523C6.795 5 7.03233 5.08567 7.235 5.257C7.437 5.42833 7.574 5.648 7.646 5.916L8.142 8.3C8.18867 8.58 8.18033 8.82433 8.117 9.033C8.05367 9.24167 7.94267 9.41267 7.784 9.546L5.591 11.592C6.001 12.3367 6.45433 13.0287 6.951 13.668C7.44767 14.3073 7.97767 14.913 8.541 15.485C9.121 16.065 9.746 16.605 10.416 17.105C11.0847 17.6043 11.819 18.0757 12.619 18.519L14.758 16.342C14.9207 16.1667 15.1037 16.051 15.307 15.995C15.5103 15.939 15.735 15.928 15.981 15.962L18.085 16.392C18.3563 16.4587 18.5767 16.5957 18.746 16.803C18.9153 17.0103 19 17.2477 19 17.515V19.95C19 20.25 18.898 20.5 18.694 20.7C18.49 20.9 18.2347 21 17.93 21ZM5.12 10.654L7.04 8.889C7.10333 8.83767 7.14467 8.767 7.164 8.677C7.184 8.587 7.18067 8.50367 7.154 8.427L6.71 6.307C6.68467 6.205 6.64 6.12833 6.576 6.077C6.512 6.02567 6.429 6 6.327 6H4.275C4.19833 6 4.13433 6.02567 4.083 6.077C4.03167 6.12833 4.006 6.19233 4.006 6.269C4.02533 6.95233 4.13233 7.66567 4.327 8.409C4.52167 9.15233 4.78533 9.90067 5.12 10.654ZM13.571 18.988C14.247 19.3227 14.967 19.5703 15.731 19.731C16.4963 19.891 17.163 19.9767 17.731 19.988C17.8077 19.988 17.8717 19.9623 17.923 19.911C17.9743 19.8597 18 19.796 18 19.72V17.712C18 17.61 17.9743 17.5267 17.923 17.462C17.8717 17.398 17.795 17.3533 17.693 17.328L15.843 16.949C15.7657 16.923 15.6983 16.9197 15.641 16.939C15.583 16.959 15.522 17.0007 15.458 17.064L13.571 18.988Z"
      fill="#C28831"
    />
  </svg>
);

const clockIcon = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M12 20.5C16.6944 20.5 20.5 16.6944 20.5 12C20.5 7.30558 16.6944 3.5 12 3.5C7.30558 3.5 3.5 7.30558 3.5 12C3.5 16.6944 7.30558 20.5 12 20.5Z" stroke="#C28831" />
    <path d="M16.5 12H12.25C12.1837 12 12.1201 11.9737 12.0732 11.9268C12.0263 11.8799 12 11.8163 12 11.75V8.5" stroke="#C28831" strokeLinecap="round" />
  </svg>
);

const mailIcon = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M7.5 6L14.25 10.5L21 6M3 12.75H10.5M4.5 15.75H12M6.75 18.75H21.75V5.25H6.75V9.75H1.5" stroke="#C28831" strokeLinejoin="round" />
  </svg>
);


const ContactInfo = [
  {
    icon: locationIcon,
    label: "ADDRESS",
    content: (
      <>
        <p>Block 52, plot 27A Bisola Durosinmi Etti Dr, Lekki</p>
        <p>Phase 1, Lekki 105102, Lagos</p>
      </>
    ),
  },
  {
    icon: callIcon,
    label: "GET IN TOUCH",
    content: (
      <>
        <p>
          <a href="tel:+2347084333763">Phone: 0708 433 7763</a>
        </p>
      </>
    ),
  },
  {
    icon: clockIcon,
    label: "Visiting Days",
    content: (
      <>
        <p>Mon-Fri : 8 AM - 5 PM</p>
        <p>By appointment only</p>
      </>
    ),
  },
  {
    icon: mailIcon,
    label: "BOOK AN APPOINTMENT",
    content: (
      <>
        <p>
          Email:{" "}
          <a href="mailto:inquiries@mimzinteriors.com">
            inquiries@mimzinteriors.com
          </a>
        </p>
      </>
    ),
  },
];

export default function Contact() {
  const sectionMotion = sectionReveal({ y: 24 });

  return (
    <main className="contact-main">
      {/* ── INFO GRID ───────────────────────────────────── */}
      <motion.section className="contact-info-section" {...sectionMotion}>
        <div className="contact-info-inner">
          <div className="contact-info-grid">
            {ContactInfo.map((item, i) => (
              <motion.div
                key={i}
                className="contact-info-card"
                variants={fadeUpItem({ delay: i * MOTION_STAGGER.tight })}
                initial="hidden"
                whileInView="visible"
                viewport={{ ...MOTION_VIEWPORT, amount: 0.25 }}
              >
                <span className="contact-info-icon">{item.icon}</span>
                <div className="contact-info-text">
                  <h3 className="contact-info-label">{item.label}</h3>
                  <div className="contact-info-content">{item.content}</div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="contact-map-wrap">
            <Image
              src={mapImage}
              alt="Mimz Interiors location in Lekki, Lagos"
              fill
              className="contact-map-image"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </div>
        </div>
      </motion.section>
    </main>
  );
}
