<template lang="html">
  <div class="playbooks-page">
    <h1>Playbook: {{playbook.name}}</h1>
    <Users :users="playbook.users"></Users>
    {{playbook.users}}
  </div>
</template>

<script>
import { db } from '../../firebase';
import Users from './Users'
export default {
  name: 'Playbooks',
  components: {
    Users
  },
  firestore() {
    return {
      playbook: db.collection('playbooks').doc(this.$route.params.id),
    }
  }
}
</script>

<style scoped lang="scss">
.playbooks-page {
  width: 100%;
  padding: 20px;
}

.title {

}
</style>
