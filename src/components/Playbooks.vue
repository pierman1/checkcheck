<template lang="html">
  <div class="playbooks">
    <div class="container">
      <h1>Checklists</h1>

      <div class="">
        <input type="text" name="" placeholder="Checklist name" v-model="newchecklist" @keyup.enter="addChecklist">
        <button type="button" name="button" @click="addChecklist">Add checklist</button>
      </div>

      <ul>
        <li v-for="checklist in checklists">
          {{ checklist.name }}

          <button type="button" name="button" @click="deleteChecklist(checklist)">Remove</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { db } from '../firebase'

export default {
  name: 'Playbooks',
  data() {
    return {
      checklists: [],
      newchecklist: ''
    }
  },
  mounted() {
    console.log(this.$route);
  },
  firestore() {
    return {
      checklists: db.collection('checklists')
    }
  },
  methods: {
    addChecklist: function () {
      this.$firestore.checklists.add(
        {
          name: this.newchecklist,
          timestamp: new Date()
        }
      )
      this.newchecklist = ''
    },
    deleteChecklist: function(checklist) {
      this.$firestore.checklists.doc(checklist['.key']).delete()
    }
  }
}
</script>

<style lang="scss">
  .playbooks {
    ul {
      li {
        list-style: none;
      }
    }
  }
</style>
