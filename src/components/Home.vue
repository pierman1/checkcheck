<template>
  <div class="home">
    <div class="box">
      <h1>Welcome</h1>
      <p>
        It's a digital currency in which encryption techniques are used to regulate the generation of units of currency and verify the transfer of funds, operating independently of a central bank.
      </p>
      <router-link to="teams">Boards</router-link>
    </div>

  </div>

</template>

<script>

export default {
  name: 'Home',
  components: {
  }
}
</script>

<style lang="scss">
  .home {
    display: flex;
    width: 70%;

    p {
      font-size: .875em;
      line-height: 1.5;
    }

    h1 {
      padding: 0 !important;
    }
  }

  .box {
    background-color: #fff;
    margin: 20px;
    padding: 20px;
    width: 100%;
  }


</style>
