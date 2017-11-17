<template>
  <div class="Greeting">
    <div>
      <el-container>
        <el-main>
          <img style="width: 85%; height: 65%;" src="../assets/1200px-Dancing_without_the_Stars_Title_Logo.svg.png">
        </el-main>
        <el-main>
          <h2>Please type your name here: </h2>
          <el-input v-model="input" style="width: 30%" placeholder="e.g. Gandalf, Rambo"></el-input>
          <el-button @click="login" type="primary" style="background-color: #2F4F4F;">ENTER</el-button>
        </el-main>
        <el-footer>
          <br />
          <el-button @click="aboutDialogVisible = true" type="text"><h3 style="color: #2c3e50">About</h3></el-button>
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
        <div>This is my final project of 2017 Fall NYU Heuristic Problem Solving class.</div>
        <div>License: MIT</div>
        <div>Github: <a :href="githubUrl">{{ githubUrl }}</a></div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Greeting',
  data () {
    return {
      input: '',
      githubUrl: 'https://github.com/billg1990/dancing-without-stars-webgame',
      aboutDialogVisible: false,
      login () {
        window.alert('')
      }
    }
  }
}
</script>