<template lang="html">
  <div class="">
    <addChecklist/>
    <addPlaybook/>
    <settings/>
    <addUsersToPlaybook/>
  </div>
</template>

<script>
import addChecklist from './addChecklist.vue'
import addPlaybook from './addPlaybook.vue'
import settings from './settings.vue'
import addUsersToPlaybook from './addUsersToPlaybook.vue'
export default {
  name: 'Modals',
  components: {
    addChecklist,
    settings,
    addUsersToPlaybook,
    addPlaybook
  }
}
</script>

<style scoped lang="scss">
</style>
