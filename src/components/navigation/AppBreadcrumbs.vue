<template>
  <div class="breadcrumbs">
    <span
      v-for="(crumb, index) in crumbs"
      :key="index"
    >
      <router-link
        v-if="index !== crumbs.length - 1"
        :to="crumb.path"
        class="link"
      >
        {{ crumb.label }}
      </router-link>

      <span v-else class="current">
        {{ crumb.label }}
      </span>

      <span v-if="index !== crumbs.length - 1" class="sep"> / </span>
    </span>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()

const crumbs = computed(() => {
  const c = []

  // 👇 Лекторская зона
  if (route.name === 'lector') {
    c.push({ label: 'Группы', path: '/lector' })
  }

  if (route.name === 'group_tests') {
    c.push({ label: 'Группы', path: '/lector' })
    c.push({
      label: route.params.group_name,
      path: `/lector/${route.params.group_name}`
    })
  }

  if (route.name === 'group_results') {
    c.push({ label: 'Группы', path: '/lector' })
    c.push({
      label: route.params.group_name,
      path: `/lector/${route.params.group_name}`
    })
    c.push({
      label: 'Результаты',
      path: route.fullPath
    })
  }

  if (route.name === 'lector_tools') {
    c.push({ label: 'Инструменты', path: '/lector/tools' })
  }

  if (route.name === 'lector_tools_create') {
    c.push({ label: 'Инструменты', path: '/lector/tools' })
    c.push({ label: 'Создать тест', path: '/lector/tools/create' })
  }

  // 👇 студент (на будущее)
  if (route.name === 'home') {
    c.push({ label: 'Тесты', path: '/home' })
  }

  if (route.name === 'results') {
    c.push({ label: 'Результаты', path: '/results' })
  }

  if (route.name === 'result_test') {
    c.push({ label: 'Результаты', path: '/results' })
    c.push({ label: 'Тест', path: route.fullPath })
  }

  return c
})
</script>

<style scoped>
.breadcrumbs {
  font-size: 14px;
  color: #6b7280;
  margin-bottom: 16px;
}

.link {
  color: #6b7280;
  text-decoration: none;
}

.link:hover {
  color: #111827;
}

.current {
  color: #111827;
  font-weight: 500;
}

.sep {
  margin: 0 6px;
}
</style>