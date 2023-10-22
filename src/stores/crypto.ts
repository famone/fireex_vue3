import { defineStore } from 'pinia'
import axios from 'axios'
import router from '@/router'
import { CryptoType, BankType } from '@/types/currency'


interface GoodsState {
    market: string
    active_course: string
    availableCrypto: string[]
    currencies: CryptoType[]
    banks: BankType[]
}

export const useCryptoStore = defineStore('crypto', {
    state: (): GoodsState => ({
        market: '',
        active_course: '',
        availableCrypto: ['USDT','USDC','BTC','ETH','DAI'],
        currencies: [],
        banks: [
            {
                name: 'Сбербанк',
                img: 'https://konvert.im/public/paysi/8.svg'
            },
            {
                name: 'Тинькофф',
                img: 'https://konvert.im/public/paysi/7.svg'
            },
            {
                name: 'Райффайзен',
                img: 'https://metka.cc/media/pslogo/raiffeisenbank_Z4h3XF5.svg'
            }
        ],
    }),
    getters: {
        // getSingleGood: (state) => (id: string) => {
        //     return state.goods.find(i  => i.slug === id)
        // },
        // getTotal(state){
        //     const lang = useLangStore().lang
        //     let total = 0
        //     if(!state.cart.length) return 0
        //     state.cart.forEach((item) => {
        //         if(item.price !== null){
        //             const answer = item.price[lang as keyof typeof item.price];
        //             total += answer * item.quantity
        //         }
        //     })
        //     return total
        // }
    },
    actions: {
        async LOAD_COURSE(market: string){
            this.market = market
            const market_url = `${market.toLowerCase()}rub`
            try{
                const { data } = await axios.get(`https://garantex.org/api/v2/depth?market=${market_url}`)
                this.active_course = data.asks[0].price
                return data
            } catch {
                router.replace('/404')
            }
        },
        async LOAD_CURRENCIES(){
            try{
                const { data } = await axios.get(`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${this.availableCrypto.join()}&tsyms=RUB`)
                const names = Object.keys(data.DISPLAY) as string[]
                names.forEach((item: string) => {
                    const changedItem = {
                        // ...data.DISPLAY[item].RUB,
                        name: item,
                        img: `https://cryptocompare.com/${data.DISPLAY[item].RUB.IMAGEURL}`,
                        slug: item.toLowerCase()
                    }
                    this.currencies.push(changedItem as CryptoType)
                })
            } catch {
                router.replace('/404')
            }
        }
    }
})

// enum Network {
//   mainnet = "mainnet",
//   testnet = "testnet",
//   regtest = "regtest"
// }
// import { validate } from 'bitcoin-address-validation';

// console.log(validate('0x8346d1830580a873ad629b62d7fbb8de40965d5a3599a12feb775d08695904c4', Network.regtest))
// let txt = 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t'
// let txt2 = '0xc0e427c9eede3958e2423a02d2a024c22a58d51e'
// let txt3 = '0xc0e427c9eede3958e2423a02d2a024c22a58d51e'
// const TRC = new RegExp("T[A-Za-z1-9]{33}")
// const ERC = new RegExp("0x[a-fA-F0-9]{40}")
// const BTC = new RegExp("^(bc1|[13])[a-km-zA-HJ-NP-Z1-9]{25,34}$")
// console.log(BTC.test(txt3))