<template lang="html">
  <div class="">
    <addChecklist/>
    <addPlaybook/>
    <settings/>
  </div>
</template>

<script>
import addChecklist from './addChecklist.vue'
import addPlaybook from './addPlaybook.vue'
import settings from './settings.vue'
export default {
  name: 'Modals',
  components: {
    addChecklist,
    settings
  }
}
</script>

<style scoped lang="scss">
</style>
