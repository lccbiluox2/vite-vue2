<template>
  <svg :class="svgClass" aria-hidden="true">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  prefix?: string;
  name: string;
  className?: string;
}

const props = withDefaults(defineProps<Props>(), {
  prefix: 'icon',
  className: ''
});

const iconName = computed(() => `#${props.prefix}-${props.name}`);
const svgClass = computed(() => {
  if (props.className) {
    return `svg-icon ${props.className}`;
  }
  return 'svg-icon';
});
</script>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>