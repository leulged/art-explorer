"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type Props = {
  children: React.ReactNode;
};

export default function PageTransition({ children }: Props) {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(true);
      return;
    }
    setVisible(false);
    const id = window.setTimeout(() => setVisible(true), 10);
    return () => window.clearTimeout(id);
  }, [pathname]);

  return (
    <div
      className={`transition-opacity duration-150 ${visible ? "opacity-100" : "opacity-0"} motion-reduce:transition-none`}
    >
      {children}
    </div>
  );
}
