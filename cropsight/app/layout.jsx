import { Inter } from "next/font/google";
import "./globals.css";
import ConditionalNavbar from "./components/ConditionalNavbar";

const inter = Inter({
  subsets: ["latin"],
  display: 'swap',
});

export const metadata = {
  title: "Cropsight - Snap. Diagnose. Protect.",
  description: "AI-powered crop disease detection for modern agriculture. Get instant diagnosis with expert treatment recommendations.",
  icons: {
    icon: '/logo.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ConditionalNavbar />
        {children}
      </body>
    </html>
  );
}
