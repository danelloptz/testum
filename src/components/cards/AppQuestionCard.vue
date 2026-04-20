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
        :class="{ selected: selected === index }"
      >
        <input
          type="radio"
          :value="index"
          v-model="selected"
          @change="onSelect(index)"
        />
        <span v-html="renderLatex(answer)"></span>
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
    modelValue: Number
  },

  data() {
    return {
      selected: this.modelValue ?? null
    };
  },

  watch: {
    modelValue(val) {
      this.selected = val;
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

    onSelect(index) {
      this.$emit("update:modelValue", index);
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
</style>