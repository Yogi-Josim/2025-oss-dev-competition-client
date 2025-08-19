<template>
  <section class="signup-section">
    <div class="container">
      <div class="signup-container">
        <div v-if="isSubmitted" class="success-message">
          <h3>가입이 완료되었습니다!</h3>
          <p>이제 주변 위험 상황을 실시간으로 받아보실 수 있습니다.</p>
        </div>

        <form v-else @submit.prevent="handleSubmit" class="signup-form">
          <h2>서비스 가입하기</h2>
          <p class="description">
            이메일을 입력하고 구독할 지역을 선택하여 주변 위험 상황을 실시간으로
            받아보세요.
          </p>

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

          <div class="form-group">
            <div class="region-header">
              <label>관심 구독 구역 선택</label>
              <button
                type="button"
                @click="addSelectedRegion"
                class="add-region-btn"
                :disabled="!isRegionSelectionValid()"
              >
                + 구역 추가
              </button>
            </div>
            <div class="region-selection">
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

              <select
                v-model="formData.selectedDistrict"
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

            <div
              class="all-selected-regions"
              v-if="formData.selectedRegions.length > 0"
            >
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

          <div class="form-group">
            <div class="report-header">
              <label>레포트 수신 주기</label>
              <div class="help-container">
                <button type="button" class="help-btn">?</button>
                <div class="help-tooltip">
                  <div class="tooltip-content">
                    <p>
                      <strong>매일 받기:</strong> 매일 오전 8시에 전날 있었던
                      사건/사고 레포트를 제공합니다.
                    </p>
                    <p>
                      <strong>주간 받기:</strong> 매주 월요일 오전 8시에
                      저번주에 있었던 사건/사고 레포트를 제공합니다.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="report-options">
              <label class="radio-option">
                <input
                  type="radio"
                  v-model="formData.reportFrequency"
                  value="DAILY"
                />
                <span class="radio-custom"></span>
                매일 받기
              </label>
              <label class="radio-option">
                <input
                  type="radio"
                  v-model="formData.reportFrequency"
                  value="WEEKLY"
                />
                <span class="radio-custom"></span>
                주간 받기
              </label>
            </div>
          </div>

          <button
            type="submit"
            class="submit-btn"
            :disabled="!isFormValid || isLoading"
          >
            {{ isLoading ? "처리 중..." : "서비스 가입하기" }}
          </button>

          <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
import { API_ENDPOINTS, apiRequest } from '../api/apis.js';

export default {
  name: "SignupSection",
  data() {
    return {
      formData: {
        email: "",
        selectedProvince: "",
        selectedDistrict: "",
        selectedRegions: [],
        reportFrequency: "DAILY", // 기본값
      },
      isSubmitted: false,
      isLoading: false,
      errorMessage: "",
      availableRegions: [],
    };
  },
  computed: {
    isFormValid() {
      return (
        this.formData.email &&
        this.formData.reportFrequency &&
        this.formData.selectedRegions.length > 0
      );
    },
  },
  async created() {
    try {
      const data = await apiRequest(API_ENDPOINTS.REGIONS);
      this.availableRegions = data;
    } catch (error) {
      console.error("지역 목록을 불러오는 데 실패했습니다:", error);
    }
  },
  methods: {
    onProvinceChange() {
      this.formData.selectedDistrict = "";
    },
    getAvailableDistricts() {
      if (!this.formData.selectedProvince) return [];
      const region = this.availableRegions.find(
        (r) => r.id === this.formData.selectedProvince
      );
      return region ? region.districts : [];
    },
    getSelectedRegionText() {
      if (!this.formData.selectedProvince || !this.formData.selectedDistrict)
        return "";
      const region = this.availableRegions.find(
        (r) => r.id === this.formData.selectedProvince
      );
      if (!region) return "";
      const district = region.districts.find(
        (d) => d.id === this.formData.selectedDistrict
      );
      if (!district) return "";
      return `${region.name} ${district.name}`;
    },
    isRegionSelectionValid() {
      return this.formData.selectedProvince && this.formData.selectedDistrict;
    },
    addSelectedRegion() {
      if (!this.isRegionSelectionValid()) return;
      const regionText = this.getSelectedRegionText();
      const isDuplicate = this.formData.selectedRegions.some(
        (r) => r.text === regionText
      );
      if (!isDuplicate) {
        this.formData.selectedRegions.push({ text: regionText });
      }
      this.formData.selectedProvince = "";
      this.formData.selectedDistrict = "";
    },
    removeRegion(index) {
      this.formData.selectedRegions.splice(index, 1);
    },
    async handleSubmit() {
      if (!this.isFormValid) return;

      this.isLoading = true;
      this.errorMessage = "";

      const payload = {
        email: this.formData.email,
        regions: this.formData.selectedRegions.map((r) => r.text),
        frequency: this.formData.reportFrequency,
      };

      try {
        const result = await apiRequest(API_ENDPOINTS.SUBSCRIPTIONS, {
          method: "POST",
          body: JSON.stringify(payload),
        });
        
        console.log("가입 성공:", result);
        this.isSubmitted = true;
      } catch (error) {
        console.error("가입 실패:", error);
        this.errorMessage = error.message;
      } finally {
        this.isLoading = false;
      }
    },
  },
};
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
  content: "";
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

.error-message {
  color: red;
  text-align: center;
  margin-top: 1rem;
}
</style>
