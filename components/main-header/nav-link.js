"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import classes from "./nav-link.module.css";

/* 
    use client:
    1.) jelzi a szerveroldalnak, hogy ez egy olyan komponens,
        ami client-oldali műveleteket is kell végezzen
    2.) mivel ezzel a parancsal átadjuk a client oldalnak
        a komponenst, fontos figyelni arra, mégis milyen méretűt.
        Ha egy komponenst képesek vagyunk még bontani úgy,
        hogy a keletkezett szülőkompnensben ne legyen hook, 
        vagy bármi kliensoldali műveletet igénylő metódus,
        akkor tegyük meg a gyerek pedig kapja meg a use client
        jelzőt.

*/

const NavLink = ({ href, children }) => {
  const path = usePathname();
  return (
    <Link
      href={href}
      className={
        path.startsWith(href)
          ? `${classes.link} ${classes.active}`
          : classes.link
      }
    >
      {children}
    </Link>
  );
};

export default NavLink;
