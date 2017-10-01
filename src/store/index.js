import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		userInfo: {},
		token: null,
		count: 0,
		txt: 'Hi',
		todos: [
			{id:1, do:'make a test', done: true},
			{id:2, do:'make a test2', done: false},
			{id:3, do:'make a project', done: true}
		],
		num: 100
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
	mutations: {
		isLogin(state, data){
			localStorage.token = data.token;
			localStorage.info = JSON.stringify(data.info);
			state.token = data.token;
			state.userInfo = data.info;
		},
		logout(state){
			localStorage.removeItem('token');
			localStorage.removeItem('info');
			state.token = null;
			state.userInfo = {};
		},
		increment(state){
			state.count++;
		},
		add(state, n=1){
			state.num += n;
		},
		plus(state){
			state.num += 10;
		},
		struc(state){
			state.num -= 1;
		}
	},
	actions: {
		plusAsyc({commit}){
			setTimeout(() => { commit('plus') }, 2000);
		},
		addAsyc({commit}, n){
			setTimeout(() => { commit('add', n) }, 2000);
		},
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
})