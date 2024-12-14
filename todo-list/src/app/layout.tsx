import type { Metadata } from "next";
import "./globals.scss";

export const metadata: Metadata = {
  title: "Todo List",
  description: "Coding challenge todo list app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
