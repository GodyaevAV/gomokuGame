import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    firstUser: {
      name: '',
      dotArray: []
    },
    secondUser: {
      name: '',
      dotArray: []
    }
  },
  mutations: {
    setUserName (state, object) {
      object.index === 1 ? state.firstUser.name = object.name : state.secondUser.name = object.name
    },
    putPoint (state, object) {
      object.index === 1 ? state.firstUser.dotArray.push(object.coordinate) : state.secondUser.dotArray.push(object.coordinate)
    },
    clear (state) {
      state.firstUser.dotArray = []
      state.secondUser.dotArray = []
    }
  },
  actions: {
    setUserName (context, object) {
      context.commit('setUserName', object)
    },
    putPoint (context, object) {
      context.commit('putPoint', object)
    },
    clear (context) {
      context.commit('clear')
    }
  },
  getters: {
    getName: (state) => (number) => {
      return number === 1 ? state.firstUser.name : state.secondUser.name
    },
    getForFirst: (state) => (coordinate) => {
      var flag = false
      state.firstUser.dotArray.map(item => {
        if (item.x === coordinate.x && item.y === coordinate.y) {
          flag = true
        }
      })
      return flag
    },
    getForSecond: (state) => (coordinate) => {
      var flag = false
      state.secondUser.dotArray.map(item => {
        if (item.x === coordinate.x && item.y === coordinate.y) {
          flag = true
        }
      })
      return flag
    },
    getWin: (state) => (index) => {
      function fPlus (newEl, count) {
        if (count === 4) win = true
        arrX.map(elem => {
          if (elem.y + 1 === newEl.y && elem.x + 1 === newEl.x) {
            newEl = elem
            fPlus(newEl, count + 1)
          }
        })
      }
      function fMinus (newEl, count) {
        if (count === 4) win = true
        arrX.map(elem => {
          if (elem.y - 1 === newEl.y && elem.x + 1 === newEl.x) {
            newEl = elem
            fMinus(newEl, count + 1)
          }
        })
      }
      let arrX
      let win = false
      if (index === 1) {
        arrX = state.firstUser.dotArray
      } else {
        arrX = state.secondUser.dotArray
      }
      arrX.map(item => {
        var newArr = []
        arrX.map(elem => {
          if (elem.x === item.x) {
            newArr.push(elem.y)
          }
        })
        newArr.sort(function (a, b) {
          return a - b
        })
        for (let i = 0; i < newArr.length - 4; i++) {
          if (newArr[i + 4] - newArr[i] === 4) {
            win = true
          }
        }
      })
      arrX.map(item => {
        var newArr = []
        arrX.map(elem => {
          if (elem.y === item.y) {
            newArr.push(elem.x)
          }
        })
        newArr.sort(function (a, b) {
          return a - b
        })
        for (let i = 0; i < newArr.length - 4; i++) {
          if (newArr[i + 4] - newArr[i] === 4) {
            win = true
          }
        }
      })
      arrX.map(item => {
        var newEl = item
        arrX.map(elem => {
          if (elem.y + 1 === newEl.y && elem.x + 1 === newEl.x) {
            newEl = elem
            fPlus(newEl, 1)
          }
        })
      })
      arrX.map(item => {
        var newEl = item
        arrX.map(elem => {
          if (elem.y - 1 === newEl.y && elem.x + 1 === newEl.x) {
            newEl = elem
            fMinus(newEl, 1)
          }
        })
      })
      return win
    }
  }
})
