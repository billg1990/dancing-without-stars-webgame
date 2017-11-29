<template>
  <el-button-group class="Board"
    :style="{
      width: this.boardLength + Math.sqrt(this.tiles.length) * 1 + 1 + 'px',
      height: this.boardLength + Math.sqrt(this.tiles.length) * 2 + 'px'
    }"
  >
    <Tile
      v-for="(tile, index) in tiles"
      :tile="tile"
      :index="index"
      :key="index"
      :tileLength="boardLength / Math.sqrt(tiles.length)" :content="tile"
      :tileClicked="tileClicked"
    ></Tile>
  </el-button-group>
</template>

<script>
import Tile from './Tile'

export default {
  name: 'Board',
  props: ['boardLength', 'tiles', 'tileClicked'],
  components: {
    'Tile': Tile
  }
}
</script>

<style>
.Board {
  border:1px solid black;
  box-sizing: unset;
}
</style>
