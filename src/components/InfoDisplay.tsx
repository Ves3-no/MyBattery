import { type DateOwn } from "../types"
function InfoDisplay({KmStand, KmSinceLastCharge, DateOfLastCharge}:{KmStand:number, KmSinceLastCharge:number, DateOfLastCharge:DateOwn}){
    return(
        <>
            <div className="flex flex-row bg-light w-full items-start rounded-2xl p-7 border-main-light border">
                <div className="flex-col flex gap-2 flex-1">
                    <p className="text-main text-xs">Km-Stand</p>
                    <h3 className="text-main text-xs"><span className="text-black font-bold text-3xl">{KmStand}</span> Km</h3>
                </div>
                <div className="flex-col flex gap-2 flex-1">
                    <p className="text-main text-xs">Siden lading</p>
                    <h3 className="text-main text-xs"><span className="text-black font-bold text-3xl">{KmSinceLastCharge}</span> Km</h3>
                    <p className="text-xs text-main translate-y-[-5px]">{DateOfLastCharge.Date}. {DateOfLastCharge.Month}</p>
                </div>
            </div>
        </>
    )
}
export default InfoDisplay