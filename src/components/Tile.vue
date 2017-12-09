<template>
  <el-button
    :type="getBtnType()" class="Tile"
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
// NOTE tileType
// 0 - normal, 1 - special, 2 - disabled, 3 - warning

export default {
  name: 'Tile',
  props: ['tileLength', 'content', 'index', 'tileClicked', 'tileType'],
  methods: {
    getContentColor (content) {
      const colors = ['#483D8B', '#8B0000', '#4B0082', '#0000CD', '#808000', '#8B4513']
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
    getBtnType () {
      if (this.tileType === 0) {
        return 'primary'
      } else if (this.tileType === 1) {
        return 'success'
      } else if (this.tileType === 2) {
        return 'info'
      } else { // 3
        return 'warning'
      }
    },
    handleClick (event) {
      this.tileClicked(this.index)
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
