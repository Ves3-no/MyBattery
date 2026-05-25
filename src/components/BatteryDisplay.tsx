import { useState } from "react";
import LogCharging from './LogChargingPopUp'
import { type Dispatch, type SetStateAction } from "react";
import type { DateOwn } from "../types";
function BatteryDisplay({Battery, setBattery, setKmSinceLastCharge, setDateOfLastCharge}: {Battery:number, setBattery:Dispatch<SetStateAction<number>>, setKmSinceLastCharge:Dispatch<SetStateAction<number>>, setDateOfLastCharge:Dispatch<SetStateAction<DateOwn>>}){
    const [ShowPopUp, setShowPopUp ]= useState<boolean>(false)
    const activeBlocks = Battery ? Math.floor(Battery / 12.5) : 0;
    return(
        <>
            <div className="flex flex-col bg-light w-full rounded-2xl p-7 border-main-light border gap-2">
                <div className="flex flex-row justify-between w-full items-baseline ">
                    <h3 className="text-black text-2xl font-bold">Batteri</h3>
                    <h3 className="text-dark font-bold text-2xl">{String(Battery)}%</h3>
                </div>
                <div className="w-full flex flex-row gap-2 justfy-center items-center">
                    {Array.from({ length: activeBlocks }, (_, i) => (
                        <div className="BatteyProsentageBlock bg-battery flex-1 h-13 rounded-xl hover:opacity-70 cursor-pointer" key={i} ></div>
                    ))}
                    {Array.from({ length: (8 - activeBlocks) }, (_, i) => (
                        <div className="BatteyProsentageBlock flex-1 bg-main-light h-13 rounded-xl cursor-pointer" key={i} ></div>
                    ))}
                </div>
                <div>
                    <button onClick={()=> setShowPopUp(true)} className="bg-outstand mx-auto block w-[45%] p-3 rounded-xl hover:bg-outstand-light transition-all duration-400 text-light hover:border-secondary border-secondary border-1 mt-2 cursor-pointer">Loggfør Lading</button>
                </div>
            </div>
            <LogCharging ShowPopUp={ShowPopUp} setShowPopUp={setShowPopUp} setBattery={setBattery} setKmSinceLastCharge={setKmSinceLastCharge} setDateOfLastCharge={setDateOfLastCharge}></LogCharging>
        </>
    )
}

export default BatteryDisplay