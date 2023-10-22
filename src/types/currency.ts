export interface CryptoType {
    name: string,
    img: string,
    slug: string
}

export interface BankType {
    name: string,
    img: string,
}

export interface SideType {
    selected: string,
    val: string,
    items:  CryptoType[] | BankType[],
    type: 'bank' | 'crypto'
}