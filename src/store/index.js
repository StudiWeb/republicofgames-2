import { createStore } from 'vuex'
import games from './games'

const strore = createStore({
  modules: {
    games: games
  }
})

export default strore
