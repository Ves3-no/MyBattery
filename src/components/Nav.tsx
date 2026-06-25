import AddTrip  from "./AddTrip"
import { type Trip, type Season, type TypePage} from '../types'
import { type Dispatch, type SetStateAction, useState } from "react";
import Home from "../assets/home_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg?react"
import Settings from "../assets/settings_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg?react"
import Add from "../assets/add_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg?react" 

 
function Nav({KmStand, SeasonNow, Battery, setBattery, setKmStand, AvrageKmThisSeason, KmSinceLastCharge, setKmSinceLastCharge, setPrevTrips, PrevTrips, setShowBatteryPopUp, setPage}: {
  KmStand: number;
  SeasonNow: Season;
  Battery: number;
  setBattery: Dispatch<SetStateAction<number>>;
  setKmStand: Dispatch<SetStateAction<number>>;
  AvrageKmThisSeason: number;
  KmSinceLastCharge: number;
  setKmSinceLastCharge: Dispatch<SetStateAction<number>>;
  setPrevTrips: Dispatch<SetStateAction<Trip[]>>
  PrevTrips: Trip[];
  setShowBatteryPopUp:Dispatch<SetStateAction<boolean>>;
  setPage:Dispatch<SetStateAction<TypePage>>;
}){
    const [ShowPupUp, setShowPupUp] = useState<boolean>(false) 
    return(
        <>
            <nav className="h-18 bg-main w-full fixed bottom-0 z-10 flex items-center justify-around px-4 p-2 z-200">
                <button className="text-main-light hover:text-main-dark" onClick={()=> {setShowBatteryPopUp(false); setShowPupUp(false); setPage("Main")}}><Home fill="currentColor"/></button>
                <button onClick={()=> setShowPupUp(true)} className="aspect-[1/1] rounded-[50%] bg-outstand h-full text-4xl flex items-center justify-center hover:bg-outstand-light transition-all duration-200" ><Add className="text-light" fill="currentColor"/></button>
                <button onClick={()=> setPage("Settings")}><Settings className="text-main-light hover:text-main-dark" fill="currentColor"/></button>
            </nav>
            <AddTrip KmStand={KmStand} SeasonNow={SeasonNow} Battery={Battery} setBattery={setBattery} setKmStand={setKmStand} AvrageKmThisSeason={AvrageKmThisSeason} KmSinceLastCharge={KmSinceLastCharge} setKmSinceLastCharge={setKmSinceLastCharge} setPrevTrips={setPrevTrips} PrevTrips={PrevTrips} ShowPupUp={ShowPupUp} setShowPupUp={setShowPupUp}/>
        </>
    )
}
export default Nav