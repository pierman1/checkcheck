<template lang="html">
  <div class="">
    <addChecklist/>
    <addPlaybook/>
    <settings/>
    <addUsersToPlaybook/>
    <addChecklistsToPlaybook/>
  </div>
</template>

<script>
import addChecklist from './addChecklist.vue'
import addPlaybook from './addPlaybook.vue'
import settings from './settings.vue'
import addUsersToPlaybook from './addUsersToPlaybook.vue'
import addChecklistsToPlaybook from './addChecklistsToPlaybook.vue'
export default {
  name: 'Modals',
  components: {
    settings,
    addUsersToPlaybook,
    addChecklist,
    addPlaybook,
    addChecklistsToPlaybook
  }
}
</script>

<style scoped lang="scss">
</style>
