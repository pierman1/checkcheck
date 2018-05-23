<template lang="html">
  <div class="checklist">
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

      <div class="task" v-for="task in filteredTasks">
        <div class="inner">
          <div class="task__name">
            {{task.name}}
          </div>

          <div class="task__controls">
            <svg width="10" height="13" xmlns="http://www.w3.org/2000/svg"><g fill="#000" fill-rule="nonzero"><path d="M9.138 1.491h-1.69V.392A.393.393 0 0 0 7.05 0c-.021 0-.036.007-.043.014A.054.054 0 0 0 6.978 0H2.95a.387.387 0 0 0-.392.392v1.1H.862A.852.852 0 0 0 0 2.353v1.413h.748v8.04c0 .485.371.856.856.856h6.792c.485 0 .863-.37.863-.856v-8.04H10V2.354a.852.852 0 0 0-.862-.863zM3.343.785h3.314v.706H3.343V.785zm5.125 11.022c0 .05-.022.071-.072.071H1.604c-.05 0-.072-.021-.072-.071v-8.04h6.936v8.04zm.74-8.825H.792v-.628c0-.05.022-.078.071-.078h8.276c.05 0 .07.028.07.078v.628z"/><path d="M6.434 4.674h.794v6.467h-.794V4.674zm-1.831 0h.794v6.467h-.794V4.674zm-1.831 0h.794v6.467h-.794V4.674z"/></g></svg>

            <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg"><path d="M9.887 4.745L8.459 3.318a.343.343 0 0 0-.25-.106.343.343 0 0 0-.252.106.343.343 0 0 0-.106.25v.715h-2.14V2.14h.713c.097 0 .18-.035.25-.106a.343.343 0 0 0 .107-.25.343.343 0 0 0-.106-.251L5.247.106A.343.343 0 0 0 4.997 0a.343.343 0 0 0-.252.106L3.318 1.534a.343.343 0 0 0-.106.25c0 .097.035.18.106.251.07.071.154.106.25.106h.715v2.142H2.14v-.714a.343.343 0 0 0-.106-.251.343.343 0 0 0-.25-.106.343.343 0 0 0-.252.106L.106 4.745A.343.343 0 0 0 0 4.996c0 .097.035.18.106.251l1.427 1.428c.071.07.155.106.251.106.097 0 .18-.036.251-.106a.343.343 0 0 0 .106-.251V5.71h2.142v2.141h-.714a.343.343 0 0 0-.251.106.343.343 0 0 0-.106.251c0 .097.035.18.106.251l1.427 1.428c.071.07.155.106.251.106.097 0 .18-.036.251-.106l1.428-1.428a.343.343 0 0 0 .106-.25.343.343 0 0 0-.106-.252.343.343 0 0 0-.251-.106H5.71v-2.14h2.141v.713c0 .097.036.18.106.25.071.071.155.107.251.107.097 0 .18-.035.251-.106l1.428-1.428a.343.343 0 0 0 .106-.25.343.343 0 0 0-.106-.252z" fill="#000" fill-rule="nonzero"/></svg>
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
  props: ['data'],
  data () {
    return {
      open: false,
      newTask: '',
      thistasks: [],
      tasksOpen: false
    }
  },
  firestore () {
    return {
      tasks: db.collection('tasks'),
      filteredTasks: db.collection('tasks').where('checklistId', '==', this.data.uid)
    }
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
        createdBy: this.$store.state.users.currentUser
      })
    }
    // getTasks () {
    //   if (this.data['.key']) {
    //     this.thistasks =
    //   } else {
    //     console.log('something went wrong');
    //   }
    // }
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
      }
    }

    &:hover {
      svg {
        opacity: .8;
      }
    }
  }
</style>
