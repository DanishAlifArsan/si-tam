'use client'

import Image from "next/image";
import {useRouter} from "next/navigation";

export default function Drawer({ currentPage }) {
    const defaultClass = "hover:cursor-pointer py-3 pl-5 flex items-center text-gray-400"
    const router = useRouter()

    return (
        <div className="self-start col-span-1 h-screen bg-[#10151D] sticky top-0">
            <div className="py-5 mx-3 border-b-[3px] border-b-gray-600 flex justify-center">
                <div className="flex items-center">
                    <h1 className="text-5xl text-yellow-400">
                        si
                        <span className="text-gray-100">.itam</span>
                    </h1>
                    <div className="border-l-[3px] border-l-gray-100 h-full ml-2 pl-2 flex items-center">
                        <p className="text-yellow-400 text-2xl mt-1 w-36 leading-4">Sistem Informasi
                            Pertambangan.</p>
                    </div>
                </div>
            </div>
            <div onClick={currentPage !== "dashboard" ? () => router.push("/dashboard") : () => {}}
                className={currentPage === "dashboard" ? `${defaultClass} mt-7 border-2 border-yellow-400 rounded-2xl`
                : `${defaultClass} mt-5`}>
                <Image src="/calendar.png" alt="calendar" width={30} height={30} />
                <h2 className="text-3xl hover:text-white ml-3 mt-2">Presensi</h2>
            </div>
            <div onClick={currentPage !== "mining-plan" ? () => router.push("/mining-plan") : () => {}}
                 className={currentPage === "mining-plan" ? `${defaultClass} border-2 border-yellow-400 rounded-2xl`
                : defaultClass}>
                <Image src="/mine_wagon.png" alt="calendar" width={30} height={30} />
                <h2 className="text-3xl hover:text-white pl-3 mt-2">Rencana Pengeboran</h2>
            </div>
            <div onClick={currentPage !== "tools-completeness" ? () => router.push("/tools-completeness") : () => {}}
                className={currentPage === "tools-completeness" ? `${defaultClass} border-2 border-yellow-400 rounded-2xl`
                : defaultClass}>
                <Image src="/worker_hat.png" alt="calendar" width={30} height={30} />
                <h2 className="text-3xl hover:text-white pl-3 mt-1">Kelengkapan Alat</h2>
            </div>
            <div className="flex w-full justify-center absolute bottom-5">
                <button className="bg-purple-500 hover:bg-red-500 text-4xl text-white px-20 rounded-lg py-2">LOG OUT</button>
            </div>
        </div>
    )
}