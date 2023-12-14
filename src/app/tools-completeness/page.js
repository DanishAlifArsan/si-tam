'use client'

import Drawer from "@/app/global-component/drawer";
import {grey, yellow} from '@mui/material/colors';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from "@mui/material/FormControlLabel";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import {useState} from "react";
import axios from "axios";

const label = {inputProps: {'aria-label': 'Checkbox demo'}};

export default function ToolsCompleteness() {
    const [headache, setHeadache] = useState(false);
    const [fever, setFever] = useState(false);
    const [cough, setCough] = useState(false);
    const [healthy, setHealthy] = useState(false);

    const [hasHelmet, setHasHelmet] = useState(false);
    const [hasGloves, setHasGloves] = useState(false);
    const [hasGoogles, setHasGoogles] = useState(false);
    const [hasVest, setHasVest] = useState(false);

    const handleSubmit = async () => {
        const healthSurveyBody = {
            "employeeId": JSON.parse(localStorage.getItem('id')),
            "batuk": cough,
            "demam": fever,
            "pusing": headache,
            "sehat": healthy
        }
        
        console.log(healthSurveyBody)
        
        const toolSurveyBody = {
            "employeeId": JSON.parse(localStorage.getItem('id')),
            "hasGloves": hasGloves,
            "hasGoogles": hasGoogles,
            "hasVest": hasVest,
            "hasHelmet": hasHelmet
        }
        
        const healthSurveyRes = await axios.post('https://pemin.aenzt.tech/api/v1/mining/health-survey',
            healthSurveyBody, {
                validateStatus: false,
                headers: {
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
                    "Content-Type": "application/json"
                }
            });
        
        const toolSurveyRes = await axios.post('https://pemin.aenzt.tech/api/v1/mining/tool-survey',
            toolSurveyBody, {
                validateStatus: false,
                headers: {
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
                    "Content-Type": "application/json"
                }
            });
        
        if (healthSurveyRes.status !== 201 || toolSurveyRes.status !== 201) {
            alert(healthSurveyRes.data.message);
            return;
        }
        // alert('Data berhasil disimpan')
    }

    return (
        <div className="grid grid-cols-4">
            <Drawer currentPage="tools-completeness"/>
            <div className="grid grid-cols-2 col-span-3 bg-[#161E29]">
                <div className="overflow-y-auto h-screen px-10 pb-10">
                    <p className="text-3xl mt-10 text-yellow-400">23 November 2023</p>
                    <p className="text-4xl mt-5 text-gray-400">Apakah anda merasa pusing?</p>
                    <div className="flex mt-3">
                        <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                            className="text-gray-400"
                            value={headache}
                            onChange={(e) => setHeadache(e.target.value)}
                        >
                            <FormControlLabel value={true} control={
                                <Radio sx={{
                                    color: grey[400],
                                    '&.Mui-checked': {
                                        color: yellow[400],
                                    },
                                }}/>
                            } label="YA"/>
                            <FormControlLabel value={false} control={<Radio sx={{
                                color: grey[400],
                                '&.Mui-checked': {
                                    color: yellow[400],
                                },
                            }} />} label="TIDAK"/>
                        </RadioGroup>
                    </div>
                    <p className="text-4xl mt-10 text-gray-400">Apakah anda merasa demam?</p>
                    <RadioGroup
                        row
                        className="text-gray-400"
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        value={fever}
                        onChange={(e) => setFever(e.target.value)}
                    >
                        <FormControlLabel value={true} control={
                            <Radio sx={{
                                color: grey[400],
                                '&.Mui-checked': {
                                    color: yellow[400],
                                },
                            }}/>
                        } label="YA"/>
                        <FormControlLabel value={false} control={<Radio sx={{
                            color: grey[400],
                            '&.Mui-checked': {
                                color: yellow[400],
                            },
                        }} />} label="TIDAK"/>
                    </RadioGroup>
                    <p className="text-4xl mt-10 text-gray-400">Apakah anda batuk-batuk?</p>
                    <div className="flex mt-3">
                        <RadioGroup
                            row
                            className="text-gray-400"
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                            value={cough}
                            onChange={(e) => setCough(e.target.value)}
                        >
                            <FormControlLabel value={true} control={
                                <Radio sx={{
                                    color: grey[400],
                                    '&.Mui-checked': {
                                        color: yellow[400],
                                    },
                                }}/>
                            } label="YA"/>
                            <FormControlLabel value={false} control={<Radio sx={{
                                color: grey[400],
                                '&.Mui-checked': {
                                    color: yellow[400],
                                },
                            }} />} label="TIDAK"/>
                        </RadioGroup>
                    </div>
                    <p className="text-4xl mt-10 text-gray-400">Apakah anda merasa sehat?</p>
                    <div className="flex mt-3">
                        <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            className="text-gray-400"
                            name="row-radio-buttons-group"
                            value={healthy}
                            onChange={(e) => setHealthy(e.target.value)}
                        >
                            <FormControlLabel value={true} control={
                                <Radio sx={{
                                    color: grey[400],
                                    '&.Mui-checked': {
                                        color: yellow[400],
                                    },
                                }}/>
                            } label="YA"/>
                            <FormControlLabel value={false} control={<Radio sx={{
                                color: grey[400],
                                '&.Mui-checked': {
                                    color: yellow[400],
                                },
                            }} />} label="TIDAK"/>
                        </RadioGroup>
                    </div>
                </div>
                <div className="mx-10 mt-24">
                    <div className="flex justify-between items-center">
                        <label className="text-4xl text-gray-400">Helm</label>
                        <Checkbox {...label} checked={hasHelmet}
                                  onChange={(e) => setHasHelmet(e.target.checked)}
                                  sx={{color: grey[400], '&.Mui-checked': {color: yellow[400]}}}/>
                    </div>
                    <div className="flex mt-3 justify-between items-center">
                        <label className="text-4xl text-gray-400">Kacamata</label>
                        <Checkbox {...label} checked={hasGoogles}
                                  onChange={(e) => setHasGoogles(e.target.checked)}
                                  sx={{color: grey[400], '&.Mui-checked': {color: yellow[400]}}}/>
                    </div>
                    <div className="flex mt-3 justify-between items-center">
                        <label className="text-4xl text-gray-400">Rompi</label>
                        <Checkbox {...label} checked={hasVest}
                                  onChange={(e) => setHasVest(e.target.checked)}
                                  sx={{color: grey[400], '&.Mui-checked': {color: yellow[400]}}}/>
                    </div>
                    <div className="flex mt-3 justify-between items-center">
                        <label className="text-4xl text-gray-400">Sarung Tangan</label>
                        <Checkbox {...label} checked={hasGloves}
                                  onChange={(e) => setHasGloves(e.target.checked)}
                                  sx={{color: grey[400], '&.Mui-checked': {color: yellow[400]}}}/>
                    </div>
                    <div className="flex justify-center mt-4">
                        <button onClick={handleSubmit} className="bg-green-500 text-3xl text-white px-32 rounded-lg py-2">KIRIM</button>
                    </div>
                </div>
            </div>
        </div>
    )
}