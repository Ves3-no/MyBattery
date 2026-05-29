import type { Trip } from "../types"
import type { Dispatch, SetStateAction } from "react"
import Rod from "../assets/bolt_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg?react"
import Delete from "../assets/delete_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg?react"
function PrewData({PrevTrips, setPrevTrips, setKmStand, setKmSinceLastCharge, KmSinceLastCharge, DateOfLastCharge, KmStand}: {PrevTrips:Trip[], setPrevTrips:Dispatch<SetStateAction<Trip[]>>, setKmStand:Dispatch<SetStateAction<number>>, setKmSinceLastCharge:Dispatch<SetStateAction<number>>, KmSinceLastCharge:number, DateOfLastCharge:Date, KmStand:number }){
    return(
        <>
            <div className="flex flex-col bg-light w-full rounded-2xl p-7 border-main-light border gap-2  ">
                <p className="text-lg font-medium text-main">Dine turer</p>
                <div className="flex gap-4 flex-col">
                {
                    PrevTrips.toReversed().map((Trip, index)=>{
                        return(
                            <div key={index} className="flex flex-row gap-4 border-y py-2 border-main-light w-[100%] items-center">
                                <Rod className="text-main bg-main-light rounded-[50%] aspect-[1/1] h-full p-2 w-auto" fill="currentColor "/>
                                    <div>
                                        <h1 className="text-dark"><span>{String(Math.round(Number(Trip.Km)))}km</span> · <span>{String(Trip.BatteryUsage)}%</span></h1>
                                        <p className="text-xs text-main">{String(Trip.Date.getDate())}. {Trip.Date.toLocaleDateString('no-NO', { month: 'long' })} · {String(Math.round(Number(Trip.KmStand)))}km</p>
                                    </div> 
                                    <button className="ml-auto" onClick={()=> DeleteFunc(Trip, index, PrevTrips, setPrevTrips, setKmStand, setKmSinceLastCharge, KmSinceLastCharge, DateOfLastCharge, KmStand)}><Delete fill="currentColor" className="text-red-600 hover:text-red-400 cursor-pointer"/></button>
                            </div>
                        )
                    })
                }
                </div>
            </div>
        </>
    )
}
function DeleteFunc(Trip:Trip , index:number, PrevTrips:Trip[], setPrevTrips:Dispatch<SetStateAction<Trip[]>>, setKmStand:Dispatch<SetStateAction<number>>, setKmSinceLastCharge:Dispatch<SetStateAction<number>>, KmSinceLastCharge:number, DateOfLastCharge:Date, KmStand:number){
    const list = PrevTrips;
    list.splice(index, 1)
    setPrevTrips(list)
    setKmStand(KmStand - Number(Trip.Km))
    if (Trip.Date >= DateOfLastCharge) {
        setKmSinceLastCharge(KmSinceLastCharge - Number(Trip.Km))
    }
    
}
export default PrewData