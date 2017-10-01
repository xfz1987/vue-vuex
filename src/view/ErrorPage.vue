<template>
  <div class="error">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  name: 'errorpage',
  data () {
    return {
      msg: 'I am error page'
    }
  }
}
</script>
<style scoped>
h1{
  font-weight: normal;color: red;font-size: 24px;
}
.detail{background:#eee;}
</style>
