<template>
  <div class="container">
    <GlobalNavigation />
    <Nuxt />
    <GlobalFooter />
  </div>
</template>

<script>
import GlobalNavigation from '@/components/GlobalNavigation'
import GlobalFooter from '@/components/GlobalFooter'

export default {
  components: {
    GlobalNavigation,
    GlobalFooter,
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
