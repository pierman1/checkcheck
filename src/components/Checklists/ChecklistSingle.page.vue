<template lang="html">
  <div class="checklists-page">
    <div class="flex-container">

      <div class="col">
        <div class="content">

          <h2 class="title">
            {{checklist.name}}
            <div class="info">
              <ul>
                <!-- <li>Created by: {{checklist.createdBy.displayName}}</li> -->
              </ul>
            </div>
          </h2>
          <div class="resultText" v-html="checklist.info">
          </div>
        </div>
      </div>
    </div>
    <div class="flex-container">
      <div class="col">
        <div class="inner">
          <div class="inner-header">
            <h2 class="title">Add content to checklist</h2>
            <wysiwyg v-model="content" :html="checklist.info"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from '../../firebase'
import Checklist from './Checklist.vue'

export default {
  data () {
    return {
      checklistInfo: '',
      content: ''
    }
  },
  firestore () {
    return {
      checklist: db.collection('checklists').doc(this.$route.params.id)
    }
  },
  watch: {
  	content: function(html) {
      console.log('joe');
    	console.log(html);
      db.collection('checklists').doc(this.$route.params.id).set({
        info: html
      }, {merge: true})
    }
  }
}
</script>

<style scoped lang="scss">
@import '../../assets/global.scss';
.checklists-page {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  margin-top: 40px;
  max-width: 900px;

  .title {
    font-size: 18px;
    font-weight: 700;
    margin: 0;
    // position: absolute;
    transform: translateY(-50%);
    margin-top: 20px;
    margin-bottom: 10px;
  }

  .flex-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .col {
      width: 100%;
      height: 100%;
      padding: 20px;

      .inner {
        width: 100%;

        .inner-header {
          display: flex;
          flex-direction: column;
          width: 100%;
          padding: 15px 20px;
          border-bottom: 1px solid #F0F0F0;
          margin-bottom: 10px;
          position: relative;
          background: #fff;
        }
      }

      &:nth-child(2) {
        width: 30%;
        padding-left: 0;
        // border-left: 1px solid #F0F0F0;
      }
    }

    &:last-of-type {
      .col {
        padding-top: 0;
      }
    }
  }

  .filter {
    @extend .btn-purple-border;
    width: auto;
    margin-left: 10px;
  }

  button {
    background-color: $purple;
    padding: 8px 10px;
    text-align: center;
    font-size: 12px;
    width: 120px;
    border-radius: 2px;
    color: #fff;
    font-weight: 800;
    cursor: pointer;

    @extend .btn-purple
  }

  .checklists-container {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    flex-wrap: wrap;
  }
}

.filter-text {
  position: absolute;
  right: 190px;
  top: 19px;
  font-weight: 100;
  color: $purple;
}

.content {
  padding: 20px;
  background-color: #fff;
  font-size: 14px;
}
</style>
