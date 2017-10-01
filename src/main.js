// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router';
import store from './store';
import {mapMutations} from 'vuex';

Vue.config.productionTip = false

/* eslint-disable no-new */
const historyStack = {
    data: {
        history: [],
        forward: true
    },
    watch: {
        '$route' (to, from) {
            // 更改标题
            document.title=to.meta.txt;
            if (this.history.length > 0 && to.path == this.history[this.history.length - 1]) {
                this.forward = false;
                this.history.pop();
            } else {
                this.forward = true;
                this.history.push(from.path);
            }
        }
    }
};

new Vue({
  el: '#app',
  store,
  router,
  mixins: [historyStack],
  template: '<App :forward="forward" v-if="app" />',
  components: { App },
  data(){
  	return {
  		app: false
  	}
  },
  mounted(){
  	this.$nextTick(function(){
  		this.app = true;
  	});
  },

})
