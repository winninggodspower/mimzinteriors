"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Navbar as FlowbiteNavbar, NavbarBrand } from "flowbite-react";
import { AnimatePresence, motion } from "motion/react";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
];

const panelVariants = {
  closed: { opacity: 0 },
  open: {
    opacity: 1,
    transition: { duration: 0.22, ease: "easeOut", when: "beforeChildren", staggerChildren: 0.06 },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.16, ease: "easeIn" },
  },
};

const itemVariants = {
  closed: { opacity: 0, x: 20 },
  open: { opacity: 1, x: 0, transition: { duration: 0.34, ease: "easeOut" } },
  exit: { opacity: 0, x: 20, transition: { duration: 0.16, ease: "easeIn" } },
};

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const isItemActive = (href) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

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
        className="rounded-none! bg-mimz-cream! px-8! py-4! sm:px-12!"
      >
        <NavbarBrand as={Link} href="/" className="leading-none">
          <Image
            src="/INTERIORS-logo.png"
            alt="MIMZ Interiors"
            width={138}
            height={44}
            priority
            className="h-auto w-32.5"
            style={{ height: "auto" }}
          />
        </NavbarBrand>

        <button
          type="button"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isMenuOpen}
          className="group relative flex h-12 w-10 flex-col items-center justify-start pt-2.5 text-[#2a2a2a] sm:h-14 sm:w-12 sm:pt-3"
        >
          <span
            className={`absolute top-4 block h-0.5 w-7 bg-current transition-all duration-300 sm:w-8 ${
              isMenuOpen ? "rotate-45" : "-translate-y-2"
            }`}
          />
          <span
            className={`absolute top-4 block h-0.5 w-7 bg-current transition-all duration-300 sm:w-8 ${
              isMenuOpen ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`absolute top-4 block h-0.5 w-7 bg-current transition-all duration-300 sm:w-8 ${
              isMenuOpen ? "-rotate-45" : "translate-y-2"
            }`}
          />
          
           <span
            className={`mt-5 text-[11px] tracking-[0.18em] transition-all duration-300 sm:mt-6 sm:text-[12px] ${
              isMenuOpen ? "opacity-0" : "translate-y-0 opacity-100"
            }`}
          >
            MENU
          </span>
        </button>
      </FlowbiteNavbar>

      <AnimatePresence>
        {isMenuOpen ? (
          <motion.div
            key="navbar-menu"
            className="fixed inset-x-0 bottom-0 top-21 bg-mimz-cream pointer-events-auto sm:top-22"
            variants={panelVariants}
            initial="closed"
            animate="open"
            exit="exit"
          >
            <nav className="relative h-full w-full px-4 py-8 sm:px-12 ">

              {/* // Mobile menu with decorative separator */}
              <div className="relative flex h-full flex-col items-end justify-start gap-5 overflow-hidden pt-4 sm:hidden">
                <div className="pointer-events-none absolute inset-0 z-0 flex items-start justify-center pt-8">
                  <motion.div
                    className="relative h-[44vh] w-[92vw] max-w-115 opacity-25"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 0.25, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  >
                    <Image
                      src={'/mimz-mascut.png'}
                      alt=""
                      fill
                      sizes="80vw"
                      className="object-contain object-center"
                    />
                  </motion.div>
                </div>
                {navItems.map((item) => (
                  <motion.div key={item.label} variants={itemVariants}>
                    <Link
                      href={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className={`relative z-10 text-4xl leading-none transition-colors hover:opacity-70 ${
                        isItemActive(item.href) ? "text-mimz-gold" : "text-[#2a2a2a]"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </div>
              
              {/* // Desktop menu */}
              <div className="relative hidden h-full w-full sm:block">
                <motion.div
                  className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center overflow-hidden"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  <div className="relative h-[72vh] w-[72vw] max-w-7xl">
                    <Image
                      src={'/mimz-mascut1.png'}
                      alt=""
                      fill
                      sizes="(min-width: 1280px) 72vw, 72vw"
                      className="object-contain object-center"
                    />
                  </div>
                </motion.div>

                <motion.div
                  className="absolute right-0 top-0 z-10 flex w-47.5  flex-col items-start justify-center gap-8 lg:w-55 lg:gap-8"
                  variants={panelVariants}
                  initial="closed"
                  animate="open"
                  exit="exit"
                >
                  {navItems.map((item) => (
                    <motion.div key={item.label} variants={itemVariants}>
                      <Link
                        href={item.href}
                        onClick={() => setIsMenuOpen(false)}
                        className={`text-4xl leading-none transition-colors hover:translate-x-2 hover:opacity-70 lg:text-6xl ${
                          isItemActive(item.href) ? "text-mimz-gold" : "text-[#2a2a2a]"
                        }`}
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
