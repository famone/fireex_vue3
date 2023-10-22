<template>
  <router-view></router-view>
</template>

<script setup lang="ts">
import { useCryptoStore } from '@/stores/crypto'

useCryptoStore().LOAD_CURRENCIES()

</script>
