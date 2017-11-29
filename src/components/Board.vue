<template>
  <el-button-group class="Board"
    :style="{
      width: this.boardLength + this.boardSize * 1 + 1 + 'px',
      height: this.boardLength + this.boardSize * 2 + 'px'
    }"
  >
    <Tile
      v-for="(tile, index) in tiles"
      :tile="tile"
      :index="index"
      :key="index"
      :tileLength="boardLength / boardSize" :content="tile"
      :tileClicked="tileClicked"
    ></Tile>
  </el-button-group>
</template>

<script>
import Tile from './Tile'

export default {
  name: 'Board',
  props: ['boardSize', 'boardLength', 'tiles', 'tileClicked'],
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
