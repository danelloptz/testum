<template>
  <div class="input_label_wrapper">
    <label v-if="label" class="label">
      {{ label }}
    </label>

    <AppInput
      :modelValue="modelValue"
      :type="type"
      :label="placeholder"
      :empty="empty"
      :blue="blue"
      :read="read"
      @update="onUpdate"
      @enterPress="$emit('enterPress')"
    />
  </div>
</template>

<script>
    import AppInput from './AppInput.vue';

export default {
  components: { AppInput },

  props: {
    modelValue: String,
    label: String,
    placeholder: String,
    type: {
      type: String,
      default: 'text'
    },
    empty: Boolean,
    blue: Boolean,
    read: Boolean
  },

  methods: {
    onUpdate(value) {
      this.$emit('update:modelValue', value)
    }
  }
}
</script>

<style scoped>
.input_label_wrapper {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
}

.label {
  font-size: 14px;
  font-weight: 500;
  color: #64748B;
  font-family: 'SF';
}
</style>