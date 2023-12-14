'use client'

import { Inter, Dongle } from 'next/font/google'
import './globals.css'
import { AuthContext } from "../../utils/auth-context";
import {useState} from "react";


const dongle = Dongle({weight: ['300', '400', '700'], subsets: ['latin']})

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={dongle.className}>
        {children}
      </body>
    </html>
  )
}
