<script lang="ts" setup>
import {
  defineProps, onMounted, ref, Ref,
} from 'vue';
import { ItemTable } from '@/types/TableTypes';

export interface Props {
  name: string;
  type: 'number' | 'text';
  value: ItemTable['value'];
  onChange: () => void;
  placeholder?: string;
}

const modelValue: Ref<ItemTable['value']> = ref(null);

const props = defineProps<Props>();

const setModelValue = () => {
  if (props.value) {
    modelValue.value = props.value;
    return;
  }

  switch (props.type) {
    case 'number':
      modelValue.value = 0;
      break;
    case 'text':
      modelValue.value = '';
      break;
    default:
      modelValue.value = null;
      break;
  }
};

onMounted(() => {
  setModelValue();
});
</script>

<template>
  <label :for="props.name">
    <input
      :id="props.name"
      :placeholder="props.placeholder || ''"
      :type="props.type"
      :value="props.value"
      class="table__input"
      @change="props.onChange"
    >
  </label>
</template>

<style scoped>

</style>
