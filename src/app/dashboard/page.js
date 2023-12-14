'use client'

import Image from "next/image";
import Drawer from "@/app/global-component/drawer";
import axios from "axios";
import {useEffect, useState} from "react";

export default function Dashboard() {
    const [userData, setUserData] = useState({})
    const getUserData = async () => {
        const id = JSON.parse(localStorage.getItem('id'));
        const res = await axios.get(`https://pemin.aenzt.tech/api/v1/employee/${id}`, {
            headers: {
                Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
            }
        })
        if (res.status !== 200) {
            alert(res.data.message);
            return;
        }
        setUserData(res.data.data);
    }

    useEffect(() => {
        getUserData()
    }, [])

    return (
        <div className="grid grid-cols-4">
            <Drawer currentPage="dashboard"/>
            <div className="col-span-3 bg-[#161E29]">
                <div className="flex text-gray-300 justify-end mb-5">

                    <h2 className="text-4xl mt-7 mr-5">Welcome Back,
                        {
                            userData && (
                                <span className="text-yellow-400">{" " + userData.name}</span>
                            )
                        }
                    </h2>
                </div>
                <hr className="border-[1.5px] border-gray-600"/>
                <div className="flex justify-between mt-7 ml-16">
                    <div>
                        <h2 className="text-4xl text-gray-300">Tambang Batubara - Day 69</h2>
                        <h3 className="text-3xl text-yellow-400">23 November 2023</h3>
                    </div>
                    <div className="mr-10">
                        <button className="bg-green-500 text-4xl text-white px-[5.2rem] rounded-lg py-2">HADIR</button>
                        <button className="block mt-5 bg-red-500 text-4xl text-white px-24 rounded-lg py-2">IZIN</button>
                    </div>
                </div>
                <div className="absolute bottom-5 ml-16 text-3xl text-gray-300">
                    <h2>Jumlah Hadir : <span className="text-yellow-400">67</span></h2>
                    <h2>Jumlah Izin : <span className="text-yellow-400">2</span></h2>
                    <h2>Jumlah Tanpa Keterangan : <span className="text-yellow-400">1</span></h2>
                </div>
            </div>
        </div>
    )
}