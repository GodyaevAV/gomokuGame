<template>
  <div id="app">
    <Auth @game="authComponentActive = false" v-if="authComponentActive"></Auth>
    <Game @game="newGame" v-else></Game>
  </div>
</template>

<script>
import Auth from './components/Auth'
import Game from './components/Game'

export default {
  name: 'App',
  components: {
    Auth, Game
  },
  data: function () {
    return {
      authComponentActive: true
    }
  },
  methods: {
    newGame () {
      this.$store.dispatch('clear')
      this.authComponentActive = true
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  text-align: center;
}
  body{
    overflow: hidden;
    background-color: #F5F5DC;
  }

  @media (max-width: 640px) {
  #app {
    width: 90%;
  }
  }
</style>
