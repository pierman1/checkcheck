<template lang="html">
  <div class="add-playbook">
    Add playbook

    <input v-model="newPlaybook" @change="addPlaybook">

    {{playbookName}}
  </div>
</template>

<script>
import { db } from '../../firebase'

export default {
  name: 'AddPlaybook',
  data () {
    return {
      newPlaybook: '',
      createdBy: {},
      teams:[]
    }
  },
  firestore() {
    return {
      playbooks: db.collection('playbooks')
    }
  },
  methods: {
    addPlaybook () {
      this.$firestore.playbooks.add(
        {
          name: this.newPlaybook,
          createdBy: {
            name: this.createdBy,
            uid: this.createdBy
          },
          timestamp: new Date()
        }
      );
      this.newPlaybook = '';
    }
  }
}
</script>

<style scoped lang="scss">
  .add-playbook {

  }
</style>
