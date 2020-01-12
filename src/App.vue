<template>
  <div id="app">
    <div class="bg"></div>
    <router-view/>
  </div>
</template>

<style lang="stylus">
#app
  font-family 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50

.bg
  position fixed
  top 0
  right 0
  bottom 0
  left 0
  background  linear-gradient(120deg, pink, skyblue)

</style>
