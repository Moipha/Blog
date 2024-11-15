<script lang="ts" setup>
import { useRoute } from 'vue-router'
defineProps({
  id: String
})
const route = useRoute()
const { name } = route.query
</script>

<template>
  <div>{{ id }}</div>
  <div>{{ name }}</div>
</template>

<style lang="scss" scoped></style>
