<template>
  <div class="home">
    <div class="container">
      <div class="col">
        <h1>Welcome</h1>
        <p>
          It's a digital currency in which encryption techniques are used to regulate the generation of units of currency and verify the transfer of funds, operating independently of a central bank.
        </p>
        <router-link to="teams">Boards</router-link>
      </div>
      <div class="col">

      </div>
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

<style scoped lang="scss">
@import '../assets/global.scss';
  .home {
    display: flex;
    width: 100%;
    margin-top: 60px;
    height: calc(100vh - 80px);

    .container {
      width: 100%;
      display: flex;
    }

    p {
      font-size: .875em;
      line-height: 1.5;
    }

    h1 {
      padding: 0 !important;
    }
  }

  .col {
    background-color: #fff;
    padding: 20px;
    width: 50%;
    &:nth-child(2) {
      background-color: $purple;
    }
  }

</style>
