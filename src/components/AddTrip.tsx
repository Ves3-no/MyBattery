import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { type Trip, type Season, type DateOwn} from '../types'


function AddTrip({KmStand, SeasonNow, Battery, setBattery, setKmStand, AvrageKmThisSeason, KmSinceLastCharge, setKmSinceLastCharge, setPrevTrips, PrevTrips, ShowPupUp, setShowPupUp}: {
  KmStand: number;
  SeasonNow: Season;
  Battery: number;
  setBattery: Dispatch<SetStateAction<number>>;
  setKmStand: Dispatch<SetStateAction<number>>;
  AvrageKmThisSeason: number;
  KmSinceLastCharge: number;
  setKmSinceLastCharge: Dispatch<SetStateAction<number>>;
  setPrevTrips: Dispatch<SetStateAction<Trip[]>>
  PrevTrips: Trip[]
  ShowPupUp: boolean
  setShowPupUp: Dispatch<SetStateAction<boolean>>
}) {
    
    const [UserInputKmBefore, setUserInputKmBefore] = useState<number>(0)
    const [UserInputLenghtDriven, setUserInputLenghtDriven] = useState<number>(0)
    const [UserInputBatteryBefore, setUserInputBatteryBefore] = useState<number>(0)
    const [UserInputBatteryNow, setUserInputBatteryNow] = useState<number>(0)
    const [UserInputBatteryNowIsChanged, setUserInputBatteryNowIsChanged] = useState<boolean>(false)
    const [UserInputLenghtDrivenChanged, setUserInputLenghtDrivenChanged] = useState<boolean>(false)
    useEffect(()=>{
        if(KmStand){
            setUserInputKmBefore(KmStand)
        }
        if(Battery){
            setUserInputBatteryBefore(Battery)
        }
    },[ShowPupUp])
    useEffect(()=>{
        if((AvrageKmThisSeason && UserInputBatteryNowIsChanged === false)){
            if(UserInputBatteryBefore !== 0 && UserInputLenghtDriven !== 0){
                setUserInputBatteryNow(UserInputBatteryBefore - ((UserInputLenghtDriven / AvrageKmThisSeason)*100))
            }
        }
        if(Number.isNaN(UserInputLenghtDriven)){
            setUserInputLenghtDriven(0)
        }
        if(UserInputLenghtDriven === 0){
            setUserInputLenghtDrivenChanged(false)
        } 
    },[UserInputLenghtDriven ])
    useEffect(()=>{
        if(AvrageKmThisSeason && UserInputLenghtDrivenChanged === false){
        setUserInputLenghtDriven(((UserInputBatteryBefore - UserInputBatteryNow) / 100) * AvrageKmThisSeason)
        }
        if(Number.isNaN(UserInputBatteryNow)){
            setUserInputBatteryNow(0)
        }
        if(UserInputBatteryNow === 0){
            setUserInputBatteryNowIsChanged(false)
        } 
    },[UserInputBatteryNow])
    return(
        <>
            <div style={{display: ShowPupUp ? "flex" : "none"}} className="absolute bg-gray-800/50 w-full h-full top-0 items-center justify-center">
                <form onSubmit={(e)=> {e.preventDefault() ;setShowPupUp(false); logTrip( SeasonNow, setBattery, setKmStand, KmSinceLastCharge, setKmSinceLastCharge, setPrevTrips, PrevTrips, UserInputLenghtDriven, UserInputBatteryBefore, UserInputBatteryNow, KmStand)}} className="bg-light border-main p-6 border-main rounded-xl flex-col flex w-[70%] border-2 gap-4 "> 
                    <label htmlFor="KmBefore" className="text-lg text-main">Din Km-Stand før turen</label>
                    <div className="flex inline-flex p-2 border border-secondary rounded-xl text-dark">
                        <input className="active:outline-none focus:outline-none w-full" type="number" id="KmBefore" onChange={(e)=> setUserInputKmBefore(Number((e.target as HTMLInputElement).value))} value={UserInputKmBefore} />
                        <span>Km</span>
                    </div>
                    <label htmlFor="KmNow" className="text-lg text-main">Din Km-Stand Nå</label>
                    <div className="flex inline-flex p-2 border border-secondary rounded-xl text-dark">
                        <input className="active:outline-none focus:outline-none w-full" type="number" id="KmNow" placeholder={String(KmStand)} onChange={(e)=> setUserInputLenghtDriven(Number((e.target as HTMLInputElement).value) - UserInputKmBefore)} value={(UserInputLenghtDriven + UserInputKmBefore)} required onKeyUp={()=> setUserInputLenghtDrivenChanged(true)}/>
                        <span>Km</span>
                    </div>          
                    <label htmlFor="LenghtDriven" className="text-lg text-main">Lengden du har kjørt:</label>
                    <div className="flex inline-flex p-2 border border-secondary rounded-xl text-dark">
                        <input className="active:outline-none focus:outline-none w-full" type="number" id="LenghtDriven" onChange={(e)=> setUserInputLenghtDriven(Number((e.target as HTMLInputElement).value))} value={UserInputLenghtDriven} required onKeyUp={()=> setUserInputLenghtDrivenChanged(true)}/>
                        <span >Km</span>
                    </div>
                    <label htmlFor="BatteryBefore" className="text-lg text-main">Batteri prosent før turen:</label>
                    <div className="flex inline-flex p-2 border border-secondary rounded-xl text-dark">
                        <input className="active:outline-none focus:outline-none w-full" type="number" placeholder={String(Battery)} id="BatteryBefore" onChange={(e)=> setUserInputBatteryBefore(Number((e.target as HTMLInputElement).value))} value={UserInputBatteryBefore} required/>
                        <span>%</span>
                    </div>
                    <label htmlFor="BatteryNow" className="text-lg text-main">Batteri prosent nå:</label>
                    <div className="flex inline-flex p-2 border border-secondary rounded-xl text-dark">
                        <input className="active:outline-none focus:outline-none w-full" type="number" placeholder={Battery ? "0" : String(Battery)} id="BatteryNow" onChange={(e)=> setUserInputBatteryNow(Number((e.target as HTMLInputElement).value))} value={UserInputBatteryNow} required onKeyUp={()=> setUserInputBatteryNowIsChanged(true)}/>
                        <span>%</span>
                    </div>
                    <input type="submit" value="Logg" className="bg-outstand mx-auto block w-[70%] p-3 rounded-xl hover:bg-outstand-light transition-all duration-400 text-light mt-2 cursor-pointer"/>
                </form>
            </div>
        </>
    )
}
function logTrip(SeasonNow: Season,setBattery: Dispatch<SetStateAction<number>>,setKmStand: Dispatch<SetStateAction<number>>,KmSinceLastCharge: number,setKmSinceLastCharge: Dispatch<SetStateAction<number>>,setPrevTrips: Dispatch<SetStateAction<Trip[]>>,PrevTrips: Trip[], UserInputLenghtDriven:number, UserInputBatteryBefore:number, UserInputBatteryNow:number, KmStand:number){
    const datenow = new Date()
    const MonthName = datenow.toLocaleString('no-NO', { month: 'long' }); 
    const date = {
            Month: MonthName,
            Date: datenow.getDate()
        } as DateOwn
    const thisTrip:Trip = {
            Season: SeasonNow,
            Km: UserInputLenghtDriven,
            BatteryUsage: UserInputBatteryBefore - UserInputBatteryNow,
            KmStand: (KmStand + UserInputLenghtDriven),
            Date: date
    }
    setBattery(UserInputBatteryNow)
    setKmStand((KmStand + UserInputLenghtDriven))
    setKmSinceLastCharge(KmSinceLastCharge + UserInputLenghtDriven)
    const Trips = [...PrevTrips, thisTrip];
    setPrevTrips(Trips);
    localStorage.setItem("PrevTrips", JSON.stringify(Trips))
}
export default AddTrip