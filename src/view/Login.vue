<template>
  <div class="login">
    用户名：<input type="text" v-model="username"><br>
    密码：<input type="password" v-model="pwd"><br>
    <button @click="login">登陆</button>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
    	username: '',
		pwd: '' 
    }
  },
  methods: {
  	login(){
  		let data = {
  			token: '335442',
  			info: {
  				username: this.username,
  				name: 'xfz'
  			} 
  		}
  		this.$store.commit('isLogin',data);
  		let redirect = decodeURIComponent(this.$route.query.redirect || '/');
  		this.$router.push({path: redirect});
  	}
  }
}
</script>
<style scoped>

</style>
