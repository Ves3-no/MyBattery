import { useState, type Dispatch, type SetStateAction } from "react";
import Speed from "../assets/speed_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg?react"

export default function settings({KmStand, setKmStand}:{KmStand:number,  setKmStand: Dispatch<SetStateAction<number>>;
}){
    const [KmuUptated, setKmuUptated] = useState<number>(Math.round(KmStand))
    return(<>

            <div className="flex flex-row bg-light w-full items-start rounded-2xl p-7 border-main-light border">
                <form className="flex-col flex gap-2 flex-1" onSubmit={(e)=>{uptateKMSTAND(KmuUptated, setKmStand); e.preventDefault()}}>
                    <p className="text-main text-xs flex items-center gap-1"><Speed fill="currentColor "/>Km-Stand</p>
                    <input type="number" className="text-main text-md field-sizing-content" required onChange={(e)=> setKmuUptated(Number(e.currentTarget.value))} value={KmuUptated}></input>
                </form>
            </div>
    </>)
}
function uptateKMSTAND(KmuUptated: number, setKmStand: Dispatch<SetStateAction<number>>){
    setKmStand(KmuUptated)
    
}