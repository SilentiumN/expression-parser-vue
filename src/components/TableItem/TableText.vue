<script lang="ts" setup>
import { defineProps } from 'vue';

export interface Props {
  text: string;
}

const props = defineProps<Props>();
</script>

<template>
  <div
    v-text="props.text"
  />
</template>

<style scoped>

</style>
