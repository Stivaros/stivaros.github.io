<template>
  <main class="split-container">
    <section class="lg:w-3/5 flex justify-center items-center">
      <article>
        <h1 class="px-6 pt-8">Hello, I am Efstathios Stivaros</h1>
        <p class="px-6">A full-stack software engineer from London</p>

        <div class="btn-container">
          <nuxt-link :to="{ name: 'about' }" class="white-button-lg">
            About
          </nuxt-link>
          <nuxt-link :to="{ name: 'projects' }" class="white-button-lg">
            Projects
          </nuxt-link>
        </div>
      </article>
    </section>
    <aside class="right-panel">
      <img class="profile-img" src="~/assets/profile.jpg" alt="Two donkeys" />
    </aside>
  </main>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
@layer components {
  p.px-6 {
    @apply text-green-700 font-semibold text-2xl;
  }
}
.btn-container {
  @apply mt-4 flex flex-wrap flex-row gap-4 px-6;
}
.profile-img {
  height: 100%;
  width: 100%;
  object-fit: cover;
}
</style>
