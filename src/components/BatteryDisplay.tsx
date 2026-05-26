import LogCharging from './LogChargingPopUp'
import { type Dispatch, type SetStateAction } from "react";
import type { DateOwn } from "../types";
import BatteryE  from "../assets/battery_android_0_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg?react"
import BatteryC from "../assets/battery_android_plus_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg?react"
function BatteryDisplay({Battery, setBattery, setKmSinceLastCharge, setDateOfLastCharge, ShowBatteryPopUp, setShowBatteryPopUp}: {Battery:number, setBattery:Dispatch<SetStateAction<number>>, setKmSinceLastCharge:Dispatch<SetStateAction<number>>, setDateOfLastCharge:Dispatch<SetStateAction<DateOwn>>, ShowBatteryPopUp:boolean, setShowBatteryPopUp:Dispatch<SetStateAction<boolean>>}){
    const activeBlocks = Battery ? Math.floor(Battery / 12.5) : 0;
    return(
        <>
            <div className="flex flex-col bg-light w-full rounded-2xl p-7 border-main-light border gap-2">
                <div className="flex flex-row justify-between w-full items-baseline ">
                    <h3 className="text-black text-2xl font-bold flex items-center gap-1"><BatteryE fill="currentColor " className="translate-y-[1px]"/> Batteri</h3>
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
                    <button onClick={()=> setShowBatteryPopUp(true)} className="bg-outstand mx-auto block w-[55%] p-3 rounded-xl hover:bg-outstand-light transition-all duration-400 text-light  mt-2 cursor-pointer flex items-center justify-center gap-2"><BatteryC fill="currentColor " className="translate-y-[1px]"/>Loggfør Lading</button>
                </div>
            </div>
            <LogCharging ShowBatteryPopUp={ShowBatteryPopUp} setShowBatteryPopUp={setShowBatteryPopUp} setBattery={setBattery} setKmSinceLastCharge={setKmSinceLastCharge} setDateOfLastCharge={setDateOfLastCharge}></LogCharging>
        </>
    )
}

export default BatteryDisplay