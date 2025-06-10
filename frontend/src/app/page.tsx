'use client'

import '../styles/globals.css'
import NavBar from '../components/navbar'
import Image from 'next/image'

export default function Home() {
  return (
    <div className="relative flex flex-col h-screen overflow-hidden bg-white text-white">
      <style jsx global>{`
        body {
          overflow: hidden;
        }
      `}</style>

      <NavBar />

      <main className="flex-grow flex justify-center items-center relative z-10">
        <div className="flex items-center justify-center">
          <Image 
            src="/images/logo-big.webp"
            alt="Voicee"
            width={500}
            height={300}
            className="object-contain"
          />
        </div>
      </main>

      <footer className="hidden md:flex justify-center items-center p-2 relative z-10 bg-black bg-opacity-70">
        <p className="text-white text-lg md:text-xl">
          © ООО «Войси» 2024-2025
        </p>
      </footer>
    </div>
  )
}
