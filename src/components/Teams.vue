<template lang="html">
  <div class="teams">
    <h1>Teams</h1>

    <div class="form">
      <input type="text"
        v-model="newteam"
        @keyup.enter="addteam" placeholder="Team name">
      <button class="add" @click="addteam">
        <i class="glyphicon glyphicon-plus"></i>
      </button>
    </div>

    <ul class="teamList">
      <div class="" v-if="!teams.length">
        Add your first team!
      </div>
      <li class="item li" v-for="team in teams" >
        <div class="top">
          <router-link :to="{ name: 'team', params: {id: team['.key']} }">
            {{ team.name }}
          </router-link>
          <i class="glyphicon glyphicon-cog"></i>
        </div>

        <ul class="list-info">
          <li>Users:</li>
          <li>Created by: {{team.createdBy.name}}</li>
        </ul>

        <button class="remove" @click="deleteteam(team)">
          Remove
        </button>
      </li>
    </ul>
    <!-- <activeusers></activeusers> -->
  </div>
</template>

<script>
import { db } from '../firebase'
import firebase from 'firebase'
import Activeusers from './activeusers'

export default {
  name: 'Boards',
  components: {
    Activeusers
  },
  data() {
    return {
      teams: [],
      newteam: '',
      createdBy: {},
      users: {}
    }
  },
  // beforeRouteUpdate (to, from, next) {
  //   console.log('beforeupdate');
  // },
  firestore() {
    return {
      teams: db.collection('teams')
    }
  },
  created() {
    this.createdBy = firebase.auth().currentUser
  },
  methods: {
    addteam: function() {
      console.log(this.createdBy);

      this.$firestore.teams.add(
        {
          name: this.newteam,
          createdBy: {
            name: this.createdBy.displayName,
            uid: this.createdBy.uid
          },
          timestamp: new Date()
        }
      );
      this.newteam = '';
    },
    deleteteam: function(team) {
      this.$firestore.teams.doc(team['.key']).delete();
    }
  }
}
</script>

<style lang="scss">

  li {
    list-style: none;
  }

  .teams {
    margin-top: 40px;
    width: 20%;
    background-color: #fff;
    padding: 0 10px;
    .teamList {
      list-style: none;
      padding: 0;
      margin: 10px 0;
      border: 2px;
      .item {
        width: 100%;
        padding: 10px 10px;
        list-style: none;
        margin-bottom: 10px;
        border-radius: 2px;
        position: relative;
        background-color: #DCE6F1;

        i {
          opacity: .4;
          position:absolute;
          right: 10px;
          top: 10px;
          transition: 200ms opacity;
          cursor: pointer;

          &:hover {
            opacity: .6;
          }
        }

        a {
          text-decoration: none;
          font-weight: 100px;
          color: #000;
          display: block;
          width: 100%;
          float: left;
          text-transform: capitalize;
          opacity: 0.6;
        }

        ul {
          width: 100%;
          float: left;
          padding: 0;

          li {
            border: none;
            font-size: .7em;
            padding: 4px 0;
            margin-bottom: 0;
            color: #000;
            opacity: 0.6
          }
        }
      }
    }

    h1 {
      margin: 0;
      font-size: 1.115em;
      font-weight: 600;
      padding-bottom: 10px;
      padding: 10px 15px;
    }
  }

  button {
    padding: 8px 10px;
    border: none;
    border-radius: 2px;
    font-size: 0.7em;
    letter-spacing: 1px;
    cursor: pointer;

    &.remove {
      background-color: red;
      color: #fff;
    }

    &.add {
      background-color: #23CF5F;
      color: #fff;
      font-size: .8em;

      i {
        color: #fff;
      }
    }
  }

  .form {
    display: flex;
    input {
      width: calc(80% - 10px );
      margin-right: 10px;
    }

    button {
      width: calc(20% );
    }
  }

  input[type='text'] {
    background-color: #fff;
    border: none;
    font-size: .8em;
    padding: 8px 10px;


    &:focus {
      outline: 1px solid green;
      border: 2px;
    }
  }
</style>
