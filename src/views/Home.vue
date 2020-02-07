<template>
  <div>
    <div
      class="zj-wrap"
      v-for="zj in jayAll"
      :key="zj.url"
    >
      <router-link
        tag="div"
        :to="zj.zj"
      >
        <Folder :zj="zj" />
      </router-link>
    </div>
  </div>
</template>

<script>
import { Vue, Component } from 'vue-property-decorator'
import Folder from '../components/Foler.vue'

@Component({
  components: {
    Folder
  }
})
export default class Home extends Vue {
  get jayAll () {
    return this.$store.state.jayAll
  }
}
</script>

<style lang="stylus" scoped>
.zj-wrap
  margin 30px 0
</style>
