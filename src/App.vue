<template>
  <div id="app">
    <transition :name="enterType">
      <router-view></router-view>
    </transition>
  </div>
</template>
<script>

export default {
  name: 'app',
  props: ['forward'],
  computed: {
    enterType(){
      return this.forward ? 'slide-left' : 'slide-right';
    }
  }
}
// import { mapState } from 'vuex';
</script>

<style>
/*@import url(./assets/css/main.less);*/
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
  .slide-left-enter-active,.slide-left-leave-active,.slide-right-enter-active,.slide-right-leave-active{
    transition: transform .3s;
  }
  .slide-left-enter,.slide-right-leave-to{
    transform:translateX(100%);opacity:1;
  }
  .slide-left-enter-to,.slide-left-leave,.slide-right-enter-to,.slide-right-leave{
   transform:translateX(0);opacity:1;
  }
  .slide-left-leave-to,.slide-right-enter{
    transform:translateX(-100%);opacity:1;
  }
</style>
