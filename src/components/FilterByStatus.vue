<template>
  <div class="filter">
      <div class="item" :class="{ active: status === '' }" @click="filter('')">
          All
      </div>
      <div class="item" :class="{ active: status === 'Alive' }" @click="filter('Alive')">
          Alive
      </div>
      <div class="item" :class="{ active: status === 'Dead' }" @click="filter('Dead')">
          Dead
      </div>
      <div class="item" :class="{ active: status === 'unknown' }" @click="filter('unknown')">
          Unknown
      </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  setup () {
    const store = useStore()
    const status = computed(() => store.state.statusFilter)

    const filter = (statusValue) => {
      store.dispatch('filterByStatus', statusValue)
    }

    return {
      status,
      filter
    }
  }
}
</script>

<style lang="scss">
.filter {
    width: 400px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    border-radius: 10px;
    .item {
        padding: 1rem 0.5rem;
        background-color: var(--background-card);
        text-align: center;
        cursor: pointer;
        &.active {
            background-color: var(--text-orange);
        }
        &:hover {
            background-color: var(--text-orange);
        }
    }
}
</style>
