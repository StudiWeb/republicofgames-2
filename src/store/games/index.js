import database from '../../firebase/database/database'
import { ref, get, child } from 'firebase/database'

export default {
  namespaced: true,
  state() {
    return {
      games: []
    }
  },

  mutations: {
    addNewGame(state, game) {
      state.games.push(game)
    }
  },

  actions: {
    addNewGame(context, game) {
      context.commit('addNewGame', game)
    }
  },

  getters: {
    //loads game ids and title which both are unique identificators of a game
    async loadGames(state) {
      await get(child(ref(database), 'games'))
        .then((snapshot) => {
          if (snapshot.exists()) {
            for (const id in snapshot.val()) {
              state.games.push({
                id: id,
                title: snapshot.val()[id].title
              })
            }
          } else {
            console.log('No data available')
          }
        })
        .catch((error) => {
          console.error(error)
        })
    },

    games(state) {
      return state.games
    },

    gameTitles(state) {
      let titles = []
      state.games.forEach((game) => {
        titles.push(game.title)
      })
      return titles
    }
  }
}
