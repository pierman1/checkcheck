<template lang="html">
  <modal name="delete-checklist" class="add-playbook" @before-open="beforeOpen">
    <div class="modal-container">
      <!-- <div class="close" @click="closeModal">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21.9 21.9">
          <path d="M14.1 11.3c-.2-.2-.2-.5 0-.7l7.5-7.5c.2-.2.3-.5.3-.7s-.1-.5-.3-.7L20.2.3c-.2-.2-.5-.3-.7-.3-.3 0-.5.1-.7.3l-7.5 7.5c-.2.2-.5.2-.7 0L3.1.3C2.9.1 2.6 0 2.4 0s-.5.1-.7.3L.3 1.7c-.2.2-.3.5-.3.7s.1.5.3.7l7.5 7.5c.2.2.2.5 0 .7L.3 18.8c-.2.2-.3.5-.3.7s.1.5.3.7l1.4 1.4c.2.2.5.3.7.3s.5-.1.7-.3l7.5-7.5c.2-.2.5-.2.7 0l7.5 7.5c.2.2.5.3.7.3s.5-.1.7-.3l1.4-1.4c.2-.2.3-.5.3-.7s-.1-.5-.3-.7l-7.5-7.5z"/>
        </svg>
      </div> -->
      <h2 class="title">Do you wan't to delete this checklist?</h2>

    </div>
    <div class="modal-container dark">
      <div class="tags">
        <div class="tag" v-for="tag in tags" @click="setActiveTag(tag, $event)">
          {{tag.name}}
        </div>
      </div>
    </div>
    <div class="modal-container">
      <button class="btn btn-purple btn-bottom" @click="this.$modal.hide('delete-checklist')" name="button">Cancel</button>
      <button class="btn btn-purple btn-bottom" @click="deleteChecklist" name="button">Delete checklist</button>
    </div>
  </modal>
</template>

<script>
import { db } from '../../firebase'

export default {
  data () {
    return {
      key: ''
    }
  },
  methods: {
    beforeOpen (event) {
      console.log(event.params.key)
      this.key = event.params.key
    },
    closeModal() {
      this.$modal.hide('delete-checklist')
    },
    deleteChecklist () {
      if (this.key) {
        db.collection('checklists').doc(this.key).delete()
        this.closeModal()
      }
    }
  }
}
</script>

<style scoped lang="scss">

</style>
