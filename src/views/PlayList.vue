<template>
  <div class="player-wrap">
    <h3 class="title">{{zjName}}</h3>

    <div>
      <Aplayer
        ref="player"
        class="player"
        :showLrc="true"
        repeat="repeat-all"
        :music="aplayerList[0]"
        :autoplay="true"
        :list="aplayerList"
        listMaxHeight="75vh"
        theme="pic"
      />
    </div>

    <div>
      <PlayListSelector />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Ref, Watch } from 'vue-property-decorator'
import { State } from 'vuex-class'
import { getUrlQuery } from '@/utils/url'
import PlayListSelector from '../components/PlayListSelector.vue'
const Aplayer = () => import('vue-aplayer')

function _isMobile (): boolean {
  return /(phone|pad|pod|ios|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i.test(navigator.userAgent)
}

function _alert (msg: string) {
  let iframe = document.createElement('IFRAME')
  iframe.style.display = 'none'
  iframe.setAttribute('src', 'data:text/plain,')
  document.documentElement.appendChild(iframe)
  window.frames[0].window.alert(msg)
  iframe.parentNode!.removeChild(iframe)
}

@Component({
  components: {
    Aplayer,
    PlayListSelector
  }
})
export default class VueComp extends Vue {
  @Ref() player!: typeof Aplayer;
  @State('jayAll') jayAll!: ZJ[]

  shareSN = Number(getUrlQuery('shareSN'))

  get shareMusic () {
    if (this.shareSN && Array.isArray(this.playlist.songs)) {
      return this.playlist.songs[this.shareSN - 1]
    }
  }

  get zjName (): string {
    return this.$route.params.zjName
  }

  @Watch('zjName', { immediate: true })
  onZJNameChange (name: string) {
    document.title = this.shareMusic ? this.shareMusic.name.replace('.mp3', '') : `《${name}》- 周杰伦`
  }

  get playlist (): ZJ {
    return this.jayAll.find((item: ZJ) => item.zj === this.zjName) || {} as ZJ
  }

  get aplayerList (): AplayerMusic[] {
    const musics = this.shareMusic ? [this.shareMusic] : this.playlist.songs

    return musics.map(song => ({
      src: song.url,
      title: song.name.replace(/周杰伦 - |\.mp3|\d+\.? ?/g, ''),
      artist: '周杰伦',
      pic: this.playlist.folderImg,
      lrc: song.url.replace('.mp3', '.lrc')
    }))
  }

  @Watch('aplayerList')
  onPlayerListChange (ls: AplayerMusic[]) {
    (this.player as any).shuffledList = ls
  }

  mounted () {
    if (this.shareMusic && _isMobile() && !localStorage.getItem('trafficWarn')) {
      _alert(
        '为了保证音质，本站使用 8~12MB 的音乐文件。' +
        '由于移动端无法缓存音频，因此在享用过程中，可能会造成你的流量浪费。' +
        '强烈建议在电脑端享用！土豪和 WIFI 请无视。')
      localStorage.setItem('trafficWarn', 'true')
    }
  }
}
</script>

<style lang="stylus" scoped>
.title {
  margin: 20px;
  font-size: 18px;
  font-weight: bold;
}

.player {
  margin: 20px auto;
  box-shadow: 3px 12px 35px rgba(130, 130, 130, 0.4);
  max-width: 500px;
}

/deep/ .aplayer-list ol li .aplayer-list-index {
  min-width: 14px;
  text-align: center;
}
</style>
