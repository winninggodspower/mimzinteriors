import Link from "next/link";
import Image from "next/image";
import { Icon } from "@iconify/react";
import patterns from "@assets/images/patterns.svg";

const socialLinks = [
  { name: "Instagram", href: "#", icon: "simple-icons:instagram", size: "text-[24px]" },
  { name: "LinkedIn", href: "#", icon: "teenyicons:linkedin-outline", size: "text-[24px]" },
  { name: "TikTok", href: "#", icon: "streamline-flex:tiktok-logo-remix", size: "text-[24px]" },
  { name: "YouTube", href: "#", icon: "icomoon-free:youtube2", size: "text-[24px]" },
];

export default function Footer() {
  return (
    <footer className="w-full border-t border-[#1f1f1f] ">
      <div className="mx-auto max-w-400 px-6 pb-6 pt-10 sm:px-12">
        <div className="flex items-center justify-center gap-2 ">
          {socialLinks.map((social) => {
            return (
              <Link
                key={social.name}
                href={social.href}
                aria-label={social.name}
                className="flex items-center justify-center transition-opacity hover:opacity-75"
              >
                <Icon icon={social.icon} className={social.size} aria-hidden="true" />
              </Link>
            );
          })}
        </div>

        <p className="mt-6 text-center text-[18px] ">
          &copy; 2025 Mimzinteriors. All Rights Reserved. Privacy Policy
        </p>
      </div>

      <div className="footer-pattern" aria-hidden="true">
        <Image src={patterns} alt="" fill className="footer-pattern-img" sizes="100vw" />
      </div>
    </footer>
  );
}