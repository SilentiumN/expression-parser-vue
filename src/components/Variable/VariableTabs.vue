<script lang="ts" setup>
import type { Ref } from 'vue';
import { defineExpose, defineProps, ref } from 'vue';

export interface Props {
  tabsList: string[] | [];
}

const props = defineProps<Props>();

const currentTabIndex: Ref<number> = ref(0);

const updateCurrentTabIndex = (newIndex: number): void => {
  currentTabIndex.value = newIndex;
};

const getCurrentTabIndex = (): number => currentTabIndex.value;

defineExpose({
  getCurrentTabIndex,
  currentTabIndex,
});
</script>

<template>
  <div
    class="tabs-wrapper"
  >
    <div
      class="tabs-wrapper__navigation"
    >
      <button
        v-for="(tab, index) in props.tabsList"
        :key="index"
        :class="{
          'tabs-wrapper__select-tab-btn': true,
          'tabs-wrapper__select-tab-btn_active': currentTabIndex === index,
        }"
        :tabindex="0"
        class="tabs-wrapper__select-tab-btn"
        @click="updateCurrentTabIndex(index)"
      >
        {{ tab }}
      </button>
    </div>
    <div
      class="tabs-wrapper__title"
    >
      {{ props.tabsList[currentTabIndex] }}
    </div>
    <div
      v-for="(tab, index) in props.tabsList"
      v-show="(currentTabIndex === index)"
      :key="tab"
      class="tabs-wrapper__items"
    >
      <slot :name="`tab-${index}`"/>
    </div>
    <div
      class="tabs-wrapper__actions"
    >
      <slot name="actions"/>
    </div>
  </div>
</template>

<style lang="scss">
@import "../../assets/styles/variable/variable-tabs";
</style>
