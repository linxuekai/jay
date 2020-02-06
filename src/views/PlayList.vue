<template>
  <div>
    <Aplayer
      class="player"
      :showLrc="true"
      repeat="repeat-all"
      :music="aplayerList[0]"
      :autoplay="true"
      :list="aplayerList"
      listMaxHeight="100vh"
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
      title: song.name,
      artist: '周杰伦',
      pic: this.playlist.folderImg,
      lrc: song.url.replace('.mp3', '.lrc')
    }))
  }
}
</script>

<style lang="stylus">
.player {

}
</style>
