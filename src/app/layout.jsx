import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata = {
  title: {
    default: "UF Brand | Premium Ethnic Wear for Women",
    template: "%s | UF Brand",
  },
  description:
    "Shop handcrafted ethnic wear — kurta sets, silk sarees, festive suits & more. Pan-India delivery. Trusted since 2016. 52,000+ happy customers.",
  keywords: [
    "ethnic wear",
    "kurta sets",
    "silk sarees",
    "salwar suits",
    "Indian ethnic fashion",
    "festive wear",
    "UF Brand",
  ],
  openGraph: {
    title: "UF Brand | Premium Ethnic Wear for Women",
    description:
      "Handcrafted ethnic wear — kurta sets, silk sarees, festive suits. Pan-India delivery. Trusted since 2016.",
    url: "https://ufbrand.in",
    siteName: "UF Brand",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "UF Brand | Premium Ethnic Wear for Women",
    description:
      "Shop handcrafted ethnic wear. Pan-India delivery. 52,000+ happy customers.",
  },
  robots: { index: true, follow: true },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#D4147A",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className="antialiased font-sans">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
