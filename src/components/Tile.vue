<template>
  <el-button type="primary" class="Tile"
    :style="{
      width: this.tileLength + 'px',
      height: this.tileLength + 'px',
      fontSize: this.tileLength * 0.6 + 'px',
      color: getContentColor(this.content),
      marginLeft: '0px'
    }"
    @click="handleClick"
    :value="index"
  >{{ this.content }}</el-button>
</template>

<script>
export default {
  name: 'Tile',
  props: ['tileLength', 'content', 'index', 'tileClicked'],
  methods: {
    getContentColor (content) {
      const colors = ['green', 'orange', 'purple', 'chocolate', 'pink', 'blue', 'red', 'yellow']
      if (content === '#' || content === '') {
        return 'black'
      }
      let groupIndex = parseInt(content)
      if (groupIndex <= 8) {
        return colors[groupIndex - 1]
      } else {
        return 'black'
      }
    },
    handleClick (event) {
      this.tileClicked(event.target.value)
    }
  }
}
</script>

<style>
.Tile {
  box-sizing: unset;
  text-align: center;
  font-weight: bold;
  border:1px solid rgba(255,255,255,.5);
  padding: 0px;
  border-radius: 0px;
}
</style>
