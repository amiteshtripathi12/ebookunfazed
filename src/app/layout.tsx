"use client";
import {createContext, useContext, useState} from "react";
import type {Metadata} from "next";
import "./globals.css";
import {Nunito} from "next/font/google";
import localFont from "next/font/local";
import {Toaster} from "@/components/ui/toaster";
import NavBar from "@/components/common/NavBar";

const ageo = localFont({
  src: [
    {
      path: "../../public/font/AgeoPersonalUse.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/font/AgeoPersonalUse-Bold.otf",
      weight: "700",
      style: "bold",
    },
    {
      path: "../../public/font/AgeoPersonalUse-ExtraBold.otf",
      weight: "850",
      style: "extra-bold",
    },
    {
      path: "../../public/font/AgeoPersonalUse-Medium.otf",
      weight: "500",
      style: "medium",
    },
  ],
});

const nunito = Nunito({
  weight: ["400", "600", "700", "900"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

export const DialogContext = createContext<{
  isDialogOpen: boolean;
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
} | null>(null);

export default function RootLayout({children}: {children: React.ReactNode}) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <html lang="en">
      <body className={nunito.className}>
        <DialogContext.Provider value={{isDialogOpen, setIsDialogOpen}}>
          <NavBar
            isDialogOpen={isDialogOpen}
            setIsDialogOpen={setIsDialogOpen}
          />
          <main>{children}</main>
          <Toaster />
        </DialogContext.Provider>
      </body>
    </html>
  );
}
