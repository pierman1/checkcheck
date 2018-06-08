<template lang="html">
  <div class="checklist" :class="{'playbookMode': type}">

    <div class="inner">
      <div class="container">
        <div class="name">
          {{data.name}}
        </div>
        <div class="tag">
          {{data.tag.name}}
        </div>
      </div>
      <div class="container">
        <div class="controls">
          <div class="controls" v-if="!type" @click="">
            <router-link :to="{ name: 'checklist', params: {id: data['.key']} }">
              <!-- <svg class="trash2" width="12" height="12" xmlns="http://www.w3.org/2000/svg"><path d="M11.962 5.334c-.019-.169-.215-.296-.385-.296-.55 0-1.038-.323-1.243-.822a1.336 1.336 0 0 1 .336-1.484.333.333 0 0 0 .036-.452 5.937 5.937 0 0 0-.95-.96.334.334 0 0 0-.456.037c-.358.396-1 .543-1.497.336A1.333 1.333 0 0 1 6.993.39a.333.333 0 0 0-.295-.35 5.99 5.99 0 0 0-1.35-.004.334.334 0 0 0-.297.344c.02.556-.31 1.07-.821 1.28-.49.2-1.129.054-1.486-.338a.335.335 0 0 0-.452-.038 5.96 5.96 0 0 0-.971.96.334.334 0 0 0 .036.455c.417.378.552.98.335 1.497-.207.494-.719.811-1.305.811a.326.326 0 0 0-.347.295 6.01 6.01 0 0 0-.002 1.364c.018.17.221.295.393.295a1.316 1.316 0 0 1 1.235.823c.21.511.075 1.107-.336 1.483a.333.333 0 0 0-.036.452c.278.356.598.679.949.96.137.112.337.096.456-.035.36-.397 1.002-.544 1.496-.337.518.217.844.74.812 1.302-.01.177.12.33.295.35a5.964 5.964 0 0 0 1.35.005.334.334 0 0 0 .297-.344c-.02-.556.31-1.07.82-1.28a1.385 1.385 0 0 1 1.486.338.335.335 0 0 0 .453.038c.36-.281.686-.604.97-.96a.333.333 0 0 0-.035-.455 1.33 1.33 0 0 1-.336-1.497 1.343 1.343 0 0 1 1.227-.813l.075.001a.334.334 0 0 0 .35-.294c.054-.45.054-.91.003-1.364zM6.01 8.014a2.004 2.004 0 0 1-2.002-2.001c0-1.104.898-2.002 2.002-2.002 1.103 0 2 .898 2 2.002a2.004 2.004 0 0 1-2 2.001z" fill-rule="nonzero"/></svg> -->
              <span class="info-button">info</span>
            </router-link>
          </div>
          <div class="trash" v-if="!type" @click="deleteChecklist">
            <svg width="10" height="13" xmlns="http://www.w3.org/2000/svg"><g fill-rule="nonzero"><path d="M9.138 1.491h-1.69V.392A.393.393 0 0 0 7.05 0c-.021 0-.036.007-.043.014A.054.054 0 0 0 6.978 0H2.95a.387.387 0 0 0-.392.392v1.1H.862A.852.852 0 0 0 0 2.353v1.413h.748v8.04c0 .485.371.856.856.856h6.792c.485 0 .863-.37.863-.856v-8.04H10V2.354a.852.852 0 0 0-.862-.863zM3.343.785h3.314v.706H3.343V.785zm5.125 11.022c0 .05-.022.071-.072.071H1.604c-.05 0-.072-.021-.072-.071v-8.04h6.936v8.04zm.74-8.825H.792v-.628c0-.05.022-.078.071-.078h8.276c.05 0 .07.028.07.078v.628z"/><path d="M6.434 4.674h.794v6.467h-.794V4.674zm-1.831 0h.794v6.467h-.794V4.674zm-1.831 0h.794v6.467h-.794V4.674z"/></g></svg>
          </div>

          <div class="filters-cta" @click="showTasks($event)">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    </div>

    <div class="tasks-container" v-if="open">
      <input type="text" name="" v-model="newTask" placeholder="New task" @change="addTask">
      <!-- {{checkedFTasks.length}} -->
      <div class="task" v-for="(task, index) in filteredTasks">
        <div class="inner">
          <div class="task__name">
            <span>{{index + 1}}.</span> {{task.name}}
          </div>

          <div class="task__controls task__controls--default" v-if="!type">
            <svg width="10" height="13" xmlns="http://www.w3.org/2000/svg"><g fill="#000" fill-rule="nonzero"><path d="M9.138 1.491h-1.69V.392A.393.393 0 0 0 7.05 0c-.021 0-.036.007-.043.014A.054.054 0 0 0 6.978 0H2.95a.387.387 0 0 0-.392.392v1.1H.862A.852.852 0 0 0 0 2.353v1.413h.748v8.04c0 .485.371.856.856.856h6.792c.485 0 .863-.37.863-.856v-8.04H10V2.354a.852.852 0 0 0-.862-.863zM3.343.785h3.314v.706H3.343V.785zm5.125 11.022c0 .05-.022.071-.072.071H1.604c-.05 0-.072-.021-.072-.071v-8.04h6.936v8.04zm.74-8.825H.792v-.628c0-.05.022-.078.071-.078h8.276c.05 0 .07.028.07.078v.628z"/><path d="M6.434 4.674h.794v6.467h-.794V4.674zm-1.831 0h.794v6.467h-.794V4.674zm-1.831 0h.794v6.467h-.794V4.674z"/></g></svg>

            <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg"><path d="M9.887 4.745L8.459 3.318a.343.343 0 0 0-.25-.106.343.343 0 0 0-.252.106.343.343 0 0 0-.106.25v.715h-2.14V2.14h.713c.097 0 .18-.035.25-.106a.343.343 0 0 0 .107-.25.343.343 0 0 0-.106-.251L5.247.106A.343.343 0 0 0 4.997 0a.343.343 0 0 0-.252.106L3.318 1.534a.343.343 0 0 0-.106.25c0 .097.035.18.106.251.07.071.154.106.25.106h.715v2.142H2.14v-.714a.343.343 0 0 0-.106-.251.343.343 0 0 0-.25-.106.343.343 0 0 0-.252.106L.106 4.745A.343.343 0 0 0 0 4.996c0 .097.035.18.106.251l1.427 1.428c.071.07.155.106.251.106.097 0 .18-.036.251-.106a.343.343 0 0 0 .106-.251V5.71h2.142v2.141h-.714a.343.343 0 0 0-.251.106.343.343 0 0 0-.106.251c0 .097.035.18.106.251l1.427 1.428c.071.07.155.106.251.106.097 0 .18-.036.251-.106l1.428-1.428a.343.343 0 0 0 .106-.25.343.343 0 0 0-.106-.252.343.343 0 0 0-.251-.106H5.71v-2.14h2.141v.713c0 .097.036.18.106.25.071.071.155.107.251.107.097 0 .18-.035.251-.106l1.428-1.428a.343.343 0 0 0 .106-.25.343.343 0 0 0-.106-.252z" fill="#000" fill-rule="nonzero"/></svg>
          </div>

          <div class="task__controls" v-if="type">

            <div class="check" @click="checkTask(task, $event)">
              <svg class="Icon CheckIcon TaskRowCompletionStatus-checkIcon" viewBox="0 0 32 32"><polygon points="27.672,4.786 10.901,21.557 4.328,14.984 1.5,17.812 10.901,27.214 30.5,7.615 "></polygon></svg>
            </div>

            <!-- <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg"><path d="M9.887 4.745L8.459 3.318a.343.343 0 0 0-.25-.106.343.343 0 0 0-.252.106.343.343 0 0 0-.106.25v.715h-2.14V2.14h.713c.097 0 .18-.035.25-.106a.343.343 0 0 0 .107-.25.343.343 0 0 0-.106-.251L5.247.106A.343.343 0 0 0 4.997 0a.343.343 0 0 0-.252.106L3.318 1.534a.343.343 0 0 0-.106.25c0 .097.035.18.106.251.07.071.154.106.25.106h.715v2.142H2.14v-.714a.343.343 0 0 0-.106-.251.343.343 0 0 0-.25-.106.343.343 0 0 0-.252.106L.106 4.745A.343.343 0 0 0 0 4.996c0 .097.035.18.106.251l1.427 1.428c.071.07.155.106.251.106.097 0 .18-.036.251-.106a.343.343 0 0 0 .106-.251V5.71h2.142v2.141h-.714a.343.343 0 0 0-.251.106.343.343 0 0 0-.106.251c0 .097.035.18.106.251l1.427 1.428c.071.07.155.106.251.106.097 0 .18-.036.251-.106l1.428-1.428a.343.343 0 0 0 .106-.25.343.343 0 0 0-.106-.252.343.343 0 0 0-.251-.106H5.71v-2.14h2.141v.713c0 .097.036.18.106.25.071.071.155.107.251.107.097 0 .18-.035.251-.106l1.428-1.428a.343.343 0 0 0 .106-.25.343.343 0 0 0-.106-.252z" fill="#000" fill-rule="nonzero"/></svg> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from '../../firebase'

export default {
  name: 'Checklist',
  props: ['data', 'type', 'playbook'],
  data () {
    return {
      open: false,
      newTask: '',
      thistasks: [],
      tasksOpen: false,
      newFiltered: []
    }
  },
  firestore () {
    return {
      playbooks: db.collection('playbooks'),
      tasks: db.collection('tasks').orderBy('timestamp', 'asc'),
      filteredTasks: db.collection('tasks').where('checklistId', '==', this.data.uid).orderBy('timestamp', 'asc')
    }
  },
  computed: {
    // checkedFTasks () {
    //   if (this.playbook.checkedTasks) {
    //     var list = []
    //
    //     var filteredTasks = []
    //     var thisPlaybookCheckedTasks = this.playbook.checkedTasks
    //
    //
    //     this.tasks.forEach(newTask => {
    //       // console.log(thisPlaybookCheckedTasks)
    //       thisPlaybookCheckedTasks.forEach(checkedTask => {
    //         if (newTask['.key'] !== checkedTask['.key']) {
    //           filteredTasks.push(newTask)
    //           // filteredTasks.splice(newTask)
    //         }
    //       })
    //     })
    //
    //     // console.log(filteredTasks);
    //     return filteredTasks
    //   }
    // }
  },
  methods: {
    showTasks (event) {
      if (this.open) {
        this.open = false
        event.path[4].classList.remove('open')
      } else {
        this.open = true
        event.path[4].classList.add('open')
      }
    },
    addTask () {
      this.$store.dispatch('tasks/addTask', {
        name: this.newTask,
        checklistId: this.data.uid,
        createdBy: this.$store.state.users.currentUser,
        key: this.data['key']
      })

      this.newTask = ''
    },
    checkTask (checkedTask) {
      console.log('checkedTask', checkedTask);
      console.log(this.filteredTasks)

      var checkedTasks = this.playbooks

      checkedTasks.push(checkedTask)

      db.collection('playbooks').doc(this.playbook['.key']).update({
        checkedTasks
      })
    },
    deleteChecklist () {

      if (this.data['.key']) {
        this.$modal.show('delete-checklist', {key: this.data['.key']})
      }
    }
  },
  created () {
    // this.getTasks()
  }
}
</script>

<style scoped lang="scss">
@import '../../assets/global.scss';
  .checklist {
    width: 100%;
    background-color: #fff;
    margin-bottom: 4px;
    display: flex;
    flex-direction: column;

    .trash {
      right: 55px;
      position: absolute;
      top: 6px;
      cursor: pointer;
      fill: $purple;
      opacity: 0;
      transition: .2s opacity;
    }

    .trash2 {
      right: 79px;
      position: absolute;
      top: 10px;
      cursor: pointer;
      fill: $purple;
      opacity: 0;
      transition: .2s opacity;
    }

    .inner {
      width: 100%;
      display: flex;
    }

    .container {
      display: flex;
      width: 50%;
      padding: 8px 10px;
      position: relative;
    }

    .controls {
      position: absolute;
      right: -5px;
      top: 2px;
    }

    .name {
      margin-right: 10px;
    }

    .tag {
      right: 30px;
      position: absolute;
      font-size: 12px;
      border-radius: 20px;
      background-color: $purple;
      color: #fff;
      padding: 4px 8px;
      width: 11em;
      text-align: center;
    }

    .tasks-container {
      width: 100%;
      background: rgba(89, 203, 255, 0.07);

      input {
        width: 100%;
        font-weight: 100;
        padding: 4px;
        border-left: 0;
        border-right: 0;
        border-top: 1px solid $light-purple;
        border-bottom: 1px solid $light-purple;
        padding: 8px 10px;

        &:focus {
          outline: 0;
          border-top: 1px solid $light-blue;
          border-bottom: 1px solid $light-blue;
        }
      }
    }

    &.open {
      .filters-cta {
        span {
          &:nth-child(1) {
            transform: rotate(45deg);
            top: 4px;
          }
          &:nth-child(2) {
            opacity: 0;
          }
          &:nth-child(3) {
            transform: rotate(-45deg);
            top: 4px;
          }
        }
      }
    }

    .info-button {
      opacity: 0;
    }

    &:hover {
      .trash {
        opacity: 1;
      }

      .info-button {
        opacity: 1;
      }

      .trash2 {
        opacity: 1;
      }
    }
  }

  .task {
    font-weight: 100;
    border-bottom: 1px solid $light-purple;
    padding: 8px 10px;

    &:nth-child(odd) {
      background-color: #edf9ff;
    }

    &:last-of-type {
      border-bottom: 0;
    }

    .inner {
      display: flex;
      flex-direction: row;
      justify-content: space-between;

      .task__controls {
        display: flex;
        position: relative;
        opacity: 0;
        transition: .2s opacity;

        &.task_controls--default {
          span {
            .info-button {
              opacity: 0;
            }
          }
          svg {
            margin-right: 10px;
            position: absolute;
            top: 50%;
            right: 0px;
            transform: translateY(-50%);
            cursor: pointer;
            opacity: .5;
            transition: .2s;

            &:first-of-type {
              right: 20px;
            }
          }

          &:hover {
            svg, span {
              opacity: .8;
            }
          }
        }
      }
      &:hover {
        .task__controls {
          opacity: 1;
        }
      }
    }
  }

  .check {
    border: 2px solid $purple;
    height: 24px;
    width: 24px;
    border-radius: 50%;
    position: relative;
    display: inline-block;

    cursor: pointer;
    transition: 250ms;
    transition-delay: 1500ms;
    overflow: hidden;

    svg {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 12px;
      fill: $purple;
      transition: 250ms;
    }

    &:hover {
      border-color: $purple;
      svg {
        fill: $purple;
      }
    }
  }

  .info-button {
    position: absolute;
    right: 83px;
    top: 9px;
    font-size: 10px;
    text-transform: uppercase;
    opacity: .5;
    color: $purple;
    transition: .2s color;

    &:hover {
      opacity: 1;
    }
  }
</style>
