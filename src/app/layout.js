import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import ContextProvider from "./ContextProvider";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children, modal }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ContextProvider>
          <main>
            <Header />
            {modal}
            {children}
            <Footer />
          </main>
        </ContextProvider>
      </body>
    </html>
  );
}