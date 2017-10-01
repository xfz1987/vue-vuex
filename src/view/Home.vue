<template>
  <div class="home">
    <h1>{{ msg }}</h1>
    <router-link to="/product">进入产品页</router-link>
    <router-link to="/order">我的订单</router-link>
    <router-link to="/info">个人信息</router-link>
    <p @click="logout" style="cursor:pointer;">退出</p>
    <hr>
    
    <h2>state</h2>
    <div>
      <p>普通方式: {{ $store.state.count }} <button @click="add">+1</button></p>
      <p>mapState方式: {{ count }}</p>
      <p>mapState+局部状态方式: {{ finalCount }}</p>
      <p>{{ txt }}</p>
    </div>

    <h2>getter</h2>
    <div>
      <p>普通方式: {{ doneTodosCount }}</p>
      <p>文艺方式: {{ $store.getters.doneTodosLength }}</p>
      <p>查询方式: {{ $store.getters.getTodoById(2) }}</p>
      <p>mapGetter方式(同名): {{ doneTodosLength }}</p>
      <p>mapGetter方式(不同名): {{ doneCount }}</p>
      <p>mapGetter方式+查询: {{ getTodoById(2) }}</p>
    </div>

    <h2>mutations</h2>
    <div>
      <p>{{ num }}</p>
      普通方式: <button @click="add0">+10</button><br>
      mapMutations方式(同名)：<button @click="plus">+10</button><br>
      mapMutations方式(不同名)<button @click="jian">-1</button><br>
      mapMutations方式(不同名)+局部状态<button @click="add(localNum)">增加</button>
    </div>

    <h2>action</h2>
    <div>
      <p>{{ num }}</p>
      <p>普通方式: <button @click="$store.dispatch('plusAsyc')">2秒中后+10</button></p>
      <p>mapActions方式(同名): <button @click="plusAsyc">2秒中后+10</button></p>
      <p>mapActions方式(不同名): 略</p>
      <p>mapActions方式(同名)+局部状态: <button @click="addAsyc(localNum)">2秒中后增加</button></p>
    </div>

    <h2>组合action</h2>
    <div>
      <p>{{ num }}</p>
      <p>单独的action与then：<button @click="actionA().then(()=>{showWord('haha')})">2s后+10然后显示'哈哈'</button><span>{{ word }}</span></p>
      <p>两个action结合：<button @click="actionB">先2s后+10, 然后1s后-1</button></p>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
export default {
  name: 'home',
  data () {
    return {
      msg: 'I am home page',
      token: '',
      localCount: 10,
      localNum: 5,
      word: ''
    }
  },
  computed: {
    ...mapState({
      // 箭头函数可使代码更简练
      // count: state => state.count
      
      // 传字符串参数 'count' 等同于 `state => state.count`
      count: 'count',

      //为了能够使用 `this` 获取局部状态，必须使用常规函数
      finalCount(state){
        return state.count + this.localCount;
      }
    }),
    //当映射的计算属性的名称与 state 的子节点名称相同时，我们也可以给 mapState 传一个字符串数组。
    ...mapState([
      'txt', 'num'
    ]),
    doneTodosCount(){
      return this.$store.state.todos.filter(todo => todo.done).length
    },
    ...mapGetters([
      'doneTodosLength',
      'getTodoById'
    ]),
    ...mapGetters({
      doneCount: 'doneTodosLength'
    })
  },
  methods: {
    logout(){
      this.$store.commit('logout');
      this.$router.replace('/login');
    },
    add(){
      this.$store.commit('increment');
    },
    add0(){
      this.$store.commit('plus');
    },
    ...mapMutations([
      'plus','add'
    ]),
    ...mapMutations({
      jian: 'struc'
    }),
    ...mapActions([
      'plusAsyc', 'addAsyc', 'actionA', 'actionB'
    ]),
    showWord(txt){
      this.word = txt;
    }
  }
}
</script>
<style scoped>
h1{
  font-weight: normal;color: red;font-size: 24px;
}
.home{background:pink;}
</style>
