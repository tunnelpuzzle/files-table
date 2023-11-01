<template>
  <button type="button" class="base-button">
    <slot></slot>
  </button>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.base-button {
  background-color: $background-color;
  border: none;
  font-size: 1rem;
  padding: 0.5rem;
  border-radius: 0.25rem;
  cursor: pointer;

  &:hover {
    background-color: $hover-color;
  }
}
</style>
