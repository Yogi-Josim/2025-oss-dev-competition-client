<template>
  <section class="signup-section">
    <div class="container">
      <div class="signup-container">
        <h2>서비스 가입하기</h2>
        <p class="description">
          이메일을 입력하고 구독할 지역을 선택하여 주변 위험 상황을 실시간으로 받아보세요.
        </p>

        <form @submit.prevent="handleSubmit" class="signup-form">
          <!-- 이메일 입력 -->
          <div class="form-group">
            <label for="email">이메일 주소</label>
            <input
              type="email"
              id="email"
              v-model="formData.email"
              placeholder="example@email.com"
              required
              class="form-input"
            />
          </div>

          <!-- 관심 구독 구역 선택 -->
          <div class="form-group">
            <div class="region-header">
              <label>관심 구독 구역 선택</label>
              <button 
                type="button" 
                @click="addSelectedRegion" 
                class="add-region-btn"
                :disabled="!isRegionSelectionValid"
              >
                + 구역 추가
              </button>
            </div>
            <div class="region-selection">
              <!-- 시/도 선택 -->
              <select 
                v-model="formData.selectedProvince" 
                @change="onProvinceChange"
                class="region-dropdown province-dropdown"
              >
                <option value="">시/도를 선택하세요</option>
                <option 
                  v-for="region in availableRegions" 
                  :key="region.id" 
                  :value="region.id"
                >
                  {{ region.name }}
                </option>
              </select>
              
              <!-- 시/군/구 선택 -->
              <select 
                v-model="formData.selectedDistrict" 
                @change="onDistrictChange"
                class="region-dropdown district-dropdown"
                :disabled="!formData.selectedProvince"
              >
                <option value="">시/군/구를 선택하세요</option>
                <option 
                  v-for="district in getAvailableDistricts()" 
                  :key="district.id" 
                  :value="district.id"
                >
                  {{ district.name }}
                </option>
              </select>
            </div>
            
            <!-- 선택된 지역 표시 -->
            <div class="selected-region-display" v-if="getSelectedRegionText()">
              <h4>현재 선택된 구역:</h4>
              <div class="selected-region-tag">
                {{ getSelectedRegionText() }}
              </div>
            </div>
            
            <!-- 선택된 모든 지역들 표시 -->
            <div class="all-selected-regions" v-if="formData.selectedRegions.length > 0">
              <h4>선택한 구역:</h4>
              <div class="selected-regions-list">
                <span 
                  v-for="(region, index) in formData.selectedRegions" 
                  :key="index"
                  class="selected-region-tag"
                >
                  {{ region.text }}
                  <button 
                    @click="removeRegion(index)" 
                    class="remove-region-btn"
                    type="button"
                  >
                    ×
                  </button>
                </span>
              </div>
            </div>
          </div>

          <!-- 레포트 수신 주기 -->
          <div class="form-group">
            <div class="report-header">
              <label>레포트 수신 주기</label>
              <div class="help-container">
                <button 
                  type="button" 
                  class="help-btn"
                >
                  ?
                </button>
                <div class="help-tooltip">
                  <div class="tooltip-content">
                    <p><strong>매일 받기:</strong> 매일 오전 8시에 전날 있었던 사건/사고 레포트를 제공합니다.</p>
                    <p><strong>주간 받기:</strong> 매주 월요일 오전 8시에 저번주에 있었던 사건/사고 레포트를 제공합니다.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="report-options">
              <label class="radio-option">
                <input
                  type="radio"
                  v-model="formData.reportFrequency"
                  value="daily"
                />
                <span class="radio-custom"></span>
                매일 받기
              </label>
              <label class="radio-option">
                <input
                  type="radio"
                  v-model="formData.reportFrequency"
                  value="weekly"
                />
                <span class="radio-custom"></span>
                주간 받기
              </label>
            </div>
          </div>

          <!-- 가입 버튼 -->
          <button type="submit" class="submit-btn" :disabled="!isFormValid">
            🚀 서비스 가입하기
          </button>
        </form>

        <!-- 가입 완료 메시지 -->
        <div v-if="isSubmitted" class="success-message">
          <h3>🎉 가입이 완료되었습니다!</h3>
          <p>입력하신 이메일로 확인 메일을 발송했습니다.</p>
          <p>이제 주변 위험 상황을 실시간으로 받아보실 수 있습니다.</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'SignupSection',
  data() {
    return {
      formData: {
        email: '',
        selectedProvince: '',
        selectedDistrict: '',
        selectedRegions: [],
        reportFrequency: 'daily'
      },
      isSubmitted: false,
      availableRegions: [
        {
          id: 'seoul',
          name: '서울특별시',
          districts: [
            { id: 'seoul-gangnam', name: '강남구' },
            { id: 'seoul-gangdong', name: '강동구' },
            { id: 'seoul-gangbuk', name: '강북구' },
            { id: 'seoul-gangseo', name: '강서구' },
            { id: 'seoul-gwanak', name: '관악구' },
            { id: 'seoul-gwangjin', name: '광진구' },
            { id: 'seoul-guro', name: '구로구' },
            { id: 'seoul-nowon', name: '노원구' },
            { id: 'seoul-dobong', name: '도봉구' },
            { id: 'seoul-dongdaemun', name: '동대문구' },
            { id: 'seoul-dongjak', name: '동작구' },
            { id: 'seoul-mapo', name: '마포구' },
            { id: 'seoul-seodaemun', name: '서대문구' },
            { id: 'seoul-seocho', name: '서초구' },
            { id: 'seoul-seongbuk', name: '성북구' },
            { id: 'seoul-songpa', name: '송파구' },
            { id: 'seoul-yangcheon', name: '양천구' },
            { id: 'seoul-yeongdeungpo', name: '영등포구' },
            { id: 'seoul-yongsan', name: '용산구' },
            { id: 'seoul-eunpyeong', name: '은평구' },
            { id: 'seoul-jongno', name: '종로구' },
            { id: 'seoul-jung', name: '중구' },
            { id: 'seoul-jungnang', name: '중랑구' }
          ]
        },
        {
          id: 'gyeonggi',
          name: '경기도',
          districts: [
            { id: 'gyeonggi-suwon', name: '수원시' },
            { id: 'gyeonggi-seongnam', name: '성남시' },
            { id: 'gyeonggi-yongin', name: '용인시' },
            { id: 'gyeonggi-bucheon', name: '부천시' },
            { id: 'gyeonggi-ansan', name: '안산시' },
            { id: 'gyeonggi-anyang', name: '안양시' },
            { id: 'gyeonggi-pyeongtaek', name: '평택시' },
            { id: 'gyeonggi-siheung', name: '시흥시' },
            { id: 'gyeonggi-gwangmyeong', name: '광명시' },
            { id: 'gyeonggi-gwangju', name: '광주시' },
            { id: 'gyeonggi-hanam', name: '하남시' },
            { id: 'gyeonggi-uijeongbu', name: '의정부시' },
            { id: 'gyeonggi-goyang', name: '고양시' },
            { id: 'gyeonggi-namyangju', name: '남양주시' },
            { id: 'gyeonggi-osan', name: '오산시' },
            { id: 'gyeonggi-gunpo', name: '군포시' },
            { id: 'gyeonggi-uiwang', name: '의왕시' },
            { id: 'gyeonggi-hwaseong', name: '화성시' },
            { id: 'gyeonggi-paju', name: '파주시' },
            { id: 'gyeonggi-yangju', name: '양주시' },
            { id: 'gyeonggi-icheon', name: '이천시' },
            { id: 'gyeonggi-anseong', name: '안성시' },
            { id: 'gyeonggi-gimpo', name: '김포시' },
            { id: 'gyeonggi-yeoju', name: '여주시' }
          ]
        },
        {
          id: 'incheon',
          name: '인천광역시',
          districts: [
            { id: 'incheon-jung', name: '중구' },
            { id: 'incheon-dong', name: '동구' },
            { id: 'incheon-michuhol', name: '미추홀구' },
            { id: 'incheon-yeonpyeong', name: '연수구' },
            { id: 'incheon-namdong', name: '남동구' },
            { id: 'incheon-bupyeong', name: '부평구' },
            { id: 'incheon-gyeyang', name: '계양구' },
            { id: 'incheon-seo', name: '서구' },
            { id: 'incheon-ganghwa', name: '강화군' },
            { id: 'incheon-ongjin', name: '옹진군' }
          ]
        },
        {
          id: 'busan',
          name: '부산광역시',
          districts: [
            { id: 'busan-jung', name: '중구' },
            { id: 'busan-seo', name: '서구' },
            { id: 'busan-dong', name: '동구' },
            { id: 'busan-yeongdo', name: '영도구' },
            { id: 'busan-busanjin', name: '부산진구' },
            { id: 'busan-dongrae', name: '동래구' },
            { id: 'busan-nam', name: '남구' },
            { id: 'busan-buk', name: '북구' },
            { id: 'busan-haeundae', name: '해운대구' },
            { id: 'busan-saha', name: '사하구' },
            { id: 'busan-geumjeong', name: '금정구' },
            { id: 'busan-gangseo', name: '강서구' },
            { id: 'busan-yeongjong', name: '연제구' },
            { id: 'busan-suyeong', name: '수영구' },
            { id: 'busan-sasang', name: '사상구' },
            { id: 'busan-gijang', name: '기장군' }
          ]
        },
        {
          id: 'daegu',
          name: '대구광역시',
          districts: [
            { id: 'daegu-jung', name: '중구' },
            { id: 'daegu-dong', name: '동구' },
            { id: 'daegu-seo', name: '서구' },
            { id: 'daegu-nam', name: '남구' },
            { id: 'daegu-buk', name: '북구' },
            { id: 'daegu-suseong', name: '수성구' },
            { id: 'daegu-dalseo', name: '달서구' },
            { id: 'daegu-dalseong', name: '달성군' }
          ]
        },
        {
          id: 'daejeon',
          name: '대전광역시',
          districts: [
            { id: 'daejeon-dong', name: '동구' },
            { id: 'daejeon-jung', name: '중구' },
            { id: 'daejeon-seo', name: '서구' },
            { id: 'daejeon-yuseong', name: '유성구' },
            { id: 'daejeon-daedeok', name: '대덕구' }
          ]
        },
        {
          id: 'gwangju',
          name: '광주광역시',
          districts: [
            { id: 'gwangju-dong', name: '동구' },
            { id: 'gwangju-seo', name: '서구' },
            { id: 'gwangju-nam', name: '남구' },
            { id: 'gwangju-buk', name: '북구' },
            { id: 'gwangju-gwangseo', name: '광산구' }
          ]
        },
        {
          id: 'ulsan',
          name: '울산광역시',
          districts: [
            { id: 'ulsan-jung', name: '중구' },
            { id: 'ulsan-nam', name: '남구' },
            { id: 'ulsan-dong', name: '동구' },
            { id: 'ulsan-buk', name: '북구' },
            { id: 'ulsan-ulju', name: '울주군' }
          ]
        }
      ]
    }
  },
  computed: {
    isFormValid() {
      return this.formData.email && 
             this.formData.reportFrequency
    }
  },
  methods: {
    // 시/도 선택 시
    onProvinceChange() {
      this.formData.selectedDistrict = ''
    },
    
    // 시/군/구 선택 시
    onDistrictChange() {
      // 추가 로직이 필요하면 여기에
    },
    
    // 선택된 시/도에 해당하는 시/군/구 목록 가져오기
    getAvailableDistricts() {
      if (!this.formData.selectedProvince) return []
      const region = this.availableRegions.find(r => r.id === this.formData.selectedProvince)
      return region ? region.districts : []
    },
    
    // 현재 선택된 지역을 텍스트로 변환
    getSelectedRegionText() {
      if (!this.formData.selectedProvince) return ''
      
      const region = this.availableRegions.find(r => r.id === this.formData.selectedProvince)
      if (!region) return ''
      
      let text = region.name
      
      if (this.formData.selectedDistrict) {
        const district = region.districts.find(d => d.id === this.formData.selectedDistrict)
        if (district) {
          text += ` ${district.name}`
        }
      }
      
      return text
    },
    
    // 현재 선택된 지역이 유효한지 확인
    isRegionSelectionValid() {
      return this.formData.selectedProvince && this.formData.selectedDistrict
    },
    
    // 선택된 지역을 목록에 추가
    addSelectedRegion() {
      if (!this.isRegionSelectionValid()) return
      
      const regionText = this.getSelectedRegionText()
      const regionData = {
        province: this.formData.selectedProvince,
        district: this.formData.selectedDistrict,
        text: regionText
      }
      
      // 중복 체크
      const isDuplicate = this.formData.selectedRegions.some(r => 
        r.province === regionData.province && 
        r.district === regionData.district
      )
      
      if (!isDuplicate) {
        this.formData.selectedRegions.push(regionData)
        
        // 선택 초기화
        this.formData.selectedProvince = ''
        this.formData.selectedDistrict = ''
      }
    },
    
    // 선택된 지역 제거
    removeRegion(index) {
      this.formData.selectedRegions.splice(index, 1)
    },
    
    // 선택된 모든 지역 ID 가져오기 (폼 검증용)
    getAllSelectedRegionIds() {
      const ids = []
      
      this.formData.selectedRegions.forEach(region => {
        if (region.district) {
          ids.push(region.district)
        }
      })
      
      return ids
    },
    
    handleSubmit() {
      if (this.isFormValid) {
        // 여기에 실제 API 호출 로직을 추가할 수 있습니다
        console.log('가입 정보:', this.formData)
        console.log('선택된 지역 ID들:', this.getAllSelectedRegionIds())
        this.isSubmitted = true
        
        // 폼 초기화
        this.formData = {
          email: '',
          selectedProvince: '',
          selectedDistrict: '',
          selectedRegions: [],
          reportFrequency: 'daily'
        }
      }
    }
  }
}
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.signup-section {
  padding: 5rem 0;
  background: #e1f5fe;
}

.signup-container {
  background: white;
  border-radius: 20px;
  padding: 3rem;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  width: 100%;
  margin: 0 auto;
}

.signup-container h2 {
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 1rem;
  text-align: center;
}

.description {
  text-align: center;
  color: #666;
  margin-bottom: 3rem;
  font-size: 1.1rem;
  line-height: 1.6;
}

.form-group {
  margin-bottom: 2rem;
}

.form-group label {
  display: block;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 1rem;
  font-size: 1.1rem;
}

.form-input {
  width: 100%;
  padding: 1rem;
  border: 2px solid #e1e8ed;
  border-radius: 10px;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.form-input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.region-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.region-header label {
  font-size: 1.1rem;
  color: #2c3e50;
  font-weight: 600;
  margin-bottom: 0;
}

.region-selection {
  display: flex;
  gap: 15px;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 15px;
}

.region-dropdown {
  padding: 12px 15px;
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  font-size: 14px;
  background: white;
  color: #495057;
  cursor: pointer;
  min-width: 180px;
  transition: all 0.3s ease;
}

.region-dropdown:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.region-dropdown:disabled {
  background: #f8f9fa;
  color: #adb5bd;
  cursor: not-allowed;
}

.province-dropdown {
  border-color: #667eea;
  background: #f8f9ff;
}

.district-dropdown {
  border-color: #28a745;
  background: #f8fff9;
}

.add-region-btn {
  padding: 8px 16px;
  background: #28a745;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.add-region-btn:hover:not(:disabled) {
  background: #218838;
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(40, 167, 69, 0.3);
}

.add-region-btn:disabled {
  background: #6c757d;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.selected-region-display {
  margin-top: 20px;
  padding: 15px;
  background: #e8f5e8;
  border-radius: 8px;
  border: 1px solid #c3e6cb;
}

.selected-region-display h4 {
  margin-bottom: 10px;
  color: #155724;
  font-size: 14px;
  font-weight: 600;
}

.all-selected-regions {
  margin-top: 20px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 12px;
  border: 2px solid #e9ecef;
}

.all-selected-regions h4 {
  margin-bottom: 15px;
  color: #495057;
  font-size: 16px;
  font-weight: 600;
}

.selected-regions-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.selected-region-tag {
  background: #667eea;
  color: white;
  padding: 8px 15px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 2px 4px rgba(102, 126, 234, 0.2);
}

.remove-region-btn {
  background: none;
  border: none;
  color: white;
  font-size: 16px;
  cursor: pointer;
  padding: 0;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: background 0.2s ease;
  font-weight: bold;
}

.remove-region-btn:hover {
  background: rgba(255, 255, 255, 0.2);
}

.report-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px;
}

.report-header label {
  font-size: 1.1rem;
  color: #2c3e50;
  font-weight: 600;
  margin-bottom: 0;
}

.help-container {
  position: relative;
  display: inline-block;
}

.help-btn {
  background: none;
  border: none;
  font-size: 1.2rem;
  color: #666;
  cursor: pointer;
  padding: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s ease;
  border: 1px solid #ddd;
}

.help-btn:hover {
  background: #f0f0f0;
  border-color: #999;
  color: #333;
}

.help-tooltip {
  position: absolute;
  z-index: 1000;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  margin-bottom: 10px;
  width: 300px;
  background-color: #333;
  color: #fff;
  text-align: left;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  font-size: 13px;
  line-height: 1.4;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
  pointer-events: none;
}

.help-container:hover .help-tooltip {
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
}

.help-tooltip .tooltip-content p {
  margin: 0 0 8px 0;
}

.help-tooltip .tooltip-content p:last-child {
  margin-bottom: 0;
}

.help-tooltip .tooltip-content strong {
  color: #ffd700;
}

.report-options {
  display: flex;
  gap: 2rem;
  justify-content: center;
}

.radio-option {
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 1.1rem;
  color: #2c3e50;
}

.radio-option input[type="radio"] {
  display: none;
}

.radio-custom {
  width: 20px;
  height: 20px;
  border: 2px solid #e1e8ed;
  border-radius: 50%;
  margin-right: 0.5rem;
  position: relative;
  transition: all 0.3s ease;
}

.radio-option input[type="radio"]:checked + .radio-custom {
  border-color: #e74c3c;
}

.radio-option input[type="radio"]:checked + .radio-custom::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 10px;
  height: 10px;
  background: #e74c3c;
  border-radius: 50%;
}

.submit-btn {
  width: 100%;
  padding: 1.2rem;
  background: linear-gradient(135deg, #e74c3c, #c0392b);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 1rem;
}

.submit-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(231, 76, 60, 0.3);
}

.submit-btn:disabled {
  background: #bdc3c7;
  cursor: not-allowed;
  transform: none;
}

.success-message {
  text-align: center;
  padding: 2rem;
  background: #d4edda;
  border: 1px solid #c3e6cb;
  border-radius: 10px;
  margin-top: 2rem;
}

.success-message h3 {
  color: #155724;
  margin-bottom: 1rem;
}

.success-message p {
  color: #155724;
  margin-bottom: 0.5rem;
}

@media (max-width: 768px) {
  .signup-container {
    padding: 2rem;
    margin: 1rem;
  }
  
  .report-options {
    flex-direction: column;
    gap: 1rem;
  }
  
  .region-selection {
    flex-direction: column;
    gap: 10px;
  }
  
  .region-dropdown {
    min-width: 100%;
  }
}
</style>
