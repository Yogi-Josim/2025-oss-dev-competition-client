<template>
  <section class="hero-section">
    <div class="container">
      <div class="hero-content">
        <h2>🚨 요기조심으로 안전한 지역사회를 만들어가요</h2>
        <p class="hero-description">
          주변 위험 상황을 실시간으로 감지하고 알려드리는 서비스입니다.<br>
          이메일로 매일/주간 레포트를 받아보세요.
        </p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'HeroSection'
}
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.hero-section {
  background: #e3f2fd;
  padding: 5rem 0;
  text-align: center;
  margin-bottom: 0;
}

.hero-content h2 {
  font-size: 3.5rem;
  color: #2c3e50;
  margin-bottom: 1rem;
  font-weight: 700;
}

.hero-description {
  font-size: 1.3rem;
  color: #666;
  line-height: 1.8;
  margin-bottom: 0;
}

@media (max-width: 768px) {
  .hero-content h2 {
    font-size: 2.5rem;
  }
  
  .hero-description {
    font-size: 1.1rem;
  }
}
</style>
