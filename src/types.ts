export type Season = "Vinter" | "Sommer" | "Høst" | "Vår"
export type Trip = {
    Season:Season
    Km:Number
    BatteryUsage:Number,
    KmStand: number
    Date: DateOwn
}
export type DateOwn = {
    Month: string
    Date: number
} 