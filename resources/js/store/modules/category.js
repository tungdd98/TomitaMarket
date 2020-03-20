import Axios from "@/plugins/axios"
import foo from '@/configs'

const URL = 'categories'

const state = {
	all: [],
	total: 0,
	currItem: null,
	select: []
}

const getters = {
	getAll: state => {
		return state.all
	},
	getTotalList: state => {
		return state.total
	},
	getCurrItem: state => {
		return state.currItem
	},
	getFilter: state => {
		return {
			per_page: state.per_page,
			order_by: state.order_by,
			order_dir: state.order_dir,
			page: state.page,
		}
	}
}

const actions = {
	/**
	 * Lấy danh sách phần tử
	 */
	getList: async ({ commit, dispatch }) => {
		commit('setLoading', true, { root: true })
		try {
			let result = await Axios.get(`${URL}`)
			commit('setLoading', false, { root: true })
			if(result.status === 200) {
				commit('setList', result.data.data)
				return { flag: true, data: result.data.data }
			}
			return { flag: false }
		} catch (error) {
			console.log(error)
			return { flag: false }
		}
	},
	/**
	 * Thay đổi trạng thái phần tử
	 */
	changeStatus: async ({ commit, dispatch }, data) => {
		try {
			data.status = data.status === 1 ? 0 : 1
			let result = await Axios.patch(`${URL}/${data.id}`, data)
			if(result.status === 200) {
				return { flag: true }
			}
		} catch (error) {
			console.log(error)
			return { flag: false }
		}
	},
	/**
	 * Xoá phần tử
	 */
	deleteItem: async ({ commit, dispatch }, data) => {
		try {
			let result = await Axios.delete(`${URL}/${data.id}`)
			if(result.status === 200) {
				dispatch('getList')
				return { flag: true }
			}
			return { flag: false }
		} catch (error) {
			console.log(error)
			return { flag: false }
		}
	},
	/**
	 * Thêm phần tử
	 */
	createItem: async ({ commit, dispatch }, data) => {
		try {
			let result = await Axios.post(`${URL}`, data)
			if(result.status === 200) {
				dispatch('getList')
				return { flag: true }
			}
			return { flag: false }
		} catch (error) {
			return { flag: false, msg: error }
		}
	},
	/**
	 * Lấy phần tử theo id
	 */
	getItemById: async ({ commit }, { id, setCurrItem = true }) => {
		try {
			let result = await Axios.get(`${URL}/${id}`)
			if(result.status === 200) {
				if(setCurrItem) {
					commit('setCurrItem', result.data.data)
				}
				return { flag: true, data: result.data.data }
			}
			return { flag: false }
		} catch (error) {
			console.log(error)
			return { flag: false }
		}
	},
	/**
	 * Update phần tử
	 */
	updateItem: async ({ commit, dispatch }, data) => {
		try {
			let result = await Axios.post(`${URL}/${data.id}`, data)
			if(result.status === 200) {
				dispatch('getList')
				return { flag: true }
			}
			return { flag: false }
		} catch (error) {
			console.log(error)
			return { flag: false, msg: error }
		}
	},
}

const mutations = {
	setList: (state, data) => {
		state.all = data
	},
	setCurrItem: (state, data) => {
		state.currItem = data
	},
	setSelectItem: (state, data) => {
		state.select = data
	}
}

export default {
	state,
	getters,
	actions,
	mutations,
	namespaced: true
}