import Link from "next/link";
import Image from "next/image";

import MainHeaderBackground from "@/components/main-header/main-header-background";
import logoImg from "@/assets/logo.png";
import classes from "@/components/main-header/main-header.module.css";
import NavLink from "@/components/main-header/nav-link";


/* 
    NextJS esetében különösen előnyos az <Image src={logoImage}> tag használata
    az <img src={logoImg.src}>-vel szemben. (vegyük észre a .src-t, fontos!!)
    Segít optimalizáltabban kiadni a képet:
    1.) lazy loading under the hood (csak akkor tölt be, ha valóban látható)
    2.) Egyszerűsíti a responzivitást
    Etc...

    Priority:
    A lazy loading-nak azonban nem mindig van értelme,
    pl egy logo esetében, ami mindig látható kell legyen.
    Ilyenkor hasznos a priotity prop használata.
    1.) ezt tölti be a lehető leggyorsabban
    2.) megszűnik az előte esetlegesen felmerülő villogás (újra be-be töltés miatt)
*/

const MainHeader = () => {
  

  return (
    <>
      <MainHeaderBackground />
      <header className={classes.header}>
        <Link className={classes.logo} href={"/"}>
          <Image src={logoImg} alt="A plate with food on it" priority />
          NextLevel Food
        </Link>
        <nav className={classes.nav}>
          <ul>
            <li>
              <NavLink href={"/meals"}>Browse Meals</NavLink>
            </li>
            <li>
              <NavLink href={"/community"}>Foodies Community</NavLink>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};

export default MainHeader;
