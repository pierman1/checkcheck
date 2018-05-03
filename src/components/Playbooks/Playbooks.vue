<template lang="html">
  <div class="playbooks-page">
    <div class="flex-container">
      <div class="container">
        <div class="inner">
          <h1 class="title">Playbook: {{playbook.name}}</h1>

          <h2 class="title-secondary">Due data: 29 mei - 2017</h2>

          <ul class="info">
            <li>{{playbook.createdBy.name}}</li>
            <li>Users: {{playbook.users.length}}</li>
            <li>Created at: {{playbook.timestamp}}</li>
          </ul>

          <div class="progress-container">
            <h2 class="title-secondary">Progress</h2>
            <progress class="skill-1" max="100" value="40">
            </progress>
          </div>
        </div>
      </div>
      <div class="container">
        <div class="inner">
          <h2 class="title-secondary">Add checklist to playbook</h2>
          <select v-model="selected">
            <option value="joe">Select an checklist</option>
            <option v-for="checklist in AllChecklists" :value="checklist['.key']">{{checklist.name}}</option>
          </select>
          <button @click="addToArray" class="btn">Add checklist to playbook</button>
          <!-- <button @click="getAllChecklists">Add checklist to playbook</button> -->
        </div>
      </div>
    </div>


    <div class="checklist-container" v-if="allLists.length > 0">
      <!-- <h2 class="title">Checklists</h2> -->
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
            // console.log(doc.id, checklist)
            if (doc.id === checklist) {
              // console.log(doc);
              filteredLists.push(doc.data())
            }
          })
        })
      })
      this.allLists = filteredLists
    },
    addToArray () {
      // this.newLists.push(this.selected)
      // this.playbook.checklists.forEach((checklist) => {
      //   this.newLists.push(checklist)
      // })
      this.newLists.push(this.selected)
      // console.log(this.newLists);
      this.addChecklistToPlaybook()
    },
    addChecklistToPlaybook () {
      console.log('Length =>', this.newLists.length, this.listId);

      // var tasks = []
      // this.newLists.forEach(function(listId) {
      //   var tasksRef = db.collection('tasks').where('checklistId', '==', listId)
      //   tasksRef.get()
      //   .then(function(querySnapshot) {
      //     querySnapshot.forEach(function(task) {
      //       tasks.push(task.data())
      //       console.log('tasks => ', tasks.data());
      //     })
      //   })
      // })

      var playbookRef = db.collection('playbooks').doc(this.$route.params.id)

      playbookRef.set({
        checklists: this.newLists
        // tasks: tasks
      }, { merge: true })

      this.getAllChecklists()
    }
  },
  created () {
    this.getAllChecklists()
  }
}
</script>

<style scoped lang="scss">
.playbooks-page {
  width: calc(100% - 20px);
  padding: 20px;
  display: flex;
  justify-content: space-between;
  margin-right: 40px;
}

.flex-container {
  width: 25%;
}

.progress-container {
  width: 100%;
  progress {
    width: 100%;
  }
}

.container {
  width: 100%;
  background-color: #fff;
  margin-bottom: 20px;
  padding: 10px;
}

.inner {
  padding: 20px;
}

.title {
  font-weight: 900;
  margin: 10px 0;
  font-size: 24px;
  color: #233539;
  letter-spacing: -1.09px;
  display: inline-block;
  margin-right: 10px;
}

.title-secondary {
  font-size: 14px;
  font-weight: 900;
  margin: 10px 0;
}

.info {
  list-style: none;
  padding: 0;
  font-size: 12px;
  background-color: #fff;
}
.checklist-container {
  width: calc(75% - 20px);
}

select {
  width: 100%;
}

.btn {
  width: 100%;
  padding: 13px 10px;
  background-color: #3b99fc;
  color: white;
  border-radius: 2px;
  margin-top: 20px;
}
</style>
