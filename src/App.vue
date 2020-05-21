<template>
    <div id="app" class="container">

      <img src="./assets/logo.png" class="logo" />
      <todo-list></todo-list>
    </div>
</template>

<script>
import TodoList from './components/todoList'
export default {
  name: 'App',
  components:{
    TodoList,
  }
}
</script>

<style lang="">
  *{
    box-sizing: border-box;
  }
  .container{
    max-width: 600px;
    margin: 0 auto;
  }
  #app{
    font-family: Arial, Helvetica, sans-serif;
    -webkit-font-smoothing:antialiased;
    -moz-osx-font-samoothing:grayscale;
    font-size: 24px;
    color: #2c3e50;
    margin-top: 60px;
  }
  .logo{
    display: block;
    margin: 20px auto;
    height: 75px;
  }
</style>
