<script lang="ts" setup>
import type { Ref } from 'vue';
import { defineEmits, defineProps, ref } from 'vue';
import { OptionSelect } from '@/types/TableTypes';

export interface Props {
  options: OptionSelect[];
  default?: string | boolean | undefined;
  unselectedText: string;
}

const props = defineProps<Props>();
console.log(props, 'props2');

const emit = defineEmits<{(e: 'input', selectedOption: OptionSelect): void,
}>();

const open: Ref<boolean> = ref(false);
const selected: Ref<OptionSelect | null> = ref(null);

const selectOption = (selectedOption: OptionSelect): void => {
  open.value = false;
  emit('input', selectedOption);
};

</script>

<template>
  <div
    :tabindex="0"
    class="custom-select"
    @blur="open = false"
  >
    <button
      :class="{
        open: open,
        unselected: !selected
      }"
      :tabindex="0"
      class="selected"
      @click="open = !open">
      {{
        selected?.title ||
        props.options.find(opt => opt.value === props.default).title ||
        unselectedText
      }}
    </button>
    <div :class="{ selectHide: !open }" class="items">
      <button
        v-for="option of props.options"
        :key="option.value"
        :tabindex="0"
        @click="selectOption(option)"
      >
        {{ option.title }}
      </button>
    </div>
  </div>
</template>

<style lang="scss">
@import "../../assets/styles/ui/select-input";
</style>
