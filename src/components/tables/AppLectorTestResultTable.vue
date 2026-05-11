<template>
  <div class="wrapper">
    <!-- Статистика -->
    <div class="stats">
      Студентов: {{ total }} |
      Сдало: {{ passed }} |
      Ср. балл: {{ avg }}
    </div>

    <!-- Таблица -->
    <div class="table">
      <div class="thead">
        <div class="col name">ФИО</div>
        <div class="col percent">Процент правильных ответов</div>
        <div class="col grade">Оценка</div>
      </div>

      <div
        v-for="student in results"
        :key="student.student_id"
        class="row"
      >
        <div class="col name">
          {{ student.name }}
        </div>

        <div class="col percent">
          {{ student.score }}%
        </div>

        <div class="col grade">
          <span
            class="grade-badge"
            :class="getGradeClass(student.mark)"
          >
            {{ student.mark }}
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
      return this.results.length;
    },

    passed() {
      return this.results.filter(
        r => Number(r.mark) >= 3
      ).length;
    },

    avg() {
      if (!this.results.length) return 0;

      return (
        this.results.reduce(
          (sum, r) => sum + Number(r.mark),
          0
        ) / this.results.length
      ).toFixed(1);
    },
  },

  methods: {
    getGradeClass(grade) {
      const g = Number(grade);

      if (g === 5) return 'g5';
      if (g === 4) return 'g4';
      if (g === 3) return 'g3';

      return 'g2';
    },
  },
};
</script>

<style scoped>
    .wrapper {
        width: 100%;
    }

    .stats {
        margin-bottom: 20px;
        font-size: 18px;
        font-weight: 600;
    }

    .table {
        width: 100%;
        background: white;
        border-radius: 16px;
        overflow: hidden;
    }

    .thead,
    .row {
        display: flex;
        align-items: center;
    }

    .thead {
        background: #f1f5f9;
        font-weight: 700;
    }

    .row {
        border-top: 1px solid #e2e8f0;
    }

    .col {
        padding: 20px;
    }

    .name {
        flex: 2;
    }

    .percent {
        flex: 1;
    }

    .grade {
        width: 140px;
    }

    .grade-badge {
        padding: 8px 14px;
        border-radius: 8px;
        font-weight: 700;
    }

    .g5 {
        background: #dcfce7;
        color: #166534;
    }

    .g4 {
        background: #dbeafe;
        color: #1d4ed8;
    }

    .g3 {
        background: #fef3c7;
        color: #92400e;
    }

    .g2 {
        background: #fee2e2;
        color: #b91c1c;
    }
</style>