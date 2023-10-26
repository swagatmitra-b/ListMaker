import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "List Maker",
  description: "An app for your lists",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
