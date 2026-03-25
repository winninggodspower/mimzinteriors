"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Navbar as FlowbiteNavbar, NavbarBrand } from "flowbite-react";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (!isMenuOpen) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <div className="sticky top-0 z-40 w-full bg-mimz-cream">
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
          />
        </NavbarBrand>

        <button
          type="button"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isMenuOpen}
          className="group relative flex h-14 w-12 flex-col items-center justify-start pt-3 text-[#2a2a2a]"
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
              isMenuOpen ? "translate-y-0 opacity-100" : "translate-y-0 opacity-100"
            }`}
          >
            MENU
          </span>
        </button>
      </FlowbiteNavbar>

      <div
        className={`fixed inset-x-0 bottom-0 top-[86px] bg-mimz-cream transition-opacity duration-300 sm:top-[92px] ${
          isMenuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <nav className="relative h-full w-full px-8 py-8 sm:px-12 sm:py-12">
          <div className="flex h-full flex-col items-end justify-start gap-5 pt-4 sm:hidden">
            {navItems.map((item, index) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className={`text-5xl leading-none transition-all duration-500 hover:opacity-70 ${
                  isMenuOpen ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
                }`}
                style={{ transitionDelay: `${isMenuOpen ? index * 70 : 0}ms` }}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="relative hidden h-full w-full sm:block">
            {navItems.map((item, index) => {
              const topOffsets = ["8%", "26%", "44%", "62%", "80%"];

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`absolute right-10 text-6xl leading-none transition-all duration-500 hover:right-14 hover:opacity-70 ${
                    isMenuOpen ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"
                  }`}
                  style={{
                    top: topOffsets[index],
                    transitionDelay: `${isMenuOpen ? index * 90 : 0}ms`,
                  }}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </nav>
      </div>
    </div>
  );
}