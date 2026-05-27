import Speed from "../assets/speed_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg?react"
import BatteryL from "../assets/battery_android_frame_bolt_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg?react"
function InfoDisplay({KmStand, KmSinceLastCharge, DateOfLastCharge}:{KmStand:number, KmSinceLastCharge:number, DateOfLastCharge:Date}){
    return(
        <>
            <div className="flex flex-row bg-light w-full items-start rounded-2xl p-7 border-main-light border">
                <div className="flex-col flex gap-2 flex-1">
                    <p className="text-main text-xs flex items-center gap-1"><Speed fill="currentColor "/>Km-Stand</p>
                    <h3 className="text-main text-xs"><span className="text-black font-bold text-3xl">{Math.round(KmStand)}</span> Km</h3>
                </div>
                <div className="flex-col flex gap-2 flex-1">
                    <p className="text-main text-xs flex items-center gap-1"><BatteryL fill="currentColor "/>Siden lading</p>
                    <h3 className="text-main text-xs"><span className="text-black font-bold text-3xl">{Math.round(KmSinceLastCharge)}</span> Km</h3>
                    <p className="text-xs text-main translate-y-[-5px]">{DateOfLastCharge.getDate()}. {DateOfLastCharge.toLocaleDateString('no-NO', { month: 'long' })}</p>
                </div>
            </div>
        </>
    )
}
export default InfoDisplay