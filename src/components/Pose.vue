<template>
  <div class="Pose">
    <el-form :model="gameSettings" :rules="rules" ref="gameSettings" label-width="120px">
      <el-form-item label="Give it a name" prop="name">
        <el-input v-model="gameSettings.name"></el-input>
      </el-form-item>
      <el-row>
        <el-col>easy - 10 x 10, 2 groups, 2 colors</el-col>
        <el-col>intermediate - 10 x 10, 2 groups, 2 colors</el-col>
        <el-col>hard - 10 x 10, 2 groups, 2 colors</el-col>
        <el-col>hell - 10 x 10, 2 groups, 2 colors</el-col>
      </el-row>
      <el-form-item label="Difficulty level" prop="level">
        <el-slider v-model="gameSettings.level" :max="3" :format-tooltip="levelFormatTooltip" show-stops></el-slider>
      </el-form-item>
    </el-form>
    <el-button type="primary" :loading="beginBtnLoading" @click="createGame('gameSettings')">Create</el-button>
    <!-- the create game panel -->
    <el-dialog title="Create a game" :visible.sync="panelVisible" :fullscreen="true" :before-close="handleCancel">
      <el-container>
        <el-main width="80%">
          <Board
            :boardSize="10"
            :boardLength="650"
            :tiles="['1', '2', '']"
            :tileClicked="tileClicked"
          ></Board>
        </el-main>
        <el-aside width="20%">Aside</el-aside>
      </el-container>
    </el-dialog>
  </div>
</template>

<script>
import Board from './Board'

export default {
  name: 'Pose',
  components: {
    'Board': Board
  },
  data () {
    return {
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
      panelVisible: false
    }
  },
  methods: {
    createGame (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.beginBtnLoading = true
          this.panelVisible = true
          this.beginBtnLoading = false
        }
      })
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
      console.log(index)
    }
  }
}
</script>
