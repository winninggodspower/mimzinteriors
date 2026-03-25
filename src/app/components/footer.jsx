import Link from "next/link";
import { Instagram, Linkedin, Facebook, Youtube } from "lucide-react";

const socialLinks = [
  { name: "Instagram", href: "#", icon: Instagram },
  { name: "LinkedIn", href: "#", icon: Linkedin },
  { name: "Facebook", href: "#", icon: Facebook },
  { name: "YouTube", href: "#", icon: Youtube },
];

export default function Footer() {
  return (
    <footer className="w-full border-t border-[#1f1f1f] ">
      <div className="mx-auto max-w-[1600px] px-6 pb-6 pt-10 sm:px-12">
        <div className="flex items-center justify-center gap-3 ">
          {socialLinks.map((social) => {
            const Icon = social.icon;

            return (
              <Link
                key={social.name}
                href={social.href}
                aria-label={social.name}
                className="transition-opacity hover:opacity-70"
              >
                <Icon size={14} strokeWidth={1.8} />
              </Link>
            );
          })}
        </div>

        <p className="mt-6 text-center text-[18px] ">
          &copy; 2025 Mimzinteriors. All Rights Reserved. Privacy Policy
        </p>
      </div>

      <div
        className="h-12 w-full bg-repeat-x"
        style={{
          backgroundImage: "url('/patterns.png')",
          backgroundPosition: "top center",
          backgroundSize: "auto 200%",
        }}
      />
    </footer>
  );
}