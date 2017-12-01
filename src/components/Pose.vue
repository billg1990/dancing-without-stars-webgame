<template>
  <div class="Pose">
    <el-form :model="gameSettings" :rules="rules" ref="gameSettings" label-width="120px">
      <el-form-item label="Give it a name" prop="name">
        <el-input v-model="gameSettings.name"></el-input>
      </el-form-item>
      <el-row>
        <el-col :style="{
          fontWeight: 'bold',
          color: '#006400'
        }">easy - 5 x 5, 2 color groups, 2 dancers each group</el-col>
        <el-col :style="{
          fontWeight: 'bold',
          color: '#FFD700'
        }">intermediate - 10 x 10, 2 color groups, 4 dancers each group</el-col>
        <el-col :style="{
          fontWeight: 'bold',
          color: '#FFA500'
        }">hard - 10 x 10, 4 color groups, 4 dancers each group</el-col>
        <el-col :style="{
          fontWeight: 'bold',
          color: '#FF0000'
        }">hell - 15 x 15, 5 color groups, 5 dancers each group</el-col>
      </el-row>
      <el-form-item label="Difficulty level" prop="level">
        <el-slider v-model="gameSettings.level" :max="3" :format-tooltip="levelFormatTooltip" show-stops></el-slider>
      </el-form-item>
    </el-form>
    <el-button type="primary" :loading="beginBtnLoading" @click="createGame('gameSettings')">Create</el-button>
    <!-- the create game panel -->
    <el-dialog title="Create a game" :visible.sync="panelVisible" :fullscreen="true" :before-close="handleCancel">
      <el-container>
        <el-header :style="{ height: '5vh' }">
          <el-button type="success" size="large" round @click="start()">{{ startBtnText }}</el-button>
        </el-header>
        <el-main>
          <Board
            :boardLength="vhTOpx(70)"
            :tiles="tiles"
            :tileTypes="tileTypes"
            :tileClicked="tileClicked"
          ></Board>
        </el-main>
      </el-container>
    </el-dialog>
  </div>
</template>

<script>
import Board from './Board'
import Game from '../core/game'

export default {
  name: 'Pose',
  components: {
    'Board': Board
  },
  data () {
    return {
      // Initialized - When the board is initialized
      // Started - When poser clicked GO!, generate dancers and begin counting
      // Finished - When timeout or poser clicked on FINISH
      status: 'Initialized',
      gameSettings: {
        name: '', // challenage name, can be duplicates
        level: 0 // 0 - easy, 1 - intermediate, 2 - hard, 3 - hell
      },
      rules: {
        name: [
          // make sure it contains something other than spaces
          { required: true, pattern: /\S.*/, message: 'Please type your game name', trigger: 'blur' }
        ]
      },
      beginBtnLoading: false,
      panelVisible: false,
      startBtnText: 'GO!',
      game: null,
      tiles: [],
      tileTypes: []
    }
  },
  methods: {
    getGameParams () {
      if (this.gameSettings.level === 0) {
        return {
          size: 5,
          groups: 2,
          dancers: 2
        }
      } else if (this.gameSettings.level === 1) {
        return {
          size: 5,
          groups: 2,
          dancers: 4
        }
      } else if (this.gameSettings.level === 2) {
        return {
          size: 10,
          groups: 4,
          dancers: 4
        }
      } else { // 3
        return {
          size: 15,
          groups: 5,
          dancers: 5
        }
      }
    },
    createGame (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.beginBtnLoading = true
          // initialize game
          let gameParams = this.getGameParams()
          this.game = new Game(gameParams.size, gameParams.groups, gameParams.dancers)
          this.startBtnText = 'GO!'
          // refresh
          this.refreshBoard()
          this.panelVisible = true
          this.beginBtnLoading = false
        }
      })
    },
    start () {
      this.status = 'Started'
      // generate dancers
      this.game.generateDancers()
      // refresh board
      this.refreshBoard()
      // change btn text
      this.startBtnText = 'FINISH'
      // TODO start timer
    },
    refreshBoard () {
      this.tileTypes = this.game.getTileTypes()
      let newBoard = []
      for (let i in this.game.getBoard()) {
        newBoard.push(this.game.getBoard()[i])
      }
      this.tiles = newBoard
    },
    vhTOpx (value) {
      const w = window
      const d = document
      const e = d.documentElement
      const g = d.getElementsByTagName('body')[0]
      const y = w.innerHeight || e.clientHeight || g.clientHeight
      const result = (y * value) / 100
      return result
    },
    handleCancel (done) {
      done()
    },
    levelFormatTooltip (value) {
      if (value === 0) return 'easy'
      else if (value === 1) return 'intermediate'
      else if (value === 2) return 'hard'
      else return 'hell'
    },
    tileClicked (index) {
      if (this.status === 'Initialized') {
        // pass, do nothing
      } else if (this.status === 'Started') {
        this.game.toggleStar(index)
        this.refreshBoard()
      }
    }
  }
}
</script>
