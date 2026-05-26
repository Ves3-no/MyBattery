import { useEffect, useState } from 'react'
import './App.css'
import { type Dispatch, type SetStateAction } from "react";
import NavComp from './components/Nav'
import BatteryDisplay from './components/BatteryDisplay'
import SeasonDisplay from './components/SeasonDisplay'
import type { Season, Trip, DateOwn } from './types'
import InfoDisplay from './components/InfoDisplay'
import PrewData from './components/PrewData';
function App() {
  const [Battery, setBattery] = useState<number>(Number(localStorage.getItem("Battery")) ?? 0)
  const [KmStand, setKmStand] = useState<number>(Number(localStorage.getItem("KmStand")) ?? 0)
  const [SeasonNow, setSeasonNow] = useState<Season>(localStorage.getItem("SeasonNow") as Season ?? "Vinter")
  const [AvrageKmThisSeason, setAvrageKmThisSeason] = useState<number>(0)
  const [AvrageKmVinter, setAvrageKmVinter] = useState<number >(Number(localStorage.getItem("AvrageKmVinter")) ?? 0)
  const [AvrageKmVår, setAvrageKmVår] = useState<number>(Number(localStorage.getItem("AvrageKmVår")) ?? 0)
  const [AvrageKmSommer, setAvrageKmSommer] = useState<number >( Number(localStorage.getItem("AvrageKmSommer")) ?? 0)
  const [AvrageKmHøst, setAvrageKmHøst] = useState<number>(Number(localStorage.getItem("AvrageKmHøst")) ?? 0)
  const [AvrageKmList, setAvrageKmList] = useState<number[]>([])
  const [KmSinceLastCharge, setKmSinceLastCharge] = useState<number >(Number(localStorage.getItem("KmSinceLastCharge")) ?? 0)
  const [PrevTrips, setPrevTrips] = useState<Trip[]>(() => {
  try {
      return JSON.parse(localStorage.getItem("PrevTrips") ?? "[]") as Trip[];
    } catch {
      return [];
    }
  });
  const [CarName, setCarName] = useState<string>(localStorage.getItem("CarName") ?? "");
  const [DateOfLastCharge, setDateOfLastCharge] = useState<DateOwn>({Month: "", Date: 0}) 
  useEffect(()=>{
    const savedDate = localStorage.getItem("DateOfLastCharge");
    if (savedDate) {
      const parsedDate = JSON.parse(savedDate) as DateOwn;
      setDateOfLastCharge(parsedDate);
    }
  }, [])
  useEffect(()=>{
    setAvrageKmList([AvrageKmVinter, AvrageKmVår, AvrageKmSommer, AvrageKmHøst])
  }, [AvrageKmVinter, AvrageKmVår, AvrageKmSommer, AvrageKmHøst])
  useEffect(()=>{
    localStorage.setItem("CarName", CarName)
  }, [CarName])
  useEffect(()=>{
    localStorage.setItem("SeasonNow", SeasonNow)
  }, [SeasonNow])
  useEffect(()=>{
    localStorage.setItem("KmStand", String(KmStand))
  }, [KmStand])
  useEffect(()=>{
    localStorage.setItem("Battery", String(Battery))
  },[Battery])
  useEffect(()=>{
    localStorage.setItem("KmSinceLastCharge", String(KmSinceLastCharge))
  }, [KmSinceLastCharge])
  useEffect(()=>{
    if(SeasonNow == "Vinter"){
      setAvrageKmThisSeason(AvrageKmVinter)
    } else if(SeasonNow == "Vår"){
      setAvrageKmThisSeason(AvrageKmVår)
    } else if(SeasonNow == "Sommer"){
      setAvrageKmThisSeason(AvrageKmSommer)
    } else if(SeasonNow == "Høst"){
      setAvrageKmThisSeason(AvrageKmHøst)
    } 
  }, [SeasonNow, AvrageKmVinter, AvrageKmVår, AvrageKmSommer, AvrageKmHøst, PrevTrips])
  useEffect(()=>{
    CalcAvrage(setAvrageKmVinter,setAvrageKmVår,setAvrageKmSommer,setAvrageKmHøst,PrevTrips,SeasonNow)
  }, [AvrageKmVinter, AvrageKmVår, AvrageKmSommer, AvrageKmHøst, PrevTrips])
  return (
    <div className='flex flex-col bg-light w-full h-screen overflow-hidden justify-center items-center  '>
      <div className='aspect-[9/16] h-full max-h-screen max-w-full bg-background flex flex-col p-4 items-center gap-4 min-w-md pb-20 overflow-y-auto'  >
        <div >
          <input type="text" spellCheck={false} className='text-secondary text-4xl font-bold focus:outline-none p-2 w-full' placeholder='Name of you car' value={CarName} onChange={(e)=> setCarName(String((e.target as HTMLInputElement).value))}/>
        </div>
        <InfoDisplay KmStand={KmStand} KmSinceLastCharge={KmSinceLastCharge} DateOfLastCharge={DateOfLastCharge}/>
        <BatteryDisplay Battery={Battery} setBattery={setBattery} setKmSinceLastCharge={setKmSinceLastCharge} setDateOfLastCharge={setDateOfLastCharge}/>
        <SeasonDisplay SeasonNow={SeasonNow} setSeasonNow={setSeasonNow} AvrageKmList={AvrageKmList}/>
        <PrewData PrevTrips={PrevTrips}/>
        <NavComp KmStand={KmStand} SeasonNow={SeasonNow} Battery={Battery} setBattery={setBattery} setKmStand={setKmStand} AvrageKmThisSeason={AvrageKmThisSeason} KmSinceLastCharge={KmSinceLastCharge} setKmSinceLastCharge={setKmSinceLastCharge} setPrevTrips={setPrevTrips} PrevTrips={PrevTrips}/>
      </div>
    </div>
  )
}
function CalcAvrage(setAvrageKmVinter:Dispatch<SetStateAction<number>>, setAvrageKmVår:Dispatch<SetStateAction<number>>, setAvrageKmSommer:Dispatch<SetStateAction<number>>, setAvrageKmHøst:Dispatch<SetStateAction<number>>, PrevTrips:Trip[], SeasonNow:Season  ){
  if (SeasonNow === "Vinter"){
    const ListVinter = PrevTrips.filter(trip => trip.Season === "Vinter")
    calc(ListVinter, setAvrageKmVinter)
  } else if(SeasonNow == "Vår"){
    const ListVår = PrevTrips.filter(trip => trip.Season === "Vår")
    calc(ListVår, setAvrageKmVår)
  } else if(SeasonNow === "Sommer"){
    const ListSommer = PrevTrips.filter(trip => trip.Season === "Sommer")
    calc(ListSommer, setAvrageKmSommer)
  } else if(SeasonNow == "Høst"){
    const ListHøst = PrevTrips.filter(trip => trip.Season === "Høst")
    calc(ListHøst, setAvrageKmHøst)
  }
  function calc(List:Trip[], setAvrage:Dispatch<SetStateAction<number>>){
    let  TotalB = 0
    let  TotalK = 0
     for(let trip of List){
        TotalB += Number(trip.BatteryUsage)
        TotalK += Number(trip.Km)
     }
    let Avrage = (TotalK / TotalB) * 100
    if(Number.isNaN(Avrage)){
      Avrage = 0 
    }
    setAvrage(Avrage)
    let tekst = `AvrageKm${SeasonNow}`
    localStorage.setItem(tekst, String(Avrage))
  }
  
}

export default App
