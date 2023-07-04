<script lang="ts" setup>
import { defineProps } from 'vue';
import VariableSelectInput from '@/components/UI/SelectInput.vue';
import { OptionSelect } from '@/types/TableTypes';

export interface Props {
  options: OptionSelect[];
  default: string | boolean | undefined;
  unselectedText: string;
  onInput: () => void;
}

const props = defineProps<Props>();

console.log(props, 'props');
</script>

<template>
  <VariableSelectInput
    :default="props.default"
    :options="props.options"
    :unselectedText="props.unselectedText"
    @input="props.onInput"
  />
</template>

<style scoped>

</style>
