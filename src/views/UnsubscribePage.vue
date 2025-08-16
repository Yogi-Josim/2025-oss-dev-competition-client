<template>
  <div class="container">
    <div v-if="isLoading">
      <h2>처리 중입니다...</h2>
    </div>
    <div v-else>
      <h2 :class="{ 'error-message': isError }">{{ message }}</h2>
      <p v-if="!isError">이제 이 창을 닫으셔도 좋습니다.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const isLoading = ref(true);
const message = ref('');
const isError = ref(false);

onMounted(async () => {
  // 1. URL에서 토큰 가져오기
  const token = route.query.token;

  if (!token) {
    message.value = '유효하지 않은 접근입니다.';
    isError.value = true;
    isLoading.value = false;
    return;
  }

  try {
    // 2. 백엔드 DELETE API 호출
    const response = await fetch(`http://localhost:8080/api/subscriptions/unsubscribe?token=${token}`, {
      method: 'DELETE',
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || '서버에서 오류가 발생했습니다.');
    }
    
    // 3. 성공 메시지 설정
    message.value = data.message;
    isError.value = false;

  } catch (error) {
    console.error('Unsubscribe failed:', error);
    message.value = error.message || '구독 취소 중 문제가 발생했습니다.';
    isError.value = true;
  } finally {
    isLoading.value = false;
  }
});
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  text-align: center;
  background: #f8f9fa;
}

h2 {
  color: #2c3e50;
  margin-bottom: 1rem;
  font-size: 2rem;
}

p {
  color: #666;
  font-size: 1.1rem;
}

.error-message {
  color: #e74c3c;
}

.container > div {
  background: white;
  padding: 3rem;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  width: 90%;
}
</style>
