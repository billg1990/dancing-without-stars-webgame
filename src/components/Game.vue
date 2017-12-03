<template>
  <div class="Game">
    <div>
      <el-container>
        <el-main>
          <img style="width: 85%; height: 65%;"
            src="../assets/1200px-Dancing_without_the_Stars_Title_Logo.svg.png">
        </el-main>
        <el-main>
          <div class="block">
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
                color: '#A52A2A'
              }">hell - 15 x 15, 5 color groups, 5 dancers each group</el-col>
            </el-row>
            <el-slider v-model="gameLevel" :max="3"
              :format-tooltip="levelFormatTooltip" show-stops>
            </el-slider>
          </div>
          <el-button @click="openGamePanel" size="large" type="primary"
            style="width: 20vw; background-color: #2F4F4F;">ENTER</el-button>
        </el-main>
        <el-footer>
          <el-button @click="aboutDialogVisible = true" type="text">
            <h3 style="color: #2c3e50">About</h3>
          </el-button>
          <h3 style="color: #2c3e50">Copyright 2017 Taikun Guo</h3>
        </el-footer>
      </el-container>
    </div>
    <!-- about modal -->
    <div>
      <el-dialog
        title="About"
        :visible.sync="aboutDialogVisible"
        width="40%"
        height="70%">
        <div>
          This is my final project of 2017 Fall NYU Heuristic Problem Solving class.
        </div>
        <div>License: MIT</div>
        <div>Github: <a :href="githubUrl">{{ githubUrl }}</a></div>
      </el-dialog>
    </div>
    <!-- the game panel -->
    <el-dialog :title="gameStatus" :visible.sync="gamePanelVisible" :fullscreen="true" :before-close="handleCancel">
      <el-container>
        <el-main>
          <Board
            :boardLength="vhTOpx(70)"
            :tiles="tiles"
            :tileTypes="tileTypes"
            :tileClicked="tileClicked">
          </Board>
        </el-main>
        <el-footer>
          <el-button type="success" size="large" :disabled="disableMainBtn" round
            @click="handleMainBtn()">{{ mainBtnText }}
          </el-button>
        </el-footer>
      </el-container>
    </el-dialog>
  </div>
</template>

<script>
import Board from './Board'
import Game from '../core/game'

export default {
  name: 'Game',
  components: {
    'Board': Board
  },
  data () {
    return {
      spoiler: '',
      choreographer: '',
      githubUrl: 'https://github.com/billg1990/dancing-without-stars-webgame',
      aboutDialogVisible: false,
      gamePanelVisible: false,
      // Initialized
      // Spoiler
      // SpoilerFinish
      // Choreographer
      // Finish
      gameStatus: 'Initialized',
      mainBtnText: 'GO!',
      disableMainBtn: false,
      gameLevel: 0,
      game: null,
      maxNumOfStars: 0,
      tiles: [],
      tileTypes: []
    }
  },
  methods: {
    openGamePanel () {
      // initialize game
      let gameParams = this.getGameParams()
      this.game = new Game(gameParams.size, gameParams.groups, gameParams.dancers)
      // set max num of stars
      this.maxNumOfStars = this.game.k
      // refresh
      this.refreshBoard()
      this.gamePanelVisible = true
    },
    refreshBoard () {
      this.tileTypes = this.game.getTileTypes()
      let newBoard = []
      for (let i in this.game.getBoard()) {
        newBoard.push(this.game.getBoard()[i])
      }
      this.tiles = newBoard
    },
    handleMainBtn () {
      if (this.gameStatus === 'Initialized') {
        this.startPose()
      } else if (this.gameStatus === 'Spoiler') {
        // finish Spoiler
        this.donePose()
      } else if (this.gameStatus === 'SpoilerFinish') {
        // choreographer start
        this.startChoreographer()
      } else if (this.gameStatus === 'Finish') {
        this.resetGame()
      }
    },
    handleCancel (done) {
      // reset everything
      this.resetGame()
      done()
    },
    levelFormatTooltip (value) {
      if (value === 0) return 'easy'
      else if (value === 1) return 'intermediate'
      else if (value === 2) return 'hard'
      else return 'hell'
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
    tileClicked (index) {
      if (this.gameStatus === 'Spoiler') {
        let change = this.game.toggleStar(index)
        this.numOfStars += change
        this.refreshBoard()
      } else if (this.gameStatus === 'Choreographer') {
        let finished = this.game.toggleDancer(index)
        this.refreshBoard()
        if (finished) {
          this.choreoFinish()
        }
      }
    },
    getGameParams () {
      if (this.gameLevel === 0) {
        return {
          size: 5,
          groups: 2,
          dancers: 2
        }
      } else if (this.gameLevel === 1) {
        return {
          size: 5,
          groups: 2,
          dancers: 4
        }
      } else if (this.gameLevel === 2) {
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
    startPose () {
      this.gameStatus = 'Spoiler'
      // generate dancers
      this.game.generateDancers()
      // refresh board
      this.refreshBoard()
      // change btn text
      this.mainBtnText = 'FINISH'
      // TODO start timer
    },
    donePose () {
      this.gameStatus = 'SpoilerFinish'
      this.game.donePose()
      this.refreshBoard()
      this.mainBtnText = 'Dance!'
    },
    startChoreographer () {
      this.disableMainBtn = true
      this.gameStatus = 'Choreographer'
      this.game.startSolve()
      this.refreshBoard()
    },
    choreoFinish () {
      this.gameStatus = 'Finish'
      this.disableMainBtn = false
      this.mainBtnText = 'A new game!'
    },
    resetGame () {
      this.gameStatus = 'Initialized'
      this.mainBtnText = 'GO!'
      this.disableMainBtn = false
      let gameParams = this.getGameParams()
      this.game = new Game(gameParams.size, gameParams.groups, gameParams.dancers)
      this.refreshBoard()
    }
  }
}
</script>
