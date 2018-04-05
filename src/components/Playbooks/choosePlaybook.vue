<template lang="html">
  <div class="choose-playbook">
    <h3 class="title">Choose playbook</h3>

    <div class="playbooks-container">
      <div v-for="playbook in playbooks" :key="playbook.name" @click="showPlaybook(playbook['.key'])" class="playbook">
        {{playbook.name}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChoosePlaybook',
  props: ['playbooks'],
  methods: {
    showPlaybook(key) {
      this.$emit('showPlaybook', key)
    }
  }
}
</script>

<style scoped lang="scss">
  .choose-playbook {
    background-color: #fff;
  }

  .title {
    font-size: 11px;
    text-transform: uppercase;
    color: #323C47;
    letter-spacing: 0.1px;
    margin: 0;
    margin-bottom: 20px;
  }

  .playbooks-container {
    display: flex;
    flex-direction: column;
    overflow: scroll;

    .playbook {
      padding: 20px;
      font-size: 13.5px;
      color: #323C47;
      letter-spacing: 0;
      border-radius: 5px;
      margin-bottom: 20px;
      cursor: pointer;
      border: 2px solid #E9EFF4;
      outline: 3px solid transparent;
      transition: 250ms;

      &:hover,
      &.active {
        border: 2px solid #4DA1FF;
        outline: 3px solid #F2F8FF;
      }
    }
  }
</style>
