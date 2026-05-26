import { useState, type Dispatch, type SetStateAction } from "react";
import type { DateOwn } from "../types";
function LogCharging({ShowBatteryPopUp, setShowBatteryPopUp, setBattery, setKmSinceLastCharge, setDateOfLastCharge }: {ShowBatteryPopUp:boolean, setShowBatteryPopUp:Dispatch<SetStateAction<boolean>>, setBattery:Dispatch<SetStateAction<number>>, setKmSinceLastCharge:Dispatch<SetStateAction<number>>, setDateOfLastCharge:Dispatch<SetStateAction<DateOwn>>}){
    const [NewBattery, setNewBattery] = useState<number>(0);
    return(
        <>
            <div style={{display: ShowBatteryPopUp ? "flex" : "none", zIndex: ShowBatteryPopUp ? "100" : "-100"}} className="absolute bg-gray-800/50 w-full h-full top-0 items-center justify-center">
                <div className="bg-light border-main p-4 border-main rounded-xl flex-col flex w-[60%] border-2 gap-4 items-center">
                    <h1 className="text-dark font-bold text-2xl">Logg en lading</h1>
                    <div className="flex inline-flex p-2 border border-secondary rounded-xl text-dark">
                        <input type="number" onKeyUp={(e)=> setNewBattery(Number((e.target as HTMLInputElement).value))} placeholder="100" className="active:outline-none focus:outline-none"/>
                        <span>%</span>
                    </div>
                    <button onClick={()=> {setShowBatteryPopUp(false); logNewBattery(NewBattery, setBattery, setKmSinceLastCharge, setDateOfLastCharge )}} className="bg-outstand mx-auto block w-[45%] p-3 rounded-xl hover:bg-outstand-light transition-all duration-400 text-light mt-2 cursor-pointer">Logg</button>
                </div>
            </div>
        </>
    )
}  
function logNewBattery(NewBattery:number, setBattery:Dispatch<SetStateAction<number>>, setKmSinceLastCharge:Dispatch<SetStateAction<number>>, setDateOfLastCharge:Dispatch<SetStateAction<DateOwn>>){
    setBattery(NewBattery)
    const datenow = new Date()
    const MonthName = datenow.toLocaleString('no-NO', { month: 'long' }); 
    const date = {
        Month: MonthName,
        Date: datenow.getDate()
    } as DateOwn
    setDateOfLastCharge(date)
    localStorage.setItem("DateOfLastCharge", JSON.stringify(date))
    setKmSinceLastCharge(0)
}
export default LogCharging