<template>
  <el-button-group class="Board"
    :style="{
      width: this.boardLength + this.boardSize * 1 + 1 + 'px',
      height: this.boardLength + this.boardSize * 2 + 'px'
    }"
  >
    <Tile
      v-for="(tile, index) in tiles"
      v-bind:tile="tile"
      v-bind:index="index"
      v-bind:key="index"
      v-bind:tileLength="boardLength / boardSize" :content="tile"
    ></Tile>
  </el-button-group>
</template>

<script>
import Tile from './Tile'

export default {
  name: 'Board',
  props: ['boardSize', 'boardLength'],
  components: {
    'Tile': Tile
  },
  data () {
    return {
      tiles: []
    }
  },
  created () {
    for (let i = 0; i < this.boardSize * this.boardSize; i++) {
      this.tiles.push('1')
    }
  }
}
</script>

<style>
.Board {
  border:1px solid black;
  box-sizing: unset;
}
</style>
