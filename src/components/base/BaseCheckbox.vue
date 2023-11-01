<template>
  <input
    type="checkbox"
    class="base-checkbox"
    :id="props.id"
    v-model="value"
    v-bind="$attrs"
    :indeterminate="value === null"
  />
  <label :for="props.id" :class="{ 'sr-only': showLabel === false }">
    {{ label }}
  </label>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  modelValue: boolean | null;
  id: string;
  label: string;
  showLabel: boolean;
}>();

// any needed to fix issue with circular type reference
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const emit: any = defineEmits<{
  'update:modelValue': [modelValue: boolean | null];
}>();

const value = computed({
  get() {
    const getValue = props.modelValue === null ? null : Boolean(props.modelValue);
    return getValue;
  },
  set(value) {
    const setValue = value === null ? null : Boolean(value);
    emit('update:modelValue', setValue);
  }
});
</script>

<style scoped lang="scss">
.base-checkbox {
  accent-color: $input-select-color;
  width: 1rem;
  height: 1rem;
}

// Make indeterminate checkbox styles match checked styles
.base-checkbox:indeterminate::before {
  display: block;
  content: '';
  background-color: $input-select-color;
  background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" style="fill: rgba(255, 255, 255, 1);transform: ;msFilter:;"><path d="M5 11h14v3H5z"></path></svg>');
  background-repeat: no-repeat;
  background-position: center;
  border-radius: 2px;
  width: 1rem;
  height: 1rem;
}
</style>
