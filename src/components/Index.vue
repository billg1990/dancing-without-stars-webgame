<template>
  <div class="Index">
    <h2>Welcome {{ $route.params.name }}!</h2>
    <el-tabs type="border-card" v-model="activeName">
      <el-tab-pane label="Play Games" name="play"><GameList></GameList></el-tab-pane>
      <el-tab-pane label="Pose A Game" name="pose"><Pose></Pose></el-tab-pane>
      <el-tab-pane label="How To Play" name="how"><How></How></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import GameList from './List'
import Pose from './Pose'
import How from './How'

export default {
  name: 'Index',
  data () {
    return {
      activeName: 'play'
    }
  },
  components: {
    'GameList': GameList,
    'Pose': Pose,
    'How': How
  }
}
</script>