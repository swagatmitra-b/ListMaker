import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import SessionProvider from "@/components/SessionProvider";
import "./globals.css";
import ThemeContext from "@/components/ThemeContext";

export const metadata: Metadata = {
  title: "Makelister",
  description: "An app for your lists",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();
  return (
    <html
      lang="en"
      className="light"
      style={{ colorScheme: "light" }}
      suppressHydrationWarning
    >
      <body>
        <ThemeContext>
          <SessionProvider session={session}>{children}</SessionProvider>
        </ThemeContext>
      </body>
    </html>
  );
}
