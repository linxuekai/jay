<template>
  <div class="zj">
    <img
      :src="zj.folderImg"
      alt=""
      class="folder"
    >
    <div class="zj-name">
      <div>{{zj.zj}}</div>
      <div class="year">{{zj.year}}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class Folder extends Vue {
  @Prop() zj!: ZJ
}
</script>

<style lang="stylus" scoped>
.zj
  text-align center
  display inline-block
  overflow auto
  position relative
  box-shadow 2px 5px 15px #666
  border-radius 6px
  padding 8px

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
