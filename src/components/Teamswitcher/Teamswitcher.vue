<template lang="html">
  <div class="team-switcher">
    LamaLama
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

    &:hover {
      background-color: #EAEAEA;
    }
  }
</style>
