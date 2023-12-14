'use client'

import {Work_Sans, Dongle} from 'next/font/google'
import bg from '../../../public/unsplash_oF7hh97lVqA.png'
import {useRouter} from "next/navigation";

const dongle = Dongle({weight: ['300', '400', '700'], subsets: ['latin']})

export default function Welcome() {
    const router = useRouter()

    return (
        <div style={{
            background: `linear-gradient( rgba(10, 13, 17, 0.8), rgba(10, 13, 17, 0.8) ), url(${bg.src})`
        }} className={dongle.className + "flex flex-col h-screen"}>
            <nav className="bg-[#10151D] h-[15%] pl-28 py-4 drop-shadow-3xl">
                <div className="flex items-center">
                    <h1 className="text-5xl text-yellow-400">
                        si
                        <span className="text-gray-100">.itam</span>
                    </h1>
                    <div className="border-l-2 border-l-gray-100 h-full ml-2 pl-2">
                        <p className="text-yellow-400 text-2xl mt-1 w-36 leading-none">Sistem Informasi
                            Pertambangan.</p>
                    </div>
                </div>
            </nav>
            <main className="text-gray-300 flex h-[85%] justify-center flex-col">
                <p className="text-7xl text-center">“PIERCE THE HEAVEN WITH YOUR DRILL”</p>
                <p className="mt-5 mr-36 text-4xl text-end">- simon K.</p>
                <div className="flex justify-center mt-10">
                    <button onClick={() => router.push('/login')} className="border-2 border-yellow-400
                    text-3xl px-7 py-3 hover:bg-yellow-400 hover:text-white rounded-[2rem]">Start your drilling journey today</button>
                </div>
            </main>
        </div>
    )
}