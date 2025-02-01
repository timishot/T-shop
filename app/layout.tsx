
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {ReactNode} from "react";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import { store } from "@/redux/store";
import { Provider } from "react-redux";
import ClientProviders from "@/components/ClientProviders";
import { Toaster } from "@/components/ui/toaster"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "E-commerce App",
  description: "Ecommerce app for buying and selling products",
};

const RootLayout = async ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
      <ClientProviders>
          <Header />
          {children}
          <Toaster />
          <Footer />
      </ClientProviders>
      </body>
    </html>
  );
}

export default RootLayout;


