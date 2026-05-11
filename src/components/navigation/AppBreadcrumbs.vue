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

      <span
        v-if="index !== crumbs.length - 1"
        class="sep"
      >
        /
      </span>
    </span>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()

const crumbs = computed(() => {
  const c = []

  // =========================
  // ЛЕКТОР / АДМИН
  // =========================

  // /lector
  if (route.name === 'lector') {
    c.push({
      label: 'Тесты',
      path: '/lector'
    })
  }

  // /lector/:test_id
  if (route.name === 'group_tests') {
    c.push({
      label: 'Тесты',
      path: '/lector'
    })

    c.push({
      label: `${route.params.test_name}`,
      path: `/lector/${route.params.test_id}/${route.params.test_name}`
    })
  }

  // /lector/:test_id/:group_name
  if (route.name === 'group_results') {
    c.push({
      label: 'Тесты',
      path: '/lector'
    })

    c.push({
      label: `${route.params.test_name}`,
      path: `/lector/${route.params.test_id}/${route.params.test_name}`
    })

    c.push({
      label: route.params.group_name,
      path: route.fullPath
    })
  }

  // /lector/tools
  if (route.name === 'lector_tools') {
    c.push({
      label: 'Инструменты',
      path: '/lector/tools'
    })
  }

  // /lector/tools/create
  if (route.name === 'lector_tools_create') {
    c.push({
      label: 'Инструменты',
      path: '/lector/tools'
    })

    c.push({
      label: 'Создать тест',
      path: '/lector/tools/create'
    })
  }

  // /lector/tools/add_lector
  if (route.name === 'lector_tools_add_lector') {
    c.push({
      label: 'Инструменты',
      path: '/lector/tools'
    })

    c.push({
      label: 'Управление лекторами',
      path: '/lector/tools/add_lector'
    })
  }

  // =========================
  // СТУДЕНТ
  // =========================

  // /home
  if (route.name === 'home') {
    c.push({
      label: 'Тесты',
      path: '/home'
    })
  }

  // /results
  if (route.name === 'results') {
    c.push({
      label: 'Результаты',
      path: '/results'
    })
  }

  // /results/:id/:name
  if (route.name === 'result_test') {
    c.push({
      label: 'Результаты',
      path: '/results'
    })

    c.push({
      label: route.params.name,
      path: route.fullPath
    })
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