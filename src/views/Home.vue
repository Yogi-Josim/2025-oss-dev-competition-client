<template>
  <main class="main-content">
    <HeroSection />
    <ProcessSection />
    <SignupSection ref="signupSection" />
    <SubscribersSection />
  </main>
</template>

<script>
import HeroSection from '../components/HeroSection.vue'
import ProcessSection from '../components/ProcessSection.vue'
import SignupSection from '../components/SignupSection.vue'
import SubscribersSection from '../components/SubscribersSection.vue'

export default {
  name: 'Home',
  components: {
    HeroSection,
    ProcessSection,
    SignupSection,
    SubscribersSection
  },
  methods: {
    scrollToSignup() {
      this.$refs.signupSection.$el.scrollIntoView({ behavior: 'smooth' })
    }
  }
}
</script>

<style scoped>
.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}
</style>
