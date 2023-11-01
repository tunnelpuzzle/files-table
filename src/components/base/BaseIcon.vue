<template>
  <Component
    :is="iconSvg"
    :aria-label="props.label"
    :aria-hidden="props.label === null ? true : null"
  />
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue';

const props = defineProps<{
  icon: string;
  label: string | null;
}>();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const iconGlob: Record<string, any> = import.meta.glob(`@/assets/icons/*.svg`);
const iconSvg = defineAsyncComponent(() => iconGlob[`/src/assets/icons/${props.icon}.svg`]());
</script>

<style lang="scss" scoped></style>
