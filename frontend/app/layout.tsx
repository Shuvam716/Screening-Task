import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Course Catalog & SMS Test",
  description: "Mini full-stack project with Next.js and Flask",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-[#fdf7ff] text-[#1c1b20] font-sans">{children}</body>
    </html>
  );
}
