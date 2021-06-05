<template>
  <footer class="text-center flex flex-col items-center">
    <div class="icon-container">
      <FooterIcon url="https://twitter.com/eStivaros">
        <path stroke="none" d="M0 0h24v24H0z" />
        <path
          d="M22 4.01c-1 .49-1.98.689-3 .99-1.121-1.265-2.783-1.335-4.38-.737S11.977 6.323 12 8v1c-3.245.083-6.135-1.395-8-4 0 0-4.182 7.433 4 11-1.872 1.247-3.739 2.088-6 2 3.308 1.803 6.913 2.423 10.034 1.517 3.58-1.04 6.522-3.723 7.651-7.742a13.84 13.84 0 0 0 .497 -3.753C20.18 7.773 21.692 5.25 22 4.009z"
        />
      </FooterIcon>
      <FooterIcon url="https://blog.stivaros.com">
        <path d="M12 19l7-7 3 3-7 7-3-3z" />
        <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
        <path d="M2 2l7.586 7.586" />
        <circle cx="11" cy="11" r="2" />
      </FooterIcon>
      <FooterIcon url="https://www.linkedin.com/in/estivaros/">
        <path
          d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"
        />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </FooterIcon>
      <FooterIcon url="https://github.com/stivaros">
        <path
          d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"
        />
      </FooterIcon>
      <FooterIcon url="https://ntscreative.co.uk">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </FooterIcon>
    </div>
    <p class="mb-4">&copy; Efstathios Stivaros 2021</p>
  </footer>
</template>

<script>
import FooterIcon from '@/components/FooterIcon'

export default {
  components: {
    FooterIcon,
  },
}
</script>

<style lang="scss">
.icon-container {
  @apply flex items-center gap-4;
}

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
