<template>
    <div class="bg-gray-100 mt-2 rounded overflow-hidden">
        <ul>
            <li v-for="(item, index) in side.items" :key="index" class="p-2 flex items center transition-all hover:bg-gray-200 cursor-pointer relative" 
            :class="{ 'bg-gray-200' : side.selected === item.name }" @click="changeSelected(item.name)">
                <img :src="item.img" class="inline w-6 mr-2"> {{item.name}}
                <span v-if="side.selected === item.name" :class="chbx"></span>
            </li>
        </ul>
    </div>
</template>

<script lang="ts" setup>
import {ref} from 'vue'
import { SideType } from '@/types/currency'

const emit = defineEmits(['changeSelected'])

const chbx = ref('absolute right-3 top-3 mdi mdi-check bg-primary text-white h-4 w-4 flex justify-center items-center rounded-full text-xs')

interface Props {
  side: SideType
}
const props = defineProps<Props>()

function changeSelected(name: string){
    const payload = {
        type: props.side.type,
        name
    }
    emit('changeSelected', payload)
}
// import { defineComponent } from 'vue'

// export default defineComponent({
//     props: {
//         side: {
//             required: true,
//             type: Object
//         }
//     },
//     data(){
//         return {
//             chbx: 'absolute right-3 top-3 mdi mdi-check bg-primary text-white h-4 w-4 flex justify-center items-center rounded-full text-xs'
//         }
//     },
//     methods: {
//         changeSelected(name: string){
//             const payload = {
//                 type: this.side.type,
//                 name
//             }
//             this.$emit('changeSelected', payload)
//         }
//     }
// })
</script>