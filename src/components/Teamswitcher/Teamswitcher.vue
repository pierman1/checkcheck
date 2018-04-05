<template lang="html">
  <div class="team-switcher">
    Switch Teams
    <Teamselect></Teamselect>
  </div>
</template>

<script>
import Teamselect from './Teamselect'
export default {
  name: 'Teamswitcher',
  components: {
    Teamselect
  }
}
</script>

<style scoped lang="scss">
  .team-switcher {
    width: 100%;
    padding: 15px 20px;
    transition: 300ms;
    height: 40px;
    font-weight: 800;
    cursor: pointer;

    &:after {
      content: '+';
      width: 1em;
      height: 1em;
      position: absolute;
      right: 20px;
      opacity: 0.3;
    }

    &:hover {
      &:after {
        opacity: 1;
      }
    }
  }
</style>
