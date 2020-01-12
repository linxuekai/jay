<template>
  <div>
    <div class="zj-wrap"
         v-for="zj in jayAll"
         :key="zj.url">
         <a :href="zj.zj">
                    <div class="zj">
            <img :src="zj.folderImg"
                alt=""
                class="folder">
            <div class="zj-name">
              <div>{{zj.zj}}</div>
              <div class="year">{{zj.year}}</div>
              </div>
         </div>
         </a>
    </div>
  </div>
</template>

<script>
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class Home extends Vue {
  get jayAll () {
    return this.$store.state.jayAll
  }
}
</script>

<style lang="stylus" scoped>
.zj-wrap
  margin 30px 0
  text-align center

.zj
  display inline-block
  overflow auto
  position relative
  box-shadow 2px 5px 15px #666
  border-radius 6px

.folder
  float left
  width 200px
  height: 200px;

.zj-name
  position absolute
  left 0
  right 0
  bottom 20px
  background-color rgba(0, 0, 0, .6)
  font-size 20px
  color #ddd
  font-weight bold
  padding 5px 0

.year
  font-size 14px
  color #aaa
  font-weight normal
</style>
