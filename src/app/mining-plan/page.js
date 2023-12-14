'use client'

import Drawer from "@/app/global-component/drawer";
import {useEffect, useState} from "react";
import Calendar from "@/app/calendar/calendar";
import {useRouter} from "next/navigation";
import axios from "axios";

export default function MiningPlan() {
    const [date, setDate] = useState(new Date());
    const router = useRouter();
    const months = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'];

    return (
        <div className="grid grid-cols-4">
            <Drawer currentPage="mining-plan"/>
            <div className="col-span-3 bg-[#161E29] pt-[4rem] px-7">
                <div className="flex justify-between mr-3 mb-5">
                    <h2 className="text-4xl text-yellow-400">{ months[date.getMonth()] + " " + date.getFullYear()}</h2>
                    <button onClick={() => router.push("/mining-plan/create")}
                            className="text-green-600 text-4xl hover:bg-green-600 hover:text-white border
                            border-green-600 px-5 py-2 rounded-xl">
                        + Tambah agenda baru
                    </button>
                </div>
                <div className="text-3xl">
                    <Calendar />
                </div>

            </div>
        </div>
    )
}