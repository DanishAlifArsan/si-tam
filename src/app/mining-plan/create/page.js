'use client'

import Drawer from "@/app/global-component/drawer";
import {styled, TextField} from "@mui/material";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import {grey, yellow} from '@mui/material/colors';
import FormControlLabel from '@mui/material/FormControlLabel';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {useState} from "react";
import axios from "axios";
import {useRouter} from "next/navigation";

const TextInput = styled(TextField)({
    '& .MuiOutlinedInput-root': {
        background: "rgb(232, 241, 250)",
        borderRadius: '10px',
        '& fieldset': {
            borderColor: '#7692B8',
            borderWidth: '4px'
        },
        '&:hover fieldset': {
            borderWidth: '4px',
            borderColor: '#7692B8',
        },
        '&.Mui-focused fieldset': {
            borderWidth: '4px',
            borderColor: '#7692B8',
        },
    },
})

export default function CreateMiningPlan() {
    const router = useRouter();
    const [date, setDate] = useState(null);
    const [description, setDescription] = useState("");
    const [workType, setWorkType] = useState("Office Work")

    const submitPlan = async (e) => {
        e.preventDefault();

        const body = {
            "startDate": date,
            "endDate": date,
            "description": description,
            "activity": workType,
            "status": "string"
        }

        const res = await axios.post('https://pemin.aenzt.tech/api/v1/mining/mining-schedule',
            body, {
                headers: {
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
                    "Content-Type": "application/json"
                }
            });

        if (res.status !== 201) {
            alert(res.data.message);
            return;
        }

        router.replace("/mining-plan");
    }

    return (
        <div className="grid grid-cols-4 text-white">
            <Drawer currentPage="mining-plan"/>
            <div className="col-span-3 bg-[#161E29] pt-[4rem] px-7">
                <p className="text-3xl">Tanggal</p>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker format="YYYY-MM-DD" value={date} className="w-3/4"
                                onChange={(newDate) => setDate(newDate)}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        background: "rgb(232, 241, 250)",
                                        borderRadius: '10px',
                                        '& fieldset': {
                                            borderColor: '#7692B8',
                                            borderWidth: '4px'
                                        },
                                        '&:hover fieldset': {
                                            borderWidth: '4px',
                                            borderColor: '#7692B8',
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderWidth: '4px',
                                            borderColor: '#7692B8',
                                        },
                                    },
                                }}/>
                </LocalizationProvider>
                <p className="text-3xl mt-5">Deskripsi</p>
                <TextInput type="text" color="secondary" id="email" className="w-3/4"
                           placeholder="" sx={{borderRadius: '10px', input: {color: 'black'}}}
                           value={description} onChange={(e) => setDescription(e.target.value)}
                />
                <p className="text-3xl mt-10 mb-1">Jenis</p>
                <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    value={workType}
                    onChange={(e) => setWorkType(e.target.value)}
                >
                    <FormControlLabel value="Office Work" control={<Radio
                        sx={{color: grey[400], '&.Mui-checked': {color: yellow[400]}}}/>} label="Office Work"/>
                    <FormControlLabel value="Field Work" control={<Radio sx={{
                        color: grey[400],
                        '&.Mui-checked': {color: yellow[400]}
                    }}/>} label="Field Work"/>
                </RadioGroup>
                <div className="mt-7">
                    <button onClick={submitPlan} className="bg-purple-500 text-3xl w-3/4 py-2 rounded-xl">SUBMIT
                    </button>
                </div>
            </div>
        </div>
    )
}