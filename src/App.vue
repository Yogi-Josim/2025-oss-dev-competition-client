<template>
  <div id="app">
    <header class="header">
      <div class="header-content">
        <div class="logo">
          <h1>요기조심</h1>
        </div>
        <button class="subscribe-btn" @click="scrollToSignup">
          무료 구독하기
        </button>
      </div>
    </header>

    <router-view />

    <footer class="footer">
      <p>&copy; 2024 요기조심. 안전한 지역사회를 만들어갑니다.</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'App',
  methods: {
    scrollToSignup() {
      // Home 컴포넌트의 signupSection으로 스크롤
      const signupSection = document.querySelector('.signup-section');
      if (signupSection) {
        signupSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }
}
</script>

<style>
body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: #ffffff;
  min-height: 100vh;
  margin: 0;
  padding: 0;
}
</style>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.header {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  padding: 1rem 2rem;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}

.logo h1 {
  font-size: 2rem;
  color: #e74c3c;
  margin: 0;
  font-weight: 700;
}

.subscribe-btn {
  padding: 10px 20px;
  background: #28a745;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.subscribe-btn:hover {
  background: #218838;
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(40, 167, 69, 0.3);
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.footer {
  background: rgba(0, 0, 0, 0.8);
  color: white;
  text-align: center;
  padding: 1.5rem;
  margin-top: auto;
}

@media (max-width: 768px) {
  .header h1 {
    font-size: 1.5rem;
  }
  
  .subscribe-btn {
    padding: 8px 16px;
    font-size: 0.9rem;
  }
}
</style>
