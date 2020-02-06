<template>
  <div class="player-wrap">
    <Aplayer
      class="player"
      :showLrc="true"
      repeat="repeat-all"
      :music="aplayerList[0]"
      :autoplay="true"
      :list="aplayerList"
      listMaxHeight="70vh"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { State } from 'vuex-class'
import Aplayer from 'vue-aplayer'

@Component({
  components: {
    Aplayer
  }
})
export default class VueComp extends Vue {
  @State('jayAll') jayAll!: ZJ[]

  get zjName (): string {
    return this.$route.params.zjName
  }

  get playlist (): ZJ {
    return this.jayAll.find((item: ZJ) => item.zj === this.zjName) || {} as ZJ
  }

  get aplayerList (): AplayerMusic[] {
    return this.playlist.songs.map(song => ({
      src: song.url,
      title: song.name.replace(/周杰伦 - |\.mp3|\d+\.? ?/g, ''),
      artist: '周杰伦',
      pic: this.playlist.folderImg,
      lrc: song.url.replace('.mp3', '.lrc')
    }))
  }
}
</script>

<style lang="stylus" scoped>
.player-wrap

.player
  margin 18vh auto 10vh
  box-shadow 3px 12px 35px rgba(130, 130, 130, .4)
  max-width 500px

/deep/ .aplayer-list ol li .aplayer-list-index
  min-width 14px
  text-align center
</style>
