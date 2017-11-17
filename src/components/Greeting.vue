<template>
  <div class="Greeting">
    <el-container>
      <el-header>
        <img style="width: 85%; height: 65%;" src="../assets/1200px-Dancing_without_the_Stars_Title_Logo.svg.png">
      </el-header>
      <el-main>
        <h2>Please type your name here: </h2>
        <el-input v-model="input" style="width: 30%" placeholder="e.g. Gandalf, Rambo"></el-input>
        <el-button v-on:click="login" type="primary" style="background-color: #2F4F4F;">ENTER</el-button>
      </el-main>
      <el-footer>
        <br />
        <el-button v-on:click="about" type="text"><h3 style="color: #2c3e50">About</h3></el-button>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'Greeting',
  data () {
    return {
      input: '',
      login: () => {
        window.alert('')
      },
      about: () => {
        window.alert('')
      }
    }
  }
}
</script>