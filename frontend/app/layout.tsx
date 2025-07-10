import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar/Navbar";


const NotoSan = Noto_Sans_KR({subsets: ["latin"]});


export const metadata: Metadata = {
  title: "세상 모든 여행의 시작, Airbnb",
  description: "낯선 도시, 따뜻한 집. 당신의 여행에 쉼표를 더하세요.",
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={NotoSan.className}>      
        <Navbar />


      <div className="pt-24">
          {children}
      </div>

      </body>
    </html>
  );
}
