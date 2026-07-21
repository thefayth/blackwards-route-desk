import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://blackwards-route-desk.indigo-iris-5804.chatgpt.site"),
  title: {
    default: "Auntie AI: Blackwards Route Desk",
    template: "%s · Auntie AI",
  },
  description: "Read the route before your work moves. GPT-5.6 decision support for Black creators.",
  icons: {
    icon: "/auntie-ai-mark.svg",
    shortcut: "/auntie-ai-mark.svg",
  },
  openGraph: {
    title: "Auntie AI: Blackwards Route Desk",
    description: "Turn an opportunity into an owner-first route packet before your work moves.",
    type: "website",
    images: [{ url: "/og.png", width: 1730, height: 909, alt: "Auntie AI Blackwards Route Desk" }],
  },
  twitter: { card: "summary_large_image", images: ["/og.png"] },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
