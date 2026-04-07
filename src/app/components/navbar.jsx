"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Navbar as FlowbiteNavbar, NavbarBrand } from "flowbite-react";
import seperator from "@assets/images/seperator.png";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const unlockPageScroll = () => {
    document.documentElement.style.overflow = "";
    document.body.style.overflow = "";
  };

  useEffect(() => {
    if (!isMenuOpen) {
      unlockPageScroll();
      return;
    }

    document.documentElement.style.overflow = "hidden";

    return () => {
      unlockPageScroll();
    };
  }, [isMenuOpen]);

  useEffect(() => {
    setIsMenuOpen(false);
    unlockPageScroll();
  }, [pathname]);

  return (
    <div className="sticky top-0 z-40 w-full bg-mimz-cream text-[#2a2a2a]">
      <FlowbiteNavbar
        fluid
        className="!rounded-none !bg-mimz-cream !px-8 !py-4 sm:!px-12"
      >
        <NavbarBrand as={Link} href="/" className="leading-none">
          <Image
            src="/INTERIORS-logo.png"
            alt="MIMZ Interiors"
            width={138}
            height={44}
            priority
            className="h-auto w-[138px]"
            style={{ height: "auto" }}
          />
        </NavbarBrand>

        <button
          type="button"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isMenuOpen}
          className="group relative flex h-14 w-12 flex-col items-center justify-start pt-3 text-[#2a2a2a] "
        >
          <span
            className={`absolute top-4 block h-[2px] w-8 bg-current transition-all duration-300 ${
              isMenuOpen ? "rotate-45" : "-translate-y-2"
            }`}
          />
          <span
            className={`absolute top-4 block h-[2px] w-8 bg-current transition-all duration-300 ${
              isMenuOpen ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`absolute top-4 block h-[2px] w-8 bg-current transition-all duration-300 ${
              isMenuOpen ? "-rotate-45" : "translate-y-2"
            }`}
          />
          
           <span
            className={`mt-6 text-[12px] tracking-[0.18em] transition-all duration-300 ${
              isMenuOpen ? "opacity-0" : "translate-y-0 opacity-100"
            }`}
          >
            MENU
          </span>
        </button>
      </FlowbiteNavbar>

      {isMenuOpen ? (
      <div
        className="fixed inset-x-0 bottom-0 top-[86px] bg-mimz-cream transition-opacity duration-300 pointer-events-auto opacity-100 sm:top-[92px]"
      >
        <nav className="relative h-full w-full px-8 py-8 sm:px-12 sm:py-12">
          <div className="relative flex h-full flex-col items-end justify-start gap-5 overflow-hidden pt-4 sm:hidden">
            <div className="pointer-events-none absolute inset-0 z-0 flex items-start justify-center pt-8">
              <div className="relative h-[44vh] w-[92vw] max-w-[460px] opacity-25">
                <Image
                  src={seperator}
                  alt=""
                  fill
                  sizes="88vw"
                  className="object-contain object-center"
                />
              </div>
            </div>
            {navItems.map((item, index) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className={`relative z-10 text-5xl leading-none transition-all duration-500 hover:opacity-70 ${
                  isMenuOpen ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
                }`}
                style={{ transitionDelay: `${isMenuOpen ? index * 70 : 0}ms` }}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="relative hidden h-full w-full items-start gap-8 pt-6 sm:flex lg:gap-14">
            <div className="relative h-full flex-1 overflow-hidden">
              <div className="relative mx-auto h-full w-full max-w-[1080px]">
                <Image
                  src={seperator}
                  alt=""
                  fill
                  priority={isMenuOpen}
                  sizes="(min-width: 1024px) 70vw, 60vw"
                  className={`object-contain object-center transition-all duration-700 ${
                    isMenuOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
                  }`}
                />
              </div>
            </div>

            <div className="flex w-[190px] shrink-0 flex-col items-start justify-start gap-8 lg:w-[220px] lg:gap-12">
              {navItems.map((item, index) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`text-5xl leading-none transition-all duration-500 hover:translate-x-2 hover:opacity-70 lg:text-6xl ${
                    isMenuOpen ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"
                  }`}
                  style={{ transitionDelay: `${isMenuOpen ? index * 90 : 0}ms` }}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </nav>
      </div>
      ) : null}
    </div>
  );
}
