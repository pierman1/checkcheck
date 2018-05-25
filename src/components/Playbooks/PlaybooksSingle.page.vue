<template lang="html">
  <div class="playbooks-page">
    <div class="flex-container">
      <div class="container">
        <div class="inner">
          <h1 class="title">
            {{playbook.name}}
             <span v-if="returnChecklists.length > 0">({{returnChecklists.length}})</span>
           </h1>

          <h2 class="title-secondary red">Deadline: {{playbook.duedate}}</h2>
        </div>
      </div>
      <div class="container gradient">
        <div class="inner">
          <ul class="info">
            <!-- <li><img v-if="playbook.createdBy.photoURL" :src="playbook.createdBy.photoURL" alt=""> {{playbook.createdBy.name}}</li> -->
            <!-- <li>Users: {{playbook.users.length}}</li> -->
            <!-- <li>Created at: {{playbook.timestamp}}</li> -->
          </ul>

          <div class="progress-container">
            <h2 class="title-secondary">Progress</h2>
            <progress class="skill-1" max="100" value="40">
            </progress>
          </div>
        </div>
      </div>
      <div class="container add-checklists">
        <div class="status">
          <h2 class="title-secondary">Project status</h2>
          <div class="stat active">
            active
          </div>
        </div>
        <div class="users" v-if="playbook.users.length > 0">
          <h2 class="title-secondary" v-if="playbook.users.length > 0">Users ({{playbook.users.length}})</h2>
          <h2 class="title-secondary" v-else>Users</h2>
          <img v-for="user in playbook.users" v-if="user.photoURL" :src="user.photoURL" alt="" :class="{online: user.status === 'online'}">
        </div>
      </div>
      <div class="container add-checklists">
        <div class="inner">
          <h2 class="title-secondary">Add checklist to playbook</h2>
          <!-- <select v-model="selected">
            <option value="joe" default>Select an checklist</option>
            <option v-for="checklist in AllChecklists" :value="checklist['.key']">{{checklist.name}}</option>
          </select> -->
          <button @click="openModal" class="btn">Add checklist to playbook</button>
        </div>
      </div>
    </div>

    <div class="checklist-container">
      <Checklist v-if="returnChecklists.length > 0" v-for="list in returnChecklists" :data="list" :type="true" :playbook="playbook"></Checklist>
    </div>
<!--
    {{checklists}}
    {{playbook.checklists}} -->

    <!-- <div class="checklist-container" v-if="allLists.length > 0">
      <div class="checklists">
        <Checklist v-for="(checklist, index) in allLists" :checklist="checklist" :keyId="AllChecklists[index]['.key']"/>
      </div>
    </div> -->
    <!-- <div class="checklist-container" v-else>
      Start by adding checklists to the playbook
    </div> -->
  </div>
</template>

<script>
import { db } from '../../firebase';
import Users from './Users'
import Checklist from '../Checklists/Checklist.vue'

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
      checklists: db.collection('checklists')
    }
  },
  computed: {
    returnChecklists () {
      var list = []
      this.checklists.forEach(checklist => {
        const newList = this.playbook.checklists.filter(activeChecklist => {
          if (activeChecklist.uid === checklist.uid) {
            list.push(checklist)
          }
        })
      })

      return list
    }
  },
  methods: {
    getAllChecklists () {
      var self = this
      var filteredLists = []
       db.collection('checklists').get().then((querySnapshot) => {

         if (self.playbook.checklists) {
           self.playbook.checklists.forEach(function(checklist) {

             querySnapshot.forEach(function(doc) {
               // console.log(doc.id, checklist)
               if (doc.id === checklist) {
                 // console.log(doc);
                 filteredLists.push(doc.data())
               }
             })
           })
         }
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
    },
    openModal () {
      console.log('joeeejoejeoejeojeo');
      this.$modal.show('addChecklistsToPlaybook', this.playbook)
    }
  },
  mounted () {
    this.$modal.show('addChecklistToPlaybook')
    console.log(this.playbook.checklists);
    console.log(this.playbook);
    console.log(this.playbook);
    // if (this.playbook.checklists.length === 0) {
      // console.log('length is - 0');
    // }
  },
  created () {
    this.getAllChecklists()

    // if (!this.playbook.) {
    //   console.log('open modal');
    //   this.$modal.open('addChecklistToPlaybook')
    // }
  }
}
</script>

<style scoped lang="scss">
@import '../../assets/global.scss';
.playbooks-page {
  width: calc(100%);
  padding: 20px;
  display: flex;
  justify-content: space-between;
  margin-right: 40px;
  margin-top: 40px;
}

.flex-container {
  width: 20%;
}

.progress-container {
  width: 100%;
  progress {
    border-radius: 2px;
    width: 100%;
    height: 5px;
  }
  progress::-webkit-progress-bar {
    background-color: white;
    // border-radius: 2px;
  }
  progress::-webkit-progress-value {
    //  border-radius: 2px;
     background-color: $green;
  }
  progress::-moz-progress-bar {
    /* style rules */
  }
}

.title-secondary {
  &.purple {
    color: $purple;
  }
  &.red {
    color: $red;
  }
}
.container {
  width: 100%;
  background-color: #fff;
  margin-bottom: 10px;
  padding: 10px;
  position: relative;

  &.gradient {
    // background: linear-gradient(135deg, #655efe 0%, #ff89f1 100%);
    margin-bottom: 0;
    background-color: $purple;

    ul li {
      color: #fff;
    }

    .title-secondary {
      color: #fff;

      &.purple {
        color: $purple;
      }
    }
  }

  &.add-checklists {
    margin-bottom: 0;
  }
}

.inner {
  padding: 10px;
}

.title {
  font-weight: 900;
  margin: 0;
  font-size: 18px;
  color: #233539;
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

  li {
    margin-bottom: 4px;
    img {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      border: 2px solid $light-blue;
      margin-right: 10px;
      // padding: 3px;
    }
  }
}

.checklist-container {
  width: calc(80% - 10px);
}

select {
  width: 100%;
}

.btn {
  width: 100%;
  padding: 13px 10px;
  background-color: $purple;
  color: white;
  border-radius: 2px;
  margin-top: 20px;

  @extend .btn-purple
}

.status {
  margin-left: 10px;

  .stat {
    background-color: $purple;
    color: #fff;
    padding: 4px 10px;
    border-radius: 20px;
    font-size: 12px;
    width: fit-content;
    text-transform: lowercase;
    display: inline;

    &.active {
      background-color: $green;
    }
  }
}

.users {
  width: 100%;
  position: relative;
  top: 10px;
  left:5px;

  img {
    display: inline;
    width: 30px;
    border-radius: 50%;
    transform: translateX(-5px);
    margin-right: 4px;
    border: 2px solid $purple;

    &.online {
      border: 2px solid green;
    }

    &:first-of-type {
      margin-left: 5px;
    }
  }
}
</style>
