import type { Trip } from "../types"
import Rod from "../assets/bolt_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg?react"

function PrewData({PrevTrips}:{PrevTrips:Trip[]}){
    return(
        <>
            <div className="flex flex-col bg-light w-full rounded-2xl p-7 border-main-light border gap-2  ">
                <p className="text-lg font-medium text-main">Dine turer</p>
                <div className="flex gap-4 flex-col">
                {
                    PrevTrips.map((Trip, index)=>{
                        return(
                            <div key={index} className="flex flex-row gap-4 items-center border-y py-2 border-main-light">
                                <Rod className="text-main bg-main-light rounded-[50%] aspect-[1/1] h-full w-auto p-3" fill="currentColor "/>
                                <div>
                                    <h1 className="text-dark"><span>{String(Trip.Km)}km</span> · <span>{String(Trip.BatteryUsage)}%</span></h1>
                                    <p className="text-xs text-main">{String(Trip.Date.Date)}. {String(Trip.Date.Month)} · {String(Trip.KmStand)}km</p>
                                </div>
                            </div>
                        )
                    })
                }
                </div>
            </div>
        </>
    )
}
export default PrewData