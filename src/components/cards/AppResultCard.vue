<template>
  <div class="result">

    <div class="result_card">
      <!-- Верх -->
      <div class="result_top">
        <div class="mark_block">
          <span class="mark_label">Оценка:</span>
          <span 
            class="mark_value"
            :style="markStyle"
          >
            {{ result.mark }}
          </span>
        </div>

        <div class="percent">
          {{ result.success_rate }} правильных ответов
        </div>
      </div>

      <div class="divider"></div>

      <!-- Время -->
      <div class="info_row">
        <div class="icon blue">🕒</div>
        <div class="info_text">
          <b>Начало:</b> {{ formatDate(result.date_start) }}
        </div>
      </div>

      <div class="info_row">
        <div class="icon blue">✔</div>
        <div class="info_text">
          <b>Конец:</b> {{ formatDate(result.date_end) }}
        </div>
      </div>

      <div class="divider"></div>

      <!-- Прогресс -->
      <div class="info_row">
        <div class="icon green">✔</div>
        <div class="info_text">
          <b>Правильных ответов:</b>
          {{ correctCount }} из {{ totalCount }} ({{ result.success_rate }})
        </div>
      </div>

      <div class="progress_block">
        <div class="progress_bar">
          <div 
            class="progress_fill"
            :style="{ width: result.success_rate }"
          ></div>
        </div>
        <div class="progress_percent">
          {{ result.success_rate }}
        </div>
      </div>
    </div>

    <AppButton class="confirm_btn" @click="$emit('close')">
      Закрыть
    </AppButton>
  </div>
</template>

<script>
import AppButton from '@/components/buttons/AppButton.vue';

export default {
  components: { AppButton },

  props: {
    result: Object
  },

  computed: {
    markStyle() {
      const mark = Number(this.result?.mark);

      if (mark >= 4) {
        return {
          color: '#16a34a',
          background: '#dcfce7'
        };
      }

      if (mark === 3) {
        return {
          color: '#ca8a04',
          background: '#fef9c3'
        };
      }

      return {
        color: '#dc2626',
        background: '#fee2e2'
      };
    },

    correctCount() {
      const percent = parseInt(this.result.success_rate);
      const total = this.totalCount;
      return Math.round((percent / 100) * total);
    },

    totalCount() {
      return 20; // потом с бэка
    }
  },

  methods: {
    formatDate(ts) {
      return new Date(ts).toLocaleString();
    }
  }
};
</script>

<style scoped>
/* ВЕСЬ ТВОЙ CSS КАРТОЧКИ ПЕРЕНОСИШЬ СЮДА БЕЗ ИЗМЕНЕНИЙ */
.result {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
}

.result_title {
  font-size: 32px;
  font-weight: 700;
  color: #1e293b;
}

.result_card {
  width: 720px;
  padding: 32px;
  border-radius: 20px;
  background: #f8fafc;
  box-shadow: 0 10px 30px rgba(0,0,0,0.08);
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.result_top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.mark_block {
  display: flex;
  align-items: center;
  gap: 12px;
}

.mark_label {
  font-size: 24px;
  font-weight: 600;
}

.mark_value {
  font-size: 28px;
  font-weight: 700;
  padding: 4px 12px;
  border-radius: 8px;
}

.percent {
  font-size: 20px;
  font-weight: 600;
  color: #2563eb;
}

.divider {
  height: 1px;
  background: #e2e8f0;
}

.info_row {
  display: flex;
  align-items: center;
  gap: 12px;
}

.icon {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
}

.icon.blue {
  background: #dbeafe;
  color: #2563eb;
}

.icon.green {
  background: #dcfce7;
  color: #16a34a;
}

.info_text {
  font-size: 16px;
  color: #1e293b;
}

.progress_block {
  display: flex;
  align-items: center;
  gap: 12px;
}

.progress_bar {
  flex: 1;
  height: 14px;
  background: #e5e7eb;
  border-radius: 8px;
  overflow: hidden;
}

.progress_fill {
  height: 100%;
  background: linear-gradient(90deg, #4ade80, #22c55e);
  border-radius: 8px;
}

.progress_percent {
  min-width: 50px;
  text-align: right;
  font-weight: 600;
  color: #374151;
}

.confirm_btn {
  width: 228px;
  height: 52px;
  border-radius: 8px;
}
</style>