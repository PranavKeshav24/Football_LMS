import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";
import { Manrope } from "next/font/google";

const Manropes = Manrope({ subsets: ["latin"] });
export const metadata = {
  title: "FootballLMS",
  description: "BCS403: DBMS Mini Project, Football League Management System",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={Manropes.className}>
        <Navbar />
        <div className="px-16 mx-auto p-4">
          <div className="mt-8">{children}</div>
        </div>
        <Footer />
      </body>
    </html>
  );
}
