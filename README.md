# Vuex [参考文档](https://vuex.vuejs.org/zh-cn/intro.html)
> Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化
> 每一个 Vuex 应用的核心就是 store（仓库）。“store”基本上就是一个容器，它包含着你的应用中大部分的状态 (state)。Vuex 和单纯的全局对象有以下两点不同:
> - 1.Vuex 的状态存储是响应式的。当 Vue 组件从 store 中读取状态的时候，若 store 中的状态发生变化，那么相应的组件也会相应地得到高效更新
> - 2.你不能直接改变 store 中的状态。改变 store 中的状态的唯一途径就是显式地提交 (commit) mutation。这样使得我们可以方便地跟踪每一个状态的变化，从而让我们能够实现一些工具帮助我们更好地了解我们的应用

## 使用
> 1.安装: npm install vuex --save-dev
> 2.在src下创建文件store.js

### state
> 由于 Vuex 的状态存储是响应式的，从 store 实例中读取状态最简单的方法就是在计算属性中返回某个状态
```
computed: {
    count () {
      return this.$store.state.count
    }
  }
```
> 使用mapState
```
<div>
    <p>普通方式: {{ $store.state.count }} <button @click="add">+1</button></p>
    <p>mapState方式: {{ count }}</p>
    <p>mapState+局部状态方式: {{ finalCount }}</p>
    <p>{{ txt }}</p>
</div>
data: {
  return {localCount: 10}
}
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
      'txt'
    ])
  },
}
```

### getter
> 有时候我们需要从 store 中的 state 中派生出一些状态，例如对列表进行过滤并计数
> **注意，在getter里面不要使用箭头函数**
```
//store
state: {
    todos: [
      {id:1, do:'make a test', done: true},
      {id:2, do:'make a test2', done: false},
      {id:3, do:'make a project', done: true}
    ]
},
getters: {
    doneTodosLength(state){
      return state.todos.filter(todo => todo.done).length;
    },
    //可以通过让 getter 返回一个函数，来实现给 getter 传参。在你对 store 里的数组进行查询时非常有用
    getTodoById(state){
      return function(id){
        return state.todos.find(todo => todo.id == id);
      };
    }
},
//组件
<div>
   <p>普通方式: {{ doneTodosCount }}</p>
   <p>文艺方式: {{ $store.getters.doneTodosLength }}</p>
   <p>查询方式: {{ $store.getters.getTodoById(2) }}</p>
   <p>mapGetter方式(同名): {{ doneTodosLength }}</p>
   <p>mapGetter方式(不同名): {{ doneCount }}</p>
   <p>mapGetter方式+查询: {{ getTodoById(2) }}</p>
</div>
computed: {
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
}
```

### mutation
> 更改 Vuex 的 store 中的状态的唯一方法是提交 mutation。
> Vuex 中的 mutation 非常类似于事件：每个mutation都有一个字符串的事件类型(type)和一个回调函数(handler),
> 这个回调函数就是我们实际进行状态更改的地方，并且它会接受 state 作为第一个参数
> **注意：mutation必须是同步函数**
```
//store
state: {
  num: 100
}
mutations: {
  add(state, n=1){
      state.num += n;
    },
  plus(state){
    state.num += 10;
  },
  struc(state){
    state.num -= 1;
  }
}
//组件
<div>
  <p>{{ num }}</p>
  普通方式: <button @click="add0">+10</button><br>
  mapMutations方式(同名)：<button @click="plus">+10</button><br>
  mapMutations方式(不同名)<button @click="jian">-1</button><br>
  mapMutations方式(不同名)+局部状态<button @click="add(localNum)">增加</button>
</div>
computed: {
  ...mapState(['num'])
},
methods: {
    add0(){
      this.$store.commit('plus');
    },
    ...mapMutations([
      'plus','add'
    ]),
    ...mapMutations({
      jian: 'struc'
    })
}
```

### action（类似mutation，异步）
> - action 提交的是 mutation，而不是直接变更状态
> - action 可以包含任意异步操作
> 在组件里面，以this.$store.dispatch('actionName')触发

```
//store
actions: {
    plusAsyc({commit}){
      setTimeout(() => { commit('plus') }, 2000);
    },
    addAsyc({commit}, n){
      setTimeout(() => { commit('add', n) }, 2000);
    }
}
//组件
<div>
  <p>{{ num }}</p>
  <p>普通方式: <button @click="$store.dispatch('plusAsyc')">2秒中后+10</button></p>
  <p>mapActions方式(同名): <button @click="plusAsyc">2秒中后+10</button></p>
  <p>mapActions方式(不同名): 略</p>
  <p>mapActions方式(同名)+局部状态: <button @click="addAsyc(localNum)">2秒中后增加</button></p>
</div>
methods: {
  ...mapActions([
      'plusAsyc', 'addAsyc'
  ])
}
```
#### 组合action
> 问题1：Action 通常是异步的，那么如何知道 action 什么时候结束呢？
> 问题2：如何才能组合多个 action，以处理更加复杂的异步流程
> 实现: store.dispatch 可以处理被触发的 action 的处理函数返回的 Promise，并且 store.dispatch 仍旧返回 Promise
```
//store
actions: {
  actionA({commit}){
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        commit('plus');
        resolve();
      }, 2000);
    });
  },
  actionB({dispatch, commit}){
    return dispatch('actionA').then(() => {
      setTimeout(() => commit('struc'), 1000);
    });
  }
}
//组件
<div>
  <p>{{ num }}</p>
  <p>单独的action与then：<button @click="actionA().then(()=>{showWord('haha')})">2s后+10然后显示'哈哈'</button><span>{{ word }}</span></p>
  <p>两个action结合：<button @click="actionB">先2s后+10, 然后1s后-1</button></p>
</div>
 methods: {
    ...mapActions([
      'actionA', 'actionB'
    ]),
    showWord(txt){
      this.word = txt;
    }
}
```

# Module（vuex模块化，不建议使用）
> 由于使用单一状态树，应用的所有状态会集中到一个比较大的对象。当应用变得非常复杂时，store 对象就有可能变得相当臃肿
> 为了解决以上问题，Vuex 允许我们将 store 分割成模块（module）。每个模块拥有自己的 state、mutation、action、getter、甚至是嵌套子模块——从上至下进行同样方式的分割

```
const moduleA = {
  state: { ... },
  mutations: { ... },
  actions: { ... },
  getters: { ... }
}
const moduleB = {
  state: { ... },
  mutations: { ... },
  actions: { ... }
}
const store = new Vuex.Store({
  modules: {
    a: moduleA,
    b: moduleB
  }
})
//获取时
store.state.a // -> moduleA 的状态
store.state.b // -> moduleB 的状态
```
