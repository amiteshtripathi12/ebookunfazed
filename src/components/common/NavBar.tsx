"use client";

import {useState, useEffect} from "react";
import {useRouter} from "next/navigation";
import {usePathname} from "next/navigation";
import {X} from "lucide-react";
import MainButton from "./MainButton";
import Link from "next/link";

function NavBar() {
  const [menu, setMenu] = useState(false);
  const [scrollTarget, setScrollTarget] = useState<string | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  const toggleMenu = () => {
    setMenu(!menu);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({behavior: "smooth"});
    }
    setMenu(false);
  };

  useEffect(() => {
    if (scrollTarget) {
      scrollToSection(scrollTarget);
      setScrollTarget(null);
    }
  }, [scrollTarget]);

  const handleNavigation = (id: string) => {
    if (pathname === "/") {
      scrollToSection(id);
    } else {
      router.push("/");
      setScrollTarget(id);
    }
  };

  return (
    <div className="md:sticky md:top-0  shadow-[0_4px_6px_rgb(0,0,0,0.1)]  z-20">
      {/* DESKTOP */}
      <div className="hidden lg:block animate-in fade-in zoom-in bg-white p-4">
        <div className="flex justify-between md:mx-[9rem] items-center">
          <img
            onClick={() => handleNavigation("home-section")}
            className="h-[2.5rem] w-[10rem] cursor-pointer"
            src="/images/logo.png"
            alt="logo"
          />
          <div className="flex gap-[20px] xl:gap-[50px] text-[16px] items-center select-none">
            <p
              onClick={() => handleNavigation("home-section")}
              className="hover:text-primary cursor-pointer flex items-center gap-2 font-[500] text-gray"
            >
              Home
            </p>
            <p
              onClick={() => handleNavigation("about-section")}
              className="hover:text-primary cursor-pointer flex items-center gap-2 font-[500] text-gray"
            >
              About
            </p>
            <p
              onClick={() => handleNavigation("qa-section")}
              className="hover:text-primary cursor-pointer flex items-center gap-2 font-[500] text-gray"
            >
              Q&A
            </p>
            <Link href="/contact-us">
              <p className="hover:text-primary cursor-pointer flex items-center gap-2 font-[500] text-gray">
                Contact
              </p>
            </Link>
          </div>
          <div className="flex items-center gap-[40px] select-none">
            <MainButton text="Sign up" classes="shadow-none" />
          </div>
        </div>
      </div>

      {/* MOBILE */}
      <div
        className={`block lg:hidden shadow-sm fixed top-0 w-full z-[999] bg-white py-4 animate-in fade-in zoom-in ${
          menu ? " bg-primary py-2" : ""
        }`}
      >
        <div className="flex justify-between mx-[10px]">
          <img
            onClick={() => handleNavigation("home-section")}
            className="h-[2.5rem] w-[10rem]"
            src="/images/logo.png"
            alt="logo"
          />
          <div className="flex items-center gap-[40px]">
            {menu ? (
              <X
                className="cursor-pointer animate-in fade-in zoom-in text-black"
                onClick={toggleMenu}
              />
            ) : (
              <img
                src="/svgs/hamburger.svg"
                alt="menu"
                className="cursor-pointer animate-in fade-in zoom-in"
                onClick={toggleMenu}
              />
            )}
          </div>
        </div>
        {menu && (
          <div className="my-8 select-none animate-in slide-in-from-right">
            <div className="flex flex-col gap-8 mt-8 mx-4">
              <p
                onClick={() => handleNavigation("home-section")}
                className="hover:text-primary cursor-pointer flex items-center gap-2 font-[500] text-gray"
              >
                Home
              </p>
              <p
                onClick={() => handleNavigation("about-section")}
                className="hover:text-primary cursor-pointer flex items-center gap-2 font-[500] text-gray"
              >
                About
              </p>
              <p
                onClick={() => handleNavigation("qa-section")}
                className="hover:text-primary cursor-pointer flex items-center gap-2 font-[500] text-gray"
              >
                Q&A
              </p>
              <Link href="/contact-us">
                <p className="hover:text-primary cursor-pointer flex items-center gap-2 font-[500] text-gray">
                  Contact
                </p>
              </Link>
              <div className="flex flex-col gap-[40px] select-none">
                <MainButton text="Sign up" classes="shadow-none" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default NavBar;
