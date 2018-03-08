<template lang="html">
  <div class="playbooks-page">
    <h2>Playbooks page</h2>

    {{playbooks}}
  </div>
</template>

<script>
import {db} from '../../firebase'
export default {
  name: 'PlaybooksPage',
  data() {
    return {
      // user
    }
  },
  firestore() {
    return {
      playbooks: db.collection('playbooks')
    }
  },
  created() {
    // console.log(this.playbooks);

    function filterPlaybooks(playbook) {
      console.log(playbook);
      return playbook.team === 'VfuAiu5BFMVM3I0eJgym'
    }

    var filtered = this.playbooks.filter(filterPlaybooks)
    console.log(filtered);
  }
}
</script>

<style lang="scss">
  .playbooks-page {
    background-color: #fff;
    height: 100%;
    padding: 20px;
  }
</style>
