<template>
    <div class="md:flex justify-between relative">
        <Loader v-if="data.load" />
        <div class="w-full">
            <label class="text-xs text-gray-500">Я продаю</label>
            <div class="relative">
                <div class="absolute top-0 right-0 h-full w-10 flex justify-center items-center">
                        <img :src="getImageByName(data.sideSell.selected, data.sideSell.items)" class="w-6">
                    </div>
                <input type="text" placeholder="Продажа" class="w-full bg-gray-300 border-0 outline-none rounded" v-model="data.sideSell.val"
                @input="countCourseInput(data.sideSell, data.sideBuy)">
            </div>
            <CurrencyList :side="data.sideSell" @changeSelected="changeSelected($event, data.sideSell)" />
        </div>
        <div class="text-center pt-2 md:pt-7">
            <button class="h-8 w-8 bg-primary text-white rounded-full mx-2" @click="exchangeSides">
                            <span class="mdi mdi-swap-horizontal"></span>
                        </button>
        </div>
        <div class="w-full">
            <label class="text-xs text-gray-500">Я покупаю</label>
            <div class="relative">
                <div class="absolute top-0 right-0 h-full w-10 flex justify-center items-center">
                    <img :src="getImageByName(data.sideBuy.selected, data.sideBuy.items)" class="w-6">
                </div>
                <input type="text" placeholder="Покупка" class="w-full bg-gray-300 border-0 outline-none rounded" v-model="data.sideBuy.val" 
                @input="countCourseInput(data.sideBuy, data.sideSell)">
            </div>
            <CurrencyList :side="data.sideBuy" @changeSelected="changeSelected($event, data.sideBuy)" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { reactive, watch } from 'vue'
import { SideType } from '@/types/currency'
import { stringWithFloatNumber } from "@/helpers/txtWorkshop"
import { useCryptoStore } from '@/stores/crypto'
import { getImageByName } from '@/helpers/image.ts'

import Loader from '@/components/Loader.vue'
import CurrencyList from '@/components/CurrencyList.vue'

const currencies = useCryptoStore().currencies
const cryptoStore = useCryptoStore()
const data = reactive({
    load: false,
    course: '',
    sideSell: {
        selected: 'Сбербанк', 
        val: '',
        items: [],
        type: 'bank'
    } as SideType,
    sideBuy: {
        selected: 'USDT', 
        val: '',
        items: [],
        type: 'crypto'
    } as SideType
})


// watch
watch(() => useCryptoStore().currencies, () => {
    setSides()
  },
  { deep: true }
)

// methods
function setSides(){
    data.load = true
    data.sideBuy.items = currencies
    data.sideSell.items = cryptoStore.banks
    useCryptoStore().LOAD_COURSE(data.sideBuy.selected).then((res) => {
        data.course = res.asks[0].price
        data.load = false
    })
}

const countCourseInput = (from: SideType, to: SideType) => {
    from.val = stringWithFloatNumber(from.val)
    if(from.val == ''){
        refreshFields()
        return
    }
    const course = parseFloat(data.course)
    const amount = parseFloat(from.val)
    if(from.type === 'crypto'){
        to.val = (amount * course).toFixed(2)
    }else{
        to.val = (amount / course).toFixed(7)
    }
}

function changeSelected(payload: {type: string, name: string}, side: SideType){
    side.selected = payload.name
    if(payload.type === 'crypto'){
        data.course = '*****'
        data.load = true
        useCryptoStore().LOAD_COURSE(payload.name).then((res) => {
            data.course = res.asks[0].price
            data.load = false
            countCourseInput(data.sideSell, data.sideBuy)
        })
    }
}

function refreshFields(){
    data.sideSell.val = ''
    data.sideBuy.val = ''
}

function exchangeSides(){
    const nv = {...data.sideSell}
    data.sideSell = data.sideBuy
    data.sideBuy = nv
}
</script>