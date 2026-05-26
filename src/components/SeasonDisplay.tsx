import type { Dispatch, SetStateAction } from "react";
import type { Season } from '../types'
import Vinter from "../assets/snowflake_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg?react"
import Vår from "../assets/eco_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg?react"
import Sommer from "../assets/sunny_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg?react"
import Høst from "../assets/rainy_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg?react"

function SeasonDisplay({SeasonNow, setSeasonNow, AvrageKmList}: {SeasonNow:Season, setSeasonNow:Dispatch<SetStateAction<Season>>, AvrageKmList:Number[]}){
    return(
        <>
            <div className="flex flex-row bg-light w-full rounded-2xl py-6 px-4 border-main-light border gap-4 ">
                <div className={`flex-1 p-2 rounded-xl border flex items-center flex-col ${ SeasonNow == "Vinter" ? " border-main-dark bg-main text-main-light" : "bg-main-light border-transparent text-main"} cursor-pointer`} onClick={()=> ChangeSeason("Vinter", setSeasonNow)}>
                    <Vinter fill="currentColor "/>
                    <p>Vinter</p>
                    <h4 className='text-xs'><span className='text-main-dark text-2xl font-bold'>{Number(AvrageKmList[0]) !== 0 ? Math.round(Number(AvrageKmList[0]))  :"-" }</span>{Number(AvrageKmList[0]) !== 0 ? "Km" : undefined}</h4>
                </div>
                <div className={`flex-1 p-2 rounded-xl border flex items-center flex-col ${ SeasonNow == "Vår" ? " border-main-dark bg-main text-main-light" : "bg-main-light border-transparent text-main"} cursor-pointer`} onClick={()=> ChangeSeason("Vår", setSeasonNow)}>
                    <Vår fill="currentColor "/>
                    <p >Vår</p>
                    <h4 className='text-xs'><span className='text-main-dark text-2xl font-bold'>{Number(AvrageKmList[1]) !== 0 ? Math.round(Number(AvrageKmList[0]))  :"-" }</span>{Number(AvrageKmList[1]) !== 0 ? "Km" : undefined}</h4>
                </div>
                <div className={`flex-1 p-2 rounded-xl border flex items-center flex-col ${ SeasonNow == "Sommer" ?" border-main-dark bg-main text-main-light" : "bg-main-light border-transparent text-main"} cursor-pointer`} onClick={()=> ChangeSeason("Sommer", setSeasonNow)}>
                    <Sommer fill="currentColor "/>
                    <p>Sommer</p>
                    <h4 className='text-xs'><span className='text-main-dark text-2xl font-bold'>{Number(AvrageKmList[2]) !== 0 ? Math.round(Number(AvrageKmList[0]))  :"-" }</span>{Number(AvrageKmList[2]) !== 0 ? "Km" : undefined}</h4>
                </div>
                <div className={`flex-1 p-2 rounded-xl border flex items-center flex-col ${ SeasonNow == "Høst" ? " border-main-dark bg-main text-main-light" : "bg-main-light border-transparent text-main"} cursor-pointer`} onClick={()=> ChangeSeason("Høst", setSeasonNow)}>
                    <Høst fill="currentColor "/>
                    <p>Høst</p>
                    <h4 className='text-xs'><span className='text-main-dark text-2xl font-bold'>{Number(AvrageKmList[3]) !== 0 ? Math.round(Number(AvrageKmList[0]))  :"-" }</span>{Number(AvrageKmList[3]) !== 0 ? "Km" : undefined}</h4>
                </div>
            </div>
        </>
    )
}
function ChangeSeason(Season:Season, setSeasonNow:Dispatch<SetStateAction<Season>>){
    setSeasonNow(Season)
}

export default SeasonDisplay