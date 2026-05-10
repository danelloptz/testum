<template>
  <div class="card">
    <!-- HEADER -->
    <div class="card_header">
      Вопрос {{ current }} из {{ total }}
    </div>

    <!-- QUESTION -->
    <div class="card_question" v-html="renderedText"></div>

    <!-- IMAGE -->
    <img 
      v-if="image"
      :src="image"
      class="card_image"
    />

    <!-- ANSWERS -->
    <div class="answers">
      <label
            v-for="(answer, index) in answers"
            :key="index"
            class="answer"
            :class="[
                { selected: isSelected(index) },
                getAnswerClass(index)
            ]"
            >
            <input
                :type="is_multiple_choice ? 'checkbox' : 'radio'"
                :checked="isSelected(index)"
                @change="onSelect(index)"
                :disabled="showResult"
            />
            <span v-html="renderLatex(answer.text)"></span>
        </label>
    </div>
  </div>
</template>

<script>
import katex from "katex";
import "katex/dist/katex.min.css";

export default {
  props: {
    current: Number,
    total: Number,
    text: String,
    image: String,
    answers: Array,
    modelValue: [Number, Array],
    is_multiple_choice: Boolean,

    correctAnswer: String,
    showResult: Boolean,
  },

  data() {
    return {
      selected: this.is_multiple_choice
      ? (this.modelValue ?? [])
      : (this.modelValue ?? null)
    };
  },

  watch: {
    modelValue(val) {
      this.selected = val;
    },
    is_multiple_choice: {
        immediate: true,
        handler(val) {
        if (val) {
            // checkbox → всегда массив
            if (!Array.isArray(this.selected)) {
            this.selected = this.selected !== null ? [this.selected] : [];
            }
        } else {
            // radio → одно значение
            if (Array.isArray(this.selected)) {
            this.selected = this.selected[0] ?? null;
            }
        }
        }
    }
  },

  computed: {
    renderedText() {
      return this.renderLatex(this.text);
    }
  },

  methods: {
    renderLatex(text) {
      if (!text) return "";

      return text.replace(/\$(.*?)\$/g, (_, expr) => {
        try {
          return katex.renderToString(expr, {
            throwOnError: false
          });
        } catch {
          return expr;
        }
      });
    },

    getAnswerClass(index) {
        if (!this.showResult) return '';

        const correct = Number(this.correctAnswer);

        // ✅ правильный ответ — зелёный
        if (index === correct) return 'correct';

        // ❌ пользователь выбрал неправильный — красный
        if (index === this.selected && index !== correct) return 'wrong';

        return '';
    },

    onSelect(index) {
        if (this.is_multiple_choice) {
            let updated = Array.isArray(this.selected) ? [...this.selected] : [];

            if (updated.includes(index)) {
                updated = updated.filter(i => i !== index);
            } else {
                updated.push(index);
            }

            this.selected = updated;
            this.$emit("update:modelValue", updated);
        } else {
            this.selected = index;
            this.$emit("update:modelValue", index);
        }
    },

    isSelected(index) {
        if (this.is_multiple_choice) {
            return Array.isArray(this.selected) && this.selected.includes(index);
        }
        return this.selected === index;
    }
  }
};
</script>

<style scoped>
.card {
  max-width: 900px;
  margin: auto;
  padding: 30px;
  background: #f8fafc;
  border-radius: 16px;
  box-shadow: 0px 4px 25px 0px #0000000D;
  min-width: 900px;
}

/* HEADER */
.card_header {
  color: #64748b;
  margin-bottom: 10px;
}

/* QUESTION */
.card_question {
  font-size: 22px;
  font-weight: 500;
  margin-bottom: 20px;
}

/* IMAGE */
.card_image {
  width: 100%;
  border-radius: 10px;
  margin-bottom: 20px;
}

/* ANSWERS */
.answers {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.answer {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px;
  border-radius: 10px;
  background: #e2e8f0;
  cursor: pointer;
  transition: 0.2s;
}

.answer input {
  accent-color: #2563eb;
}

.answer.selected {
  background: #dbeafe;
}

.answer.correct {
  background: #dcfce7; /* светло-зелёный */
  border: 1px solid #22c55e;
}

.answer.wrong {
  background: #fee2e2; /* светло-красный */
  border: 1px solid #ef4444;
}   
</style>