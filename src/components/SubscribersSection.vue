<template>
  <section class="subscribers-section">
    <div class="container">
      <div class="subscribers-content">
        <h3>지금까지 <span class="highlight">11,847명</span>의 이용자가<br>요기조심을 구독했어요!</h3>
        <p class="subscribers-description">
          매일 쌓이는 안전 정보가 분명 여러분의 안전한 생활 발판이 될 거예요
        </p>
        <div class="stats-grid">
          <div class="stat-item">
            <div class="stat-number">11,847</div>
            <div class="stat-label">총 구독자</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">156</div>
            <div class="stat-label">지역 커버</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">24/7</div>
            <div class="stat-label">실시간 모니터링</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'SubscribersSection'
}
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.subscribers-section {
  padding: 5rem 0;
  background: #e0f2f1;
}

.subscribers-content {
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
}

.subscribers-content h3 {
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 1rem;
  font-weight: 600;
}

.subscribers-description {
  font-size: 1.1rem;
  color: #666;
  margin-bottom: 3rem;
  line-height: 1.6;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 2rem;
  justify-items: center;
}

.stat-item {
  text-align: center;
}

.stat-number {
  font-size: 3.5rem;
  color: #e74c3c;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 1.1rem;
  color: #666;
  font-weight: 500;
}

.highlight {
  color: #e74c3c;
  font-weight: 700;
}

@media (max-width: 768px) {
  .subscribers-content h3 {
    font-size: 2rem;
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}
</style>
