import { CryptoType, BankType } from '@/types/currency'

export function getImageByName(name: string, items: CryptoType[] | BankType[]){
    if(!items.length){
        return ''
    }
    const res = items.find((i: CryptoType | BankType) => i.name === name)
    return res?.img
}