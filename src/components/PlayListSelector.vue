<template>
  <div>
    <img v-if="isHidden" src="../assets/music.png" class="open-icon" @click="isHidden = false">
    <div
      class="playlist-selector"
      :class="{hidden: isHidden}"
    >
      <img
        src="../assets/close.png"
        class="close-icon"
        @click="isHidden = true"
      >
      <div class="folder-wrap">
        <Folder
          @click.native="$router.replace(`/${zj.zj}`)"
          v-for="zj in jayAll"
          :key="zj.zj"
          :zj="zj"
          :class="{active: zj.zj === $route.params.zjName}"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { State } from 'vuex-class'
import Folder from './Foler.vue'

@Component({
  components: {
    Folder
  }
})
export default class PlayListSelector extends Vue {
  @State('jayAll') jayAll!: ZJ[]

  isHidden: boolean = true
}
</script>

<style lang="stylus" scoped>
.playlist-selector
  position fixed
  z-index 1
  bottom 0
  right 0
  left 0
  background-color rgba(0, 0, 0, .7)
  overflow auto
  white-space nowrap
  padding 60px 0 40px
  transition .3s

.playlist-selector.hidden
  transform translateY(100%)

.zj
  border-radius 50%
  padding 5px
  box-shadow 0 0 0 4px #555, 2px 4px 15px #000, 0 0 0 6px #fff
  margin 0 20px
  overflow hidden

  /deep/ .folder
    width 120px
    height 120px

  /deep/ .zj-name
    font-size 16px

.zj.active
  animation rotate 20s infinite linear

@keyframes rotate
  0%
    transform rotate(0)
  50%
    transform rotate(180deg)
  100%
    transform rotate(360deg)

.close-icon
  position fixed
  width 28px
  height 28px
  bottom 200px
  right 5px
  z-index 2

.open-icon {
  position fixed
  right 15px
  bottom 20px
  width 50px
  height 50px
  box-shadow 0 0 0 2px #d81e06, 2px 4px 8px #333
  border-radius 50%
}
</style>
