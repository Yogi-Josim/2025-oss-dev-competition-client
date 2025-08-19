<template>
  <div class="container">
    <div v-if="isLoading" class="card loading">
      <div class="spinner"></div>
      <h2>열심히 처리 중이에요... 🏃‍♀️</h2>
    </div>

    <div v-else class="card result">
      <template v-if="!isError">
        <div class="icon">🥹</div>
        <h2>구독이 취소되었어요</h2>
        <p>다음에 꼭 다시 만나요!</p>
      </template>
      <template v-else>
        <div class="icon">😭</div>
        <h2 class="error-message">{{ message }}</h2>
        <p>문제가 계속되면 관리자에게 문의해주세요.</p>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { API_ENDPOINTS, apiRequest } from '../api/apis.js';

const route = useRoute();
const isLoading = ref(true);
const message = ref("");
const isError = ref(false);

onMounted(async () => {
  const token = route.query.token;

  if (!token) {
    message.value = "유효하지 않은 접근이에요! 👀";
    isError.value = true;
    isLoading.value = false;
    return;
  }

  try {
    await apiRequest(API_ENDPOINTS.UNSUBSCRIBE, {
      method: "DELETE",
      params: { token },
    });

    isError.value = false;
  } catch (error) {
    console.error("Unsubscribe failed:", error);
    message.value = error.message || "구독 취소에 실패했어요... 힝 😥";
    isError.value = true;
  } finally {
    setTimeout(() => {
      isLoading.value = false;
    }, 1000);
  }
});
</script>

<style scoped>
/* --- 폰트 관련 코드 수정 --- */
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f3f0;
  /* 일반적인 시스템 폰트로 변경 */
  font-family: -apple-system, BlinkMacSystemFont, "Apple SD Gothic Neo",
    "Malgun Gothic", sans-serif;
  padding: 1rem;
}

.card {
  background: white;
  padding: 2.5rem 2rem;
  border-radius: 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  text-align: center;
  max-width: 450px;
  width: 100%;
  border: 2px solid #e9e9e9;
  animation: fadeIn 0.5s ease-in-out;
}

.icon {
  font-size: 4rem;
  line-height: 1;
  animation: bounce 0.8s infinite;
}

h2 {
  color: #3e3e3e;
  /* 폰트가 작아보일 수 있어 크기를 살짝 키움 */
  font-size: 1.8rem;
  margin: 1rem 0;
  font-weight: 600; /* 폰트 굵기 조정 */
}

p {
  color: #7d7d7d;
  font-size: 1.1rem;
}

.error-message {
  color: #ff6b6b;
}

/* --- 로딩 애니메이션 --- */
.loading h2 {
  font-size: 1.5rem;
}
.spinner {
  width: 40px;
  height: 40px;
  border: 5px solid #dcdcdc;
  border-top-color: #ff87ab;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1.5rem;
}

/* --- Keyframes 애니메이션 --- */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}
</style>
