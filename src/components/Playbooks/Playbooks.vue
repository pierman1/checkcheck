<template lang="html">
  <div class="playbooks-page">
    <div class="container">
      <div class="inner">
        <h1 class="title">Playbook: {{playbook.name}}</h1>
        {{playbook.checklists}}
        <div class="container">
          <ul class="info">
            <li>{{playbook.createdBy.name}}</li>
            <li>Users: {{playbook.users.length}}</li>
            <li>Created at: {{playbook.timestamp}}</li>
          </ul>
        </div>
      </div>
    </div>

    <div class="container">
      <h2 class="title-secondary">Add checklist to playbook</h2>
      <select v-model="selected">
        <option v-for="checklist in AllChecklists" :value="checklist['.key']">{{checklist.name}}</option>
      </select>
      <button @click="addToArray">Add checklist to playbook</button>
      <button @click="getAllChecklists">Add checklist to playbook</button>
    </div>

    <div class="container" v-if="allLists.length > 0">
      <h2 class="title">Checklists</h2>
      <div class="checklists">
        <Checklist v-for="(checklist, index) in allLists" :checklist="checklist" :keyId="AllChecklists[index]['.key']"/>
        <!-- <div class="checklist" v-for="checklist in allLists" @click="openChecklist(checklist)">
          {{checklist.name}}<br>
          Users: {{checklist.users.length}}
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import { db } from '../../firebase';
import Users from './Users'
import Checklist from './Checklist.vue'

export default {
  name: 'Playbooks',
  data () {
    return {
      name: 'user',
      selected: '',
      newLists: [],
      allLists: []
    }
  },
  components: {
    Users,
    Checklist
  },
  firestore() {
    return {
      playbook: db.collection('playbooks').doc(this.$route.params.id),
      AllChecklists: db.collection('checklists')
    }
  },
  methods: {
    getAllChecklists () {
      var self = this
      var filteredLists = []
       db.collection("checklists").get().then(function(querySnapshot) {

        self.playbook.checklists.forEach(function(checklist) {

          querySnapshot.forEach(function(doc) {
            console.log(doc.id, checklist)
            if (doc.id === checklist) {
              console.log(doc);
              filteredLists.push(doc.data())
            }
          })
        })
      })
      this.allLists = filteredLists
    },
    addToArray () {
      this.newLists.push(this.selected)
      this.addChecklistToPlaybook()
    },
    addChecklistToPlaybook () {
      var playbookRef = db.collection('playbooks').doc(this.$route.params.id)
      playbookRef.set({
        checklists: this.newLists
      }, { merge: true })
    }
  },
  created () {
    this.getAllChecklists()
  }
}
</script>

<style scoped lang="scss">
.playbooks-page {
  width: 100%;
  padding: 20px;
}

.container {
  width: 100%;
  background-color: #fff;
  margin-bottom: 20px;
  padding: 0;
}

.inner {
  padding: 20px;
}

.title {
  font-weight: 700;
  margin: 10px;
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: 500;
  color: #233539;
  letter-spacing: -1.09px;
  display: inline-block;
  margin-right: 10px;
}

.title-secondary {
  font-size: 14px;
  margin: 10px;
}

.info {
  list-style: none;
  padding: 0;
  font-size: 12px;
  background-color: #fff;
}
</style>
