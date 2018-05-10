<template>
<div>
    <div class="title">Игрок {{number}}, введите ваше имя</div>
    <div class="form"><input type="text" v-model="name" @keyup.enter="setName"></div>
    <div class="button"><button @ @click="setName">Подтвердить</button></div>
</div>
</template>

<script>
export default {
  name: 'Auth',
  data () {
    return {
      number: 1,
      name: ''
    }
  },
  methods: {
    setName () {
      this.$store.dispatch('setUserName', {name: this.name || `Игрок${this.number}`, index: this.number})
      if (this.number === 1) {
        this.number++
      } else {
        this.$emit('game')
      }
      this.name = ''
    }
  }
}
</script>

<style scoped>
.title {
  font-size: 16px;
  margin-bottom: 10px;
}
  .form{
    width: auto;
    margin-bottom: 10px;
  }
</style>
