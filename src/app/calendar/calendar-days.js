import axios from "axios";
import {useEffect, useState} from "react";

export default function CalendarDays() {
    const [schedules, setSchedules] = useState([])
    const [date, setDate] = useState(new Date())

    let firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    let weekdayOfFirstDay = firstDayOfMonth.getDay() - 1;
    let currentDays = [];
    for (let day = 0; day < 42; day++) {
        if (day === 0 && weekdayOfFirstDay === 0) {
            firstDayOfMonth.setDate(firstDayOfMonth.getDate() - 7);
        } else if (day === 0) {
            firstDayOfMonth.setDate(firstDayOfMonth.getDate() + (day - weekdayOfFirstDay));
        } else {
            firstDayOfMonth.setDate(firstDayOfMonth.getDate() + 1);
        }

        let calendarDay = {
            currentMonth: (firstDayOfMonth.getMonth() === date.getMonth()),
            date: (new Date(new Date().setDate(firstDayOfMonth.getDate()))),
            month: firstDayOfMonth.getMonth(),
            number: firstDayOfMonth.getDate(),
            selected: (firstDayOfMonth.toDateString() === date.toDateString()),
            year: firstDayOfMonth.getFullYear()
        }
        currentDays.push(calendarDay);
    }

    const getMiningSchedules = async() => {
        let firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 2);
        let lastDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 2);
        lastDayOfMonth.setDate(firstDayOfMonth.getDate() + 30);
        const res = await axios.get("https://pemin.aenzt.tech/api/v1/mining/mining-schedule?from=" +
            `${firstDayOfMonth.toISOString().split('T')[0]}&to=${lastDayOfMonth.toISOString().split('T')[0]}`,
            {
                headers: {
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
            })

        if (res.status !== 200) {
            alert(res.data.message);
            return;
        }
        setSchedules(res.data.data);
    }

    function changeCurrentDay(day) {
        setDate(new Date(day.year, day.month, day.number))
    }

    useEffect(() => {
        getMiningSchedules()
    }, []);

    return (
        <div className="grid grid-cols-7 mb-10">
            {
                schedules && currentDays.map((day) => {
                    let scheduleDate = schedules.find(s => s.startDate.substring(0, 10) === day.date.toISOString().split('T')[0]);
                    return (
                        <div className={"mr-3 mb-3 px-3 h-36 hover:cursor-pointer" +
                            (day.currentMonth ? " text-white" : " text-gray-700")
                            + (day.selected ? " bg-purple-500" : " bg-gray-400")}
                            onClick={() => changeCurrentDay(day)}>
                            <div className="flex h-full flex-col justify-between">
                                <p>{day.number}</p>
                                {
                                    scheduleDate && (
                                        <div className={`text-xl rounded-lg w-full bg-[#EC994B] mb-3`}>
                                            <p className="text-center">{scheduleDate.description}</p>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

// schedules &&
// schedules.some(schedule => schedule.startDate.substring(0, 10) === ``)