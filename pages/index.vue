<template>
  <main class="homepage-container">
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
    <aside
      class="lg:w-2/5 bg-green-200 border-t-8 lg:border-t-0 lg:border-l-8 border-green-700"
    >
      <img class="profile-img" src="~/assets/profile.jpg" alt="Two donkeys" />
    </aside>
  </main>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
@layer components {
  .homepage-container {
    @apply flex flex-col lg:flex-row gap-8 h-screen;
  }

  p.px-6 {
    @apply text-green-700 font-semibold text-2xl;
  }
}
.btn-container {
  @apply mt-4 flex flex-col md:flex-row gap-4 px-6;
}
.profile-img {
  height: 100%;
  width: 100%;
  object-fit: cover;
}
</style>
