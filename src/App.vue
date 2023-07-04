<script lang="ts">
import Vue from 'vue';
import AppContent from '@/components/AppContent.vue';

export default Vue.extend({
  name: 'App',
  components: {
    AppContent,
  },
});
</script>

<template>
  <div
    id="app"
    class="app"
  >
    <AppContent/>
  </div>
</template>

<style lang="scss">
  @import "./assets/styles/app";
</style>
