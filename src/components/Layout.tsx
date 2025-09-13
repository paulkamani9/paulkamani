import type { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

interface LayoutProps {
  children: ReactNode;
}

/**
 * Main layout wrapper component
 */
export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-dark-900 text-white">
      <Navbar />
      <main className="relative">{children}</main>
      <Footer />
    </div>
  );
};
