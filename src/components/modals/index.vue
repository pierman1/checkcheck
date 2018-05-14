<template lang="html">
  <div class="">
    <ModalAddChecklist/>
    <addPlaybook/>
    <settings/>
    <addUsersToPlaybook/>
  </div>
</template>

<script>
import ModalAddChecklist from './ModalAddChecklist.vue'
import addPlaybook from './addPlaybook.vue'
import settings from './settings.vue'
import addUsersToPlaybook from './addUsersToPlaybook.vue'
export default {
  name: 'Modals',
  components: {
    settings,
    addUsersToPlaybook,
    ModalAddChecklist,
    addPlaybook
  }
}
</script>

<style scoped lang="scss">
</style>
