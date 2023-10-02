"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import React, { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

import { navbarPaths } from "@/lib/constants";

import styles from "./Header.module.scss";

const Header = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const closeSesion = () => {
    try {
      //localStorage.removeItem("TT-CMS-token");
    } catch (e) {
      console.log(
        "removeStorage: Error al borrar TT-CMS-token del localStorage: " +
          JSON.stringify(e)
      );
      return false;
    }

    router.push("/");
    return true;
  };

  return (
    <nav className={styles["navbar"]}>
      <Link
        href={"/"}
        className={`${styles["navbar__logo"]} ${
          pathname === "/" ? styles["navbar__link--active"] : ""
        }`}
      >
        TurfTipster
      </Link>

      <ul
        className={`${styles["navbar__links"]} ${
          open ? styles["navbar__links--active"] : ""
        }`}
      >
        {navbarPaths.map((elm, index) => (
          <li key={index} className={styles["navbar__item"]}>
            <Link
              href={elm.to}
              className={`${styles["navbar__link"]} ${
                pathname.includes(elm.to) && elm.to !== "/"
                  ? styles["navbar__link--active"]
                  : ""
              }`}
              onClick={
                elm.copy === "Cerrar Sesión"
                  ? closeSesion
                  : () => setOpen(false)
              }
            >
              {elm.copy}
            </Link>
          </li>
        ))}
      </ul>
      <div onClick={() => setOpen(!open)} className={styles["navbar__icon"]}>
        {open ? <FiX /> : <FiMenu />}
      </div>
    </nav>
  );
};

export default Header;
