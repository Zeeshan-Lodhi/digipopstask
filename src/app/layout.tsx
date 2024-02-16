import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Todo",
  description: "Digipops todo task",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <div>{children}</div>
    </html>
  );
}
