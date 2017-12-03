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
          <h3 style="color: #00FFFF">Use a mouse for better experience.</h3>
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
          Dancing without the stars 2017.
        </div>
        <div>License: MIT</div>
      </el-dialog>
    </div>
    <!-- the game panel -->
    <el-dialog :title="gameStatus" :visible.sync="gamePanelVisible" :fullscreen="true" :before-close="handleCancel">
      <el-container>
        <el-header>
          <el-row :gutter="20" style="font-weight: bold;">
            <el-col :span="6">
              <span style="color: #A52A2A;">timer: {{ time > 0 ? time.toFixed(2) : '0.00' }}</span>
            </el-col>
            <el-col :span="6">
              <span style="color: #D2691E;">stars: {{ numOfStars }}/{{ maxNumOfStars }}</span>
            </el-col>
            <el-col :span="6">
              <span style="color: #556B2F;">step: {{ step }}</span>
            </el-col>
            <el-col :span="6">
              <el-button type="success" size="large" :disabled="disableMainBtn" round
                @click="handleMainBtn()">{{ mainBtnText }}
              </el-button>
            </el-col>
          </el-row>
        </el-header>
        <el-main>
          <Board
            :boardLength="vhTOpx(70)"
            :tiles="tiles"
            :tileTypes="tileTypes"
            :tileClicked="tileClicked">
          </Board>
        </el-main>
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
      step: 0,
      numOfStars: 0,
      maxNumOfStars: 0,
      time: 120,
      timer: null,
      timerOn: false,
      startTime: null,
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
        if (this.numOfStars === 0) {
          this.$message({
            message: 'You haven\'t placed any star.',
            type: 'warning'
          })
        } else {
          // finish Spoiler
          this.stopTimer()
          this.donePose()
        }
      } else if (this.gameStatus === 'SpoilerFinish') {
        // choreographer start
        this.resetTimer()
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
        this.step = this.game.getNumStep()
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
          size: 10,
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
      // start timer
      this.startTimer()
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
      this.startTimer()
    },
    choreoFinish () {
      this.stopTimer()
      this.gameStatus = 'Finish'
      this.disableMainBtn = false
      this.mainBtnText = 'A new game!'
    },
    resetGame () {
      this.gameStatus = 'Initialized'
      this.mainBtnText = 'GO!'
      this.disableMainBtn = false
      this.step = 0
      this.numOfStars = 0
      this.resetTimer()
      let gameParams = this.getGameParams()
      this.game = new Game(gameParams.size, gameParams.groups, gameParams.dancers)
      this.refreshBoard()
    },
    resetTimer () {
      this.stopTimer()
      this.time = 120
      this.timer = null
      this.timerOn = false
      this.startTime = null
    },
    startTimer () {
      this.timerOn = true
      this.startTime = Date.now()
      this.timer = setInterval(() => {
        this.time = 120 - ((Date.now() - this.startTime) / 1000)
        if (this.time <= 0) {
          this.handleTimeOut()
        }
      }, 10)
    },
    stopTimer () {
      if (this.timer) {
        clearInterval(this.timer)
        this.timerOn = false
      }
    },
    handleTimeOut () {
      if (this.gameStatus === 'Spoiler') {
        this.choreoFinish()
        this.$message.error('Spoiler timeout.')
        this.step = 'Spoiler timeout'
      } else if (this.gameStatus === 'Choreographer') {
        this.choreoFinish()
        this.$message.error('Choreographer timeout.')
        this.step = 'Choreographer timeout'
      }
    }
  }
}
</script>
