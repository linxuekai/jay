interface Music {
  name: string,
  url: string,
  size: number
}

interface ZJ {
  year: number,
  zj: string,
  folderImg: string,
  songs: Music[]
}

declare module 'vue-aplayer' {
  import Vue from 'vue'
  export default Vue
}

interface AplayerMusic {
  src: string,
  title: string,
  artist: string,
  pic: string,
  lrc: string
}
