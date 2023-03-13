import { database } from '../../firebase'
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
    },

    updateGameData(state, data) {
      const id = data.id
      const title = data.title
      const developer = data.developer
      const publisher = data.publisher
      const genre = data.genre

      const game = state.games.find((game) => game.id === id)
      game.title = title
      game.developer = developer
      game.publisher = publisher
      game.genre = genre
    }
  },

  actions: {
    addNewGame(context, game) {
      context.commit('addNewGame', game)
    },

    updateGameData(context, data) {
      context.commit('updateGameData', data)
    }
  },

  getters: {
    async loadGames(state) {
      await get(child(ref(database), 'games'))
        .then((snapshot) => {
          if (snapshot.exists()) {
            for (const id in snapshot.val()) {
              state.games.push({
                id: id,
                title: snapshot.val()[id].title,
                developer: snapshot.val()[id].developer,
                publisher: snapshot.val()[id].publisher,
                genre: snapshot.val()[id].genre
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
