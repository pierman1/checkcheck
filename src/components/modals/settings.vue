<template lang="html">
  <modal name="settings" class="settings modal">
    <div class="modal-container">
      <div class="close">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21.9 21.9">
          <path d="M14.1 11.3c-.2-.2-.2-.5 0-.7l7.5-7.5c.2-.2.3-.5.3-.7s-.1-.5-.3-.7L20.2.3c-.2-.2-.5-.3-.7-.3-.3 0-.5.1-.7.3l-7.5 7.5c-.2.2-.5.2-.7 0L3.1.3C2.9.1 2.6 0 2.4 0s-.5.1-.7.3L.3 1.7c-.2.2-.3.5-.3.7s.1.5.3.7l7.5 7.5c.2.2.2.5 0 .7L.3 18.8c-.2.2-.3.5-.3.7s.1.5.3.7l1.4 1.4c.2.2.5.3.7.3s.5-.1.7-.3l7.5-7.5c.2-.2.5-.2.7 0l7.5 7.5c.2.2.5.3.7.3s.5-.1.7-.3l1.4-1.4c.2-.2.3-.5.3-.7s-.1-.5-.3-.7l-7.5-7.5z"/>
        </svg>
      </div>
      <h2 class="title">Settings</h2>
      <div class="select-user">
        <p>select user:</p>
        <select class="" name="">
          <option value="">Pierre</option>
          <option value="">Lars</option>
          <option value="">Mark</option>
          <option value="">Edwin</option>
          <option value="">Auke</option>
          <option value="">Tim</option>
          <option value="">Jennifer</option>
        </select>
      </div>
    </div>
    <div class="modal-container">
      <div class="administrator-check">
        <label for="administrator">Administrator</label>
        <input type="checkbox" name="administrator" value="">
      </div>
    </div>
    <button class="btn btn-purple btn-bottom" name="button">Save settings</button>
  </modal>
</template>

<script>
export default {
  name: 'settings'
}
</script>

<style scoped lang="scss">
@import '../../assets/global.scss';
  .settings {

    h2 {
      font-size: 14px;
      font-weight: 700;
      margin: 0;
      width: 100%;
      text-align: center;
    }

    p {
      font-size: 12px;
      color: #fff;
    }

    .select-user {
      display: flex;
      flex-direction: row;
      margin-top: 40px;
      select, p {
        width: 50%;
        font-size: 14px;
      }
    }

    .administrator-check {
      width: 25%;
      display: flex;
      justify-content: space-between;
    }

    .modal-container {
      padding: 20px;
      color: lighten($purple, 100%);

      &:first-of-type {
        background-color: $purple;
      }

      .close {
        position: absolute;
        right: 20px;
        top: 10px;
        svg {
          width: 10px;
        }
      }
    }
    .btn {
      position: absolute;

      &.btn-bottom {
        right: 20px;
        bottom: 20px;
      }
    }
  }
</style>
