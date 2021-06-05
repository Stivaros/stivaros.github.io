<template>
  <nav
    class="nav top-0 shadow-sm h-auto w-full text-center mb-4 flex flex-row-reverse justify-between"
  >
    <button
      class="inline-block md:hidden w-8 h-8 text-green-700 p-1 m-1 rounded border border-green-700 focus:ring-2 focus:ring-green-300"
      @click="isOpen = !isOpen"
    >
      <svg
        fill="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          v-if="isOpen"
          d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"
        />
        <path
          v-if="!isOpen"
          fill-rule="evenodd"
          d="M24 6h-24v-4h24v4zm0 4h-24v4h24v-4zm0 8h-24v4h24v-4z"
          clip-rule="evenodd"
        ></path>
      </svg>
    </button>
    <div
      :class="isOpen ? 'block' : 'hidden'"
      class="flex flex-col md:flex-row leading-6 md:space-x-4 space-y-1 md:space-y-0 pl-1 py-1 md:py-3 md:px-0 md:block w-1/3 md:w-full"
    >
      <nuxt-link :to="{ name: 'index' }" class="nav-link">Home</nuxt-link>
      <nuxt-link :to="{ name: 'about' }" class="nav-link">About</nuxt-link>
      <nuxt-link :to="{ name: 'projects' }" class="nav-link">
        Projects
      </nuxt-link>
      <nuxt-link :to="{ name: 'contact' }" class="nav-link">Contact</nuxt-link>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      isOpen: false,
    }
  },
}
</script>

<style lang="scss" scoped>
@layer components {
  .nav-link {
    @apply bg-green-800 hover:bg-green-700 focus:ring-2 focus:ring-green-300 text-white px-4 py-1 rounded;
  }
}
</style>
