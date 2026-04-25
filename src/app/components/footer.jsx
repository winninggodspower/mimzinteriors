import Link from "next/link";
import Image from "next/image";
import { Icon } from "@iconify/react";
import patterns from "@assets/images/patterns.svg";

const socialLinks = [
  { name: "Instagram", href: "https://www.instagram.com/mimz_interiors/", icon: "simple-icons:instagram", size: "text-[24px]" },
  { name: "LinkedIn", href: "https://www.linkedin.com/company/mimz-interior", icon: "teenyicons:linkedin-outline", size: "text-[24px]" },
  { name: "TikTok", href: "https://www.tiktok.com/@mimz.interiors", icon: "streamline-flex:tiktok-logo-remix", size: "text-[24px]" },
  { name: "YouTube", href: "https://www.youtube.com/@MimzInteriors", icon: "icomoon-free:youtube2", size: "text-[24px]" },
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
                target="_blank"
                className="flex items-center justify-center transition-all duration-300 hover:scale-125 hover:rotate-6"
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

      <div
        className="relative w-full overflow-hidden bg-white min-h-[clamp(28px,3vw,48px)] mt-5"
        aria-hidden="true"
      >
        <Image
          src={patterns}
          alt=""
          className="absolute w-full top-0 h-auto max-w-none "
          sizes="120vw"
        />
      </div>
    </footer>
  );
}
