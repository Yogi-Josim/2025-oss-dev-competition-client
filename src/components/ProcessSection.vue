<template>
  <section class="process-section">
    <div class="container">
      <h3>서비스 이용 방법</h3>
      <div class="process-cards">
        <div class="process-card">
          <div class="process-icon">📧</div>
          <h4>구독 신청</h4>
          <p>이메일과 관심 지역을 선택하여 서비스에 가입하세요</p>
        </div>
        <div class="process-card">
          <div class="process-icon">📊</div>
          <h4>레포트 수신</h4>
          <p>매일 또는 주간으로 주변 위험 상황 레포트를 받아보세요</p>
        </div>
        <div class="process-card">
          <div class="process-icon">🛡️</div>
          <h4>안전 정보 확인</h4>
          <p>실시간으로 업데이트되는 안전 정보로 예방에 활용하세요</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'ProcessSection'
}
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.process-section {
  padding: 5rem 0;
  background: #e8f5e8;
}

.process-section h3 {
  font-size: 2.5rem;
  color: #2c3e50;
  text-align: center;
  margin-bottom: 3rem;
  font-weight: 600;
}

.process-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  justify-items: center;
}

.process-card {
  background: #fff;
  border-radius: 15px;
  padding: 2.5rem 2rem;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  border: 1px solid #e9ecef;
}

.process-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
}

.process-icon {
  font-size: 4rem;
  color: #e74c3c;
  margin-bottom: 15px;
}

.process-card h4 {
  font-size: 1.8rem;
  color: #2c3e50;
  font-weight: 600;
  margin-bottom: 10px;
}

.process-card p {
  font-size: 1.1rem;
  color: #666;
  line-height: 1.6;
}

@media (max-width: 768px) {
  .process-section h3 {
    font-size: 2rem;
  }
  
  .process-cards {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}
</style>
