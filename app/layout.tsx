import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { theme } from "@ag.ds-next/react/ag-branding";
import { Core } from "@ag.ds-next/react/core";
import "./globals.css";

export const metadata: Metadata = {
  title: "Next.js Templates",
  description: "Next.js templates",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Core theme={theme}>
          <Header />
          <main id="main-content">{children}</main>
          <Footer />
        </Core>
      </body>
    </html>
  );
}
