import { Inter } from "next/font/google";
import "./globals.css";

import { Header } from "@/screens/Layout/Header/Header";

import { ReduxProvider } from "@/providers/ReduxProvider";
import { Footer } from "@/screens/User/Footer/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>
          <Header />
          {children}
          <Footer/>
        </ReduxProvider>
      </body>
    </html>
  );
}
