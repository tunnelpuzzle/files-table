<template>
  <h3 class="files-table-selected">
    {{ displayText }}
  </h3>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  count: number;
}>();

const displayText = computed(() => {
  if (props.count > 0) {
    return `Selected ${props.count.toString()}`;
  } else {
    return 'None Selected';
  }
});
</script>

<style lang="scss" scoped>
.files-table-selected {
  margin: 0rem;
  width: 150px;
}
</style>
