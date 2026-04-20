<template>
  <header class="header">
    <div class="header_row">
      <img src="@/assets/images/logo.png" class="logo" />
      <span class="header_text">Testum</span>
    </div>

    <div class="header_toogle">
      <span 
        v-for="(item, index) in items"
        :key="index"
        class="header_toogle_items"
        :class="{ active: index === activeIndex }"
        @click="$emit('change', index)"
      >
        {{ item }}
      </span>
    </div>

    <span class="header_text">{{ userName }}</span>
  </header>
</template>

<script>
export default {
  props: {
    items: Array,
    activeIndex: Number,
    userName: String
  }
}
</script>

<style scoped>
.header {
  width: 100%;
  padding: 10px 121px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #E2E8F0;
}

.header_text {
  font-size: 16px;
  font-weight: 700;
  color: #1E293B;
  text-transform: uppercase;
}

.header_toogle {
  display: flex;
  align-items: center;
  column-gap: 120px;
}

.header_toogle_items {
  font-size: 16px;
  color: #64748B;
  text-transform: uppercase;
  transition: .2s ease-in;
  font-weight: 500;
  position: relative;
  cursor: pointer;
}

.active {
  color: #2563EB;
}

.header_toogle_items.active::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -5px;
  width: 100%;
  height: 2px;
  background-color: #2563EB;
  border-radius: 2px;
}

.header_row {
  display: flex;
  align-items: center;
  column-gap: 10px;
}

.logo {
  width: 80px;
  height: 80px;
}
</style>