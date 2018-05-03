<template lang="html">
  <div class="checklist" :class="{visible: visible}">
    <div class="checklist-header" @click="showTasks($event, checklist)">
      <h4 class="title">{{checklist.name}}</h4>
    </div>
    <div class="checklists-tasks">
      <div class="task" @change="addTask">
        <input type="text" v-model="newTask" placeholder="New task">
      </div>

      <div class="task" v-for="task in tasks2" @change="updateTask(task)">
        <div class="inner">
          {{task.name}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from '../../firebase'
import { mapGetters } from 'vuex'

export default {
  name: 'Checklist',
  props: ['checklist', 'keyId'],
  data() {
    return {
      visible: false,
      newTask: ''
      // tasks: []
    }
  },
  computed: {
    ...mapGetters([
      'getUser'
    ])
  },
  firestore () {
    return {
      tasks: db.collection('tasks'),
      tasks2: db.collection('tasks' ).where('checklistId', '==', this.keyId)
    }
  },
  methods: {
    addTask() {
      console.log('addTasks')
      this.$firestore.tasks.add({
        name: this.newTask,
        createdBy: {
          name: this.getUser.displayName,
          uid: this.getUser.uid
        },
        checklistId: this.keyId,
        timestamp: new Date()
      })

      this.newTask = ''
    },
    showTasks (event) {
      // console.log(this.visible);
      if (this.visible === false) {
        this.visible = true
      } else {
        this.visible = false
      }
    },
    filterTasks () {
      var filteredTasks = []
      db.collection('tasks' ).where('checklistId', '==', this.keyId).get().then(function(querySnapshot) {

        // console.log(querySnapshot)

        querySnapshot.forEach(function (doc) {
          console.log(doc.data())
          filteredTasks.push(doc.data())
        })
      })

      this.tasks = filteredTasks
    }
  }
}
</script>

<style scoped lang="scss">
  .checklist {
    border-top: 1px solid #cecece;

    &:last-of-type {
      border-bottom: 1px solid #cecece;
    }
  }

  .checklist-header {
    padding: 10px;
    cursor: pointer;
  }

  .checklists-tasks {
    display: none;
    background-color: #adc9ff;
  }

  .visible {
    .checklists-tasks {
      display: block;
      font-size: 10px;

      .task {
        input, .inner {
          padding: 10px;
          width: 100%;
          border: 0;
          // border-bottom: 1px solid #FFFFFF;

          &:focus {
            outline:0;
          }
        }
      }
    }
  }

  .title {
    font-size: 12px;
  }
</style>
