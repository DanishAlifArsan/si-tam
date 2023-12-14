'use client'

import {useState} from "react";
import CalendarDays from "@/app/calendar/calendar-days";

export default function Calendar() {
    const weekdays = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'];

    return (
        <div className="calendar-body">
            <div className="grid grid-cols-7">
                {
                    weekdays.map((weekday) => {
                        return <div className="weekday text-white"><p>{weekday}</p></div>
                    })
                }
            </div>
            <CalendarDays />
        </div>
    )
}