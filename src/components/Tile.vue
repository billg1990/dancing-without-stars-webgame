<template>
  <el-button type="primary" class="Tile"
    :style="{ width: this.width, height: this.height }"
  >
    <span :style="{ fontSize: '15vw', color: getContentColor(this.content) }">{{ this.content }}</span>
  </el-button>
</template>

<script>
export default {
  name: 'Tile',
  props: ['width', 'height', 'content'],
  methods: {
    getContentColor (content) {
      const colors = ['red', 'blue', 'green', 'orange', 'purple', 'chocolate', 'pink', 'yellow']
      if (content === '#' || content === '') {
        return 'black'
      }
      let groupIndex = parseInt(content)
      if (groupIndex <= 8) {
        return colors[groupIndex - 1]
      } else {
        return 'black'
      }
    }
  }
}
</script>

<style>
.Tile {
  box-sizing: unset;
  text-align: center;
  font-weight: bold;
  border:1px solid black;
}
</style>
