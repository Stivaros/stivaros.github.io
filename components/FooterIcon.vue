<template>
  <a :href="url" class="footer-icon">
    <svg
      class="h-8 w-8 text-green-900"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      stroke-width="2"
      stroke="currentColor"
      fill="none"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <slot></slot>
    </svg>
  </a>
</template>

<script>
export default {
  props: {
    url: {
      type: String,
      required: true,
    },
  },
}
</script>

<style lang="scss">
a.footer-icon {
  box-shadow: 0px -0.25rem 0px theme('colors.green.300') inset;
  @apply border-b-2 border-green-300 px-2 pb-1;
  @apply transition-all duration-200 ease-in;

  svg {
    @apply mt-4;
  }

  &:hover {
    box-shadow: 0px -40px 0px theme('colors.green.100') inset;
  }
}
</style>
