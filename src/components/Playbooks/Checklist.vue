<template lang="html">
  <div class="checklist" :class="{visible: visible}">
    <div class="checklist-header" @click="showTasks($event, checklist)">
      <svg class="Icon RightTriangleIcon TaskGroupHeader-arrow triangleIcon" viewBox="0 0 32 32"><path d="M13.707,6.707L23,16l-9.293,9.293C13.077,25.923,12,25.477,12,24.586V7.414C12,6.523,13.077,6.077,13.707,6.707z"></path></svg>
      <h4 class="title">{{checklist.name}} ({{completedd.length}}/{{tasks2.length}})</h4>
      <div class="progress-container">
        <progress class="skill-1" max="100" :value="progress">
        </progress>
        <span v-if="progress">{{Math.round(progress)}}%</span>
      </div>
    </div>
    <div class="checklists-tasks">
      <div class="task task-create" @change="addTask">
        <input type="text" v-model="newTask" placeholder="New task">
      </div>

      <div class="drag-drop-container" v-drag-and-drop:options="options">

        <div class="task" v-for="task in tasks2" @change="updateTask(task)" :class="{completed: task.completed}">
          <div class="background"></div>
          <div class="inner">
            <div class="check" @click="checkTask($event, task)">
              <svg class="Icon CheckIcon TaskRowCompletionStatus-checkIcon" viewBox="0 0 32 32"><polygon points="27.672,4.786 10.901,21.557 4.328,14.984 1.5,17.812 10.901,27.214 30.5,7.615 "></polygon></svg>
            </div>
            <span>
              {{task.name}}
            </span>
            <div class="asign-user">
              <svg class="Icon UserIcon AssigneeAvatar-icon" viewBox="0 0 32 32"><path d="M20.534,16.765C23.203,15.204,25,12.315,25,9c0-4.971-4.029-9-9-9S7,4.029,7,9c0,3.315,1.797,6.204,4.466,7.765C5.962,18.651,2,23.857,2,30c0,0.681,0.065,1.345,0.159,2h27.682C29.935,31.345,30,30.681,30,30C30,23.857,26.038,18.651,20.534,16.765z M9,9c0-3.86,3.14-7,7-7s7,3.14,7,7s-3.14,7-7,7S9,12.86,9,9z M4,30c0-6.617,5.383-12,12-12s12,5.383,12,12H4z"></path></svg>
            </div>
            </div>
          </div>
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
      newTask: '',
      completed: 2,
      options: {
        dropzoneSelector: '.drag-drop-container',
        draggableSelector: '.task',
        excludeOlderBrowsers: true,
        multipleDropzonesItemsDraggingEnabled: true,
        showDropzoneAreas: true,
        onDrop: function(event) {},
        onDragstart: function(event) {},
        onDragend: function(event) {}
      }
    }
  },
  computed: {
    ...mapGetters([
      'getUser'
    ]),
    progress () {
      var total = this.tasks2.length
      var completed = this.tasks2.filter(function(task) {
        if (task.completed) {
          return task
        }
      })

      console.log(total, completed.length)

      var percentage = (completed.length/total) * 100

      if (percentage) {
        return percentage
      }
    },
    completedd () {
      var completed = this.tasks2.filter(function(task) {
        if (task.completed) {
          return task
        }
      })

      console.log(completed);

      return completed
    }
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
      var uid = this.createUid()
      this.$firestore.tasks.add({
        name: this.newTask,
        createdBy: {
          name: this.getUser.displayName,
          uid: this.getUser.uid
        },
        checklistId: this.keyId,
        completed: false,
        uid: uid,
        timestamp: new Date()
      })
      this.showTasks()
      this.newTask = ''
    },
    showTasks (event) {

      if (event.srcElement) {
        var panel = event.srcElement.nextSibling.nextSibling
        if (panel.style.maxHeight){
          panel.style.maxHeight = null;
        } else {
          panel.style.maxHeight = panel.scrollHeight + "px";
        }
      }

      if (this.visible === false) {
        this.visible = true
      } else {
        this.visible = false
      }
    },
    checkTask (event, task) {
      var docRef = db.collection('tasks').doc(task['.key'])
      docRef.update({
        completed: true,
        completedBy: {
          name: this.getUser.displayName,
          uid: this.getUser.uid
        }
      })
      .then(function() {
        setTimeout(function() {
          event.target.parentElement.parentElement.parentElement.classList.add('hideIt')
        })
      })
    },
    filterTasks () {
      var filteredTasks = []
      db.collection('tasks' ).where('checklistId', '==', this.keyId).get().then(function(querySnapshot) {
        querySnapshot.forEach(function (doc) {
          // console.log(doc.data())
          filteredTasks.push(doc.data())
        })
      })
      this.tasks = filteredTasks
    },
    createUid() {
      function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1)
        }
      return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    }
    // updateCompleted () {
    //   var completedTasks = []
    //   db.collection('tasks' ).where('checklistId', '==', this.keyId).get().then(function(querySnapshot) {
    //     // console.log(querySnapshot);
    //     querySnapshot.forEach(function(task) {
    //       if(task.data().completed = true) {
    //         completedTasks.push(task.data())
    //       }
    //     })
    //   })
    //
    //   this.completed = completedTasks
    // }
  },
  created () {
    // this.updateCompleted()
  }
}
</script>

<style scoped lang="scss">
  .checklist {
    box-shadow: 0 1px 3px 0 rgba(0,0,0,0.15);
    padding: 10px 15px;
    background-color: #fff;
    margin-bottom: 10px;
    &:last-of-type {
      border-bottom: 1px solid #cecece;
    }
  }

  .checklist-header {
    cursor: pointer;
    display: flex;
    position: relative;
    svg {
      width: 10px;
      height: 10px;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      transform-origin: center;
    }
    .title {
      padding-left: 15px;
    }

    .progress-container {
      position: absolute;
      right: 100px;
      width: 20%;
      top: 0;
      bottom: 0;
      progress {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        transition: 250ms;
      }

      span {
        position: absolute;
        right: -50px;
        font-size: 12px;
        top: 8px;
      }
    }
  }

  .visible {
    .checklist-header {
      svg {
        transform: translateY(-50%) rotate(90deg);
      }
    }
  }

  .checklists-tasks {
    overflow: hidden;
    transition: 0.4s;
    font-size: 13px;
    max-height: 0;
    .task {
      border-bottom: 1px solid #edf1f2;
      border-top: 1px solid transparent;
      transition: 250ms;
      transition: all 2s ease;
      position: relative;
      cursor: pointer;

      &:focus {
        outline: none;
      }

      .background {
        position: absolute;
        top: 0;
        width: 100%;
        left: 0;
        right: 0;
        bottom: 0;
        transform: translateX(-100%);
        background: linear-gradient(to right, rgba(240,248,255,0) 0%,rgba(240,248,255,0.8) 15%,rgba(240,248,255,1) 19%,rgba(240,248,255,1) 20%,rgba(240,248,255,1) 50%,rgba(240,248,255,1) 80%,rgba(240,248,255,1) 81%,rgba(240,248,255,0.8) 85%,rgba(240,248,255,0) 100%);
        transition: 1s;
      }

      &.task-create {
        input {
          background-color: aliceblue;
        }
      }

      &:last-of-type {
        border-bottom: 0;
      }

      &:hover {
        background-color: #f6f8f9;
      }

      input, .inner {
        padding: 10px;
        width: 100%;
        border: 0;
        // border-bottom: 1px solid #FFFFFF;

        &:focus {
          outline:0;
        }
      }

      .inner {
        display: flex;
        position: relative;
        z-index: 1;
        span {
          padding-top: 4px;
        }
      }

      .check {
        border: 1px solid #cecece;
        height: 25px;
        width: 25px;
        border-radius: 50%;
        position: relative;
        display: inline-block;
        margin-right: 10px;
        cursor: pointer;
        transition: 250ms;
        transition-delay: 1500ms;
        overflow: hidden;

        svg {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 10px;
          fill: #cecece;
          transition: 250ms;
        }

        &:hover {
          border-color: #01FF70;
          svg {
            fill: #01FF70;
          }
        }
      }

      &.completed {
        height: 0;
        border: 0;
        overflow: hidden;
        .background {
          transform: translateX(100%);
        }
      }

      &.hideIt {
        height: 0;
        overflow: hidden;
        border: 0;
      }
    }
  }

  @keyframes hide {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
      display: none;
    }
  }

  .title {
    font-size: 16px;
    font-weight: 600;
    text-transform: capitalize;
    pointer-events: none;
  }
</style>
