<template>
  <div class="player-wrap">
    <h3 class="title">{{zjName}}</h3>

    <div>
      <Aplayer
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
import { Vue, Component } from 'vue-property-decorator'
import { State } from 'vuex-class'

import PlayListSelector from '../components/PlayListSelector.vue'
const Aplayer = () => import('vue-aplayer')

function _isMobile (): boolean {
  return /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i.test(navigator.userAgent)
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

  mounted () {
    if (_isMobile() && !localStorage.getItem('trafficWarn')) {
      _alert('本网站已经做了很好的缓存策略，但音频体积较大；请留意你宝贵的流量，土豪和 WIFI 请无视。')
      localStorage.setItem('trafficWarn', 'true')
    }
  }
}
</script>

<style lang="stylus" scoped>
.title
  margin 20px
  font-size 18px
  font-weight bold

.player
  margin 20px auto
  box-shadow 3px 12px 35px rgba(130, 130, 130, .4)
  max-width 500px

/deep/ .aplayer-list ol li .aplayer-list-index
  min-width 14px
  text-align center
</style>
