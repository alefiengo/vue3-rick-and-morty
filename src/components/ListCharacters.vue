<template>
  <section>
    <div v-if="loading" class="state">Loading characters…</div>
    <div v-else-if="error" class="state state--error">{{ error }}</div>
    <div v-else class="characters">
      <div class="characters__item" v-for="character in characters" :key="character.id">
        <CardCharacter :character="character" />
      </div>
    </div>
  </section>
</template>

<script>
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import CardCharacter from '@/components/CardCharacter'

export default {
  components: { CardCharacter },
  setup () {
    const store = useStore()
    const characters = computed(() => store.getters.filteredCharacters)
    const loading = computed(() => store.state.loading)
    const error = computed(() => store.state.error)

    onMounted(() => {
      store.dispatch('getCharacters')
    })

    return {
      characters,
      loading,
      error
    }
  }
}
</script>

<style lang="scss">
.state {
  margin: 3rem 0;
  text-align: center;
  color: var(--text-gray);
}
.state--error {
  color: #ff6b6b;
}
.characters {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 3rem;
  margin: 3rem 0;
}
</style>
