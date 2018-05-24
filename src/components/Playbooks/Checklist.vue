<template lang="html">
  <div class="checklist">
    <div class="name">
      {{data.name}}
    </div>
    <div class="tag">
      {{data.tag.name}}
    </div>
  </div>
</template>

<script>
import { db } from '../../firebase'
import { mapGetters } from 'vuex'

export default {
  name: 'Checklist',
  props: ['data']
}
</script>

<style scoped lang="scss">
  .checklist {
    background-color: #fff;
    display: flex;
    padding: 4px 8px;
    margin-bottom: 4px;
  }

  .name {
    font-size: 14px;
  }
</style>
