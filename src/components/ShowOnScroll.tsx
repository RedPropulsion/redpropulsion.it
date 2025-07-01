"use client";

import { useEffect, useState } from "react";

type Props = {
  children: React.ReactNode;
  active?: boolean;
};

export default function ShowOnScroll({ children, active }: Props) {
  const [showNavbar, setShowNavbar] = useState(!active);

  useEffect(() => {
    const handleScroll = () => setShowNavbar(!active || window.scrollY > 0);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });
  return (
    <div
      style={{
        opacity: showNavbar ? 1 : 0,
        transition: "opacity .3s",
      }}
    >
      {children}
    </div>
  );
}
