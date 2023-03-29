export default interface Briefcase {
    [currency: string]: {
        value: number,
        price: number
    }
}