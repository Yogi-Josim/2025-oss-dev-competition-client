// API 기본 설정 - 환경에 따라 자동으로 설정됨
export const API_BASE_URL = (() => {
  // 개발 환경에서는 localhost:8080 사용
  if (import.meta.env.DEV) {
    console.log('🚀 개발 환경: localhost:8080 사용');
    return 'http://localhost:8080';
  }
  // 프로덕션 환경에서는 pigeon.ddns.net 사용
  console.log('🌐 프로덕션 환경: https://pigeon.ddns.net 사용');
  return 'https://pigeon.ddns.net';
})();

// API 엔드포인트들
export const API_ENDPOINTS = {
  // 구독 관련
  SUBSCRIPTIONS: '/api/subscriptions',
  UNSUBSCRIBE: '/api/subscriptions/unsubscribe',
  
  // 지역 관련
  REGIONS: '/api/regions',
};

// API URL 생성 헬퍼 함수
export const createApiUrl = (endpoint, params = {}) => {
  const url = new URL(`${API_BASE_URL}${endpoint}`);
  
  // 쿼리 파라미터 추가
  Object.keys(params).forEach(key => {
    if (params[key] !== undefined && params[key] !== null) {
      url.searchParams.append(key, params[key]);
    }
  });
  
  return url.toString();
};

// API 요청 헬퍼 함수
export const apiRequest = async (endpoint, options = {}) => {
  const url = createApiUrl(endpoint, options.params);
  
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  };

  const response = await fetch(url, {
    ...defaultOptions,
    ...options,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: '서버에서 오류가 발생했습니다.' }));
    throw new Error(errorData.message || 'API 요청에 실패했습니다.');
  }

  return response.json();
};
