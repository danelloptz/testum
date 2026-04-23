<template>
  <div class="wrapper">
    <!-- Статистика -->
    <div class="stats">
      Студентов: {{ total }} | Сдало: {{ passed }} | Ср. балл: {{ avg }}
    </div>

    <!-- Таблица -->
    <div class="table">
      <div class="thead">
        <div class="col name">ФИО</div>
        <div class="col percent">Процент правильных ответов</div>
        <div class="col grade">Оценка</div>
      </div>

      <div
        v-for="(student, index) in results"
        :key="index"
        class="row"
      >
        <div class="col name">{{ student.name }}</div>
        <div class="col percent">{{ student.result.percent }}</div>
        <div class="col grade">
          <span
            class="grade-badge"
            :class="getGradeClass(student.result.mark)"
          >
            {{ student.result.mark }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    results: {
      type: Array,
      default: () => [],
    },
  },

  computed: {
    total() {
      return this.results?.length;
    },
    passed() {
      return this.results?.filter(r => Number(r.result.mark) >= Number(r.result.success_rate)).length;
    },
    avg() {
      if (!this.results?.length) return 0;
      return (
        this.results.reduce((s, r) => s + +r.result.mark, 0) /
        this.results.length
      ).toFixed(1);
    },
  },

  methods: {
    getGradeClass(grade) {
      if (grade === '5') return "g5";
      if (grade === '4') return "g4";
      if (grade === '3') return "g3";
      return "g2";
    },
  },
};
</script>

<style scoped>

/* Статистика */
.stats {
  background: #e7edf5;
  border-radius: 12px;
  padding: 14px;
  text-align: center;
  font-size: 15px;
  color: #374151;
  margin-bottom: 20px;
box-shadow: 0px 4px 20px 0px #0000000D;
}

/* Таблица */
.table {
  background: white;
  border-radius: 14px;
  overflow: hidden;
    box-shadow: 0px 4px 20px 0px #0000000D;
}

/* Header */
.thead {
  display: flex;
  padding: 16px 20px;
  background: #F1F5F9;
  color: #6b7280;
  font-weight: 600;
}

/* Row */
.row {
  display: flex;
  padding: 18px 20px;
  border-top: 1px solid #eef2f7;
  align-items: center;
}

/* Колонки */
.col {
  flex: 1;
}

.name {
  flex: 1;
  text-align: center;
}

.percent {
  flex: 1;
  text-align: center;
}

.grade {
  flex: 1;
    text-align: center;
}

/* Оценка */
.grade-badge {
  padding: 6px 10px;
  border-radius: 6px;
  font-weight: 600;
  font-size: 14px;
  color: white;
}

/* Цвета как на скрине */
.g5 {
  background: #86efac;
  color: #166534;
}

.g4 {
  background: #bbf7d0;
  color: #166534;
}

.g3 {
  background: #fed7aa;
  color: #9a3412;
}

.g2 {
  background: #fecaca;
  color: #991b1b;
}
</style>