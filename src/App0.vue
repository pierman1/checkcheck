<template>
  <div id="app">
    <Header></Header>
    <!-- <Navigation v-show="user"></Navigation> -->
    <NavigationSecond v-show="user"></NavigationSecond>
    <div class="main">
      <transition name="fade">
        <router-view :key="$route.path"></router-view>
      </transition>
    </div>
    <Modals/>
    <Sidebar/>
    <notifications group="foo" position="bottom right"/>
  </div>

</template>

<script>
  import Header from './components/Header/Header.page.vue'
  import Navigation from './components/Navigation/Navigation.vue'
  import NavigationSecond from './components/Navigation/NavigationSecond.vue'
  import firebase from 'firebase'
  import Modals from './components/modals'
  import Sidebar from './components/sidebar/Sidebar.vue'
  import { db } from './firebase'
  import { mapGetters, mapMutations } from 'vuex'

  export default {
    name: 'app',
    data() {
      return {
        user: true
      }
    },
    components: {
      Header,
      Navigation,
      NavigationSecond,
      Modals,
      Sidebar
    },
    computed: {
      ...mapGetters([
        'getUser'
      ])
    },
    methods: {
      setUserOffline (event) {
        db.collection('users').doc(this.getUser.uid).update({
          status: 'offline'
        })
      },
      setUserOnline (event) {
        console.log('set user online => ', this.getUser.uid);
        if (this.getUser.uid) {
          db.collection('users').doc(this.getUser.uid).update({
            status: 'online'
          })
        }
      }
    },
    created () {
      window.addEventListener('beforeunload', this.setUserOffline)
      this.setUserOnline()
    }
  }
</script>

<style lang="scss">

  body {
    margin: 0;
    padding: 0;
    font-family: 'Proxima Nova', sans-serif;
  }

  * {
    box-sizing: border-box;
  }

  p {
    font-weight: 300;
    line-height: 1.5em;
  }

  .main {
    display: flex;
    flex-direction: column;
    width: calc(100% - 80px);
    background-color: #D7DBEB;
  }

  #app {
    background-color: #fff;
    min-height: 100vh;
    display: flex;
    flex-direction: row;

    .header {
      width: 80px;
      background-color: #fff;
      border-right: 1px solid #cecece;
    }
  }

  .boardList {
    list-style: none;
  }

.fade-enter-active, .fade-leave-active {
  transition-property: opacity;
  transition-duration: .35s;
}

.fade-enter-active {
  transition-delay: .35s;
  // background-color: black;
}

.fade-enter, .fade-leave-active {
  opacity: 0
}

</style>

<style lang="scss">
// SIMPLE GRID - SASS/SCSS

@import url(https://fonts.googleapis.com/css?family=Lato:400,300,300italic,400italic,700,700italic);

// fonts
$font-family: 'Lato', Helvetica, sans-serif;
$font-weight-light: 300;
$font-weight-regular: 400;
$font-weight-heavy: 700;
$font-height: 1.5;

// colors
$dark-grey: #333447;
$dark-gray: #333447; // for the Americans

// universal

html,
body {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
  left: 0;
  top: 0;
  font-size: 100%;
}

* {
  font-family: $font-family;
  color: $dark-grey;
  line-height: $font-height;
}

// typography

h1 {
  font-size: 2.5rem;
}

h2 {
  font-size: 2rem;
}

h3 {
  font-size: 1.375rem;
}

h4 {
  font-size: 1.125rem;
}

h5 {
  font-size: 1rem;
}

h6 {
  font-size: 0.875rem;
}

p {
  font-size: 1.125rem;
  font-weight: 200;
  line-height: 1.8;
}

.font-light {
  font-weight: $font-weight-light;
}

.font-regular {
  font-weight: $font-weight-regular;
}

.font-heavy {
  font-weight: $font-weight-heavy;
}

// utility

.left {
  text-align: left;
}

.right {
  text-align: right;
}

.center {
  text-align: center;
  margin-left: auto;
  margin-right: auto;
}

.justify {
  text-align: justify;
}

// .hidden-sm {
//   display: none;
// }

// grid

$width: 96%;
$gutter: 4%;
$breakpoint-small: 33.75em; // 540px
$breakpoint-med: 45em; // 720px
$breakpoint-large: 60em; // 960px

.container {
  width: 90%;
  margin-left: auto;
  margin-right: auto;

  // @media only screen and (min-width: $breakpoint-small) {
  //   width: 80%;
  // }
  //
  // @media only screen and (min-width: $breakpoint-large) {
  //   width: 100%;
  //   max-width: 1440px;
  // }
}

.row {
  position: relative;
  width: 100%;
}

.row [class^="col"] {
  float: left;
  margin: 0.5rem 2%;
  min-height: 0.125rem;
}

.row::after {
  content: "";
  display: table;
  clear: both;
}

.col-1,
.col-2,
.col-3,
.col-4,
.col-5,
.col-6,
.col-7,
.col-8,
.col-9,
.col-10,
.col-11,
.col-12 {
  width: $width;
}

.col-1-sm { width:($width / 12) - ($gutter * 11 / 12); }
.col-2-sm { width: ($width / 6) - ($gutter * 10 / 12); }
.col-3-sm { width: ($width / 4) - ($gutter * 9 / 12); }
.col-4-sm { width: ($width / 3) - ($gutter * 8 / 12); }
.col-5-sm { width: ($width / (12 / 5)) - ($gutter * 7 / 12); }
.col-6-sm { width: ($width / 2) - ($gutter * 6 / 12); }
.col-7-sm { width: ($width / (12 / 7)) - ($gutter * 5 / 12); }
.col-8-sm { width: ($width / (12 / 8)) - ($gutter * 4 / 12); }
.col-9-sm { width: ($width / (12 / 9)) - ($gutter * 3 / 12); }
.col-10-sm { width: ($width / (12 / 10)) - ($gutter * 2 / 12); }
.col-11-sm { width: ($width / (12 / 11)) - ($gutter * 1 / 12); }
.col-12-sm { width: $width; }

@media only screen and (min-width: $breakpoint-med) {
  .col-1 { width:($width / 12) - ($gutter * 11 / 12); }
  .col-2 { width: ($width / 6) - ($gutter * 10 / 12); }
  .col-3 { width: ($width / 4) - ($gutter * 9 / 12); }
  .col-4 { width: ($width / 3) - ($gutter * 8 / 12); }
  .col-5 { width: ($width / (12 / 5)) - ($gutter * 7 / 12); }
  .col-6 { width: ($width / 2) - ($gutter * 6 / 12); }
  .col-7 { width: ($width / (12 / 7)) - ($gutter * 5 / 12); }
  .col-8 { width: ($width / (12 / 8)) - ($gutter * 4 / 12); }
  .col-9 { width: ($width / (12 / 9)) - ($gutter * 3 / 12); }
  .col-10 { width: ($width / (12 / 10)) - ($gutter * 2 / 12); }
  .col-11 { width: ($width / (12 / 11)) - ($gutter * 1 / 12); }
  .col-12 { width: $width; }

  .hidden-sm {
    display: block;
  }
}

</style>
