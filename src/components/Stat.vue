<template>
    <div class="flex gap-2">
        <p class="text-end bg-green-500 text-gray-700 font-medium text-sm mb-4 w-fit px-2 py-2 rounded-sm">
            💰 1 {{cryptoStore.market}} = {{cryptoStore.active_course + ' RUB'}}
        </p>

         <p class="text-end bg-gray-200 text-gray-700 font-medium text-sm mb-4 w-fit px-2 py-2 rounded-sm">
            ⏱️ Работаем 24/7
         </p>
    </div>
</template>

<script lang="ts" setup>
import { useCryptoStore } from '@/stores/crypto'

const cryptoStore = useCryptoStore()
</script>