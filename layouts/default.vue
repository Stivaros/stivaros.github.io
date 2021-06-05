<template>
  <div class="container">
    <GlobalNavigation />
    <Nuxt />
  </div>
</template>

<script>
import GlobalNavigation from '@/components/GlobalNavigation'

export default {
  components: {
    GlobalNavigation,
  },
}
</script>

<style lang="scss" scoped>
@layer components {
  .container {
    @apply mx-auto max-w-none min-h-screen;
  }
}
</style>
