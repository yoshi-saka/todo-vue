<template>
  <div>
    <input type="text" class="todo-input" placeholder="入力してください" v-model="newTodo" @keyup.enter="addTodo" />
    <input type="text" class="searchBox-input" placeholder="検索" v-model="searchWord">
    <transition-group
      name="fade"
      enter-active-class="animated fadeInUp"
      leave-active-class="animated fadeOutDown"
    >
      <div v-for="(todo,index) in todosFiltered" :key="todo.id" class="todo-item">
        <div class="todo-item-left">
          <input type="checkbox" v-model="todo.completed" />
          <div
            v-if="!todo.editing"
            @dblclick="editTodo(todo)"
            class="todo-item-label"
            :class="{ completed : todo.completed }"
          >{{ todo.title }}</div>
          <input
            v-else
            type="text"
            class="todo-item-edit"
            v-model="todo.title"
            @blur="doneEdit(todo)"
            @keyup.enter="doneEdit(todo)"
            @keyup.esc="cancelEdit(todo)"
            v-focus
          />
        </div>
        <div class="remove-item" @click="removeTodo(index)">
          <i class="far fa-trash-alt"></i>
        </div>
      </div>
    </transition-group>

    <div class="extra-container">
      <div>
        <label>
          <input type="checkbox" :checked="!anyRemaining" @change="checkAllTodos" />
          すべてチェック
        </label>
      </div>
      <div>{{ remaining }} 件</div>
    </div>

    <div class="extra-container">
      <div>
        <button :class="{ active:filter == 'all' }" @click="filter = 'all' ">すべて</button>
        <button :class="{ active:filter == 'active' }" @click="filter = 'active' ">作業中</button>
        <button :class="{ active:filter == 'completed' }" @click="filter = 'completed' ">完了</button>
      </div>
      <div>
        <transition name="fade">
          <button v-if="showClearCompletedButton" @click="clearCompleted">削除</button>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "todo-list",
  data() {
    return {
      newTodo: "",
      searchWord:"",
      idForTodo: 3,
      beforeEditCache: "",
      filter: "all",
      todos: [
        {
          id: 1,
          title: "sample todo1",
          completed: false,
          editing: false
        }
      ]
    };
  },
  computed: {
    remaining() {
      return this.todos.filter(todo => !todo.completed).length;
    },
    anyRemaining() {
      return this.remaining != 0
    },
    todosFiltered() {
      if (this.filter == "all") {
        // return this.todos;
        return this.searchItem(this.todos, this.searchWord);
      } else if (this.filter == "active") {
        return this.todos.filter(todo => !todo.completed);
      } else if (this.filter == "completed") {
        return this.todos.filter(todo => todo.completed);
      }
      //  return this.todos;
       return this.searchItem(this.todos, this.searchWord);
    },
    showClearCompletedButton() {
      return this.todos.filter(todo => todo.completed).length > 0;
     }
  },
  directives: {
    focus: {
      inserted: function(el) {
        el.focus();
      }
    }
  },
  methods: {
    addTodo() {
      if (this.newTodo.trim().length == 0) {
        return;
      }
      this.todos.push({
        id: this.idForTodo,
        title: this.newTodo,
        completed: false,
        editing: false
      });

      this.newTodo = "";
      this.idForTodo++;
    },
    editTodo(todo) {
      this.beforeEditCache = todo.title;
      todo.editing = true;
    },
    doneEdit(todo) {
      if (todo.title.trim() == "") {
        todo.title = this.beforeEditCache;
      }
      todo.editing = false;
    },
    cancelEdit(todo) {
      todo.title = this.beforeEditCache;
      todo.editing = false;
    },
    removeTodo(index) {
      this.todos.splice(index, 1);
    },
    checkAllTodos() {
      this.todos.forEach((todo) => todo.completed = event.target.checked);
    },
    clearCompleted() {
      this.todos = this.todos.filter(todo => !todo.completed);
    },
    searchItem(list,key){
      return list.filter((todo) => todo.title.indexOf(key) !== -1 || key === "");
    }
  }
}
</script>

<style>
@import url("https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.2/animate.min.css");
.todo-input,.searchBox-input {
  width: 100%;
  padding: 10px 18px;
  font-size: 18px;
  margin-bottom: 16px;
  cursor: pointer;
}
.todo-input:focus,
.searchBox-input:focus{
  outline: none;
}
.todo-item {
  padding: 0 10px;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  animation-duration: 0.5s;
}
.remove-item {
  cursor: pointer;
  margin-left: 14px;
}
.remove-item:hover {
  color: tomato;
}
.todo-item-left{
  display: flex;
  align-items: center;
}
.todo-item-label {
  padding: 10px;
  border: 1px solid #fff;
  margin-left: 12px;
}
.todo-item-edit{
  font-size: 24px;
  color: #333;
  margin-left: 12px;
  width: 100%;
  padding: 10px;
  font-family: Arial, Helvetica, sans-serif;
}
.completed{
text-decoration: line-through;
color: gray;
}
.extra-container{
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 16px;
  border-top: 1px solid lightgray;
  padding-top: 14px;
  margin-bottom: 14px;
}
button{
  font-size: 14px;
  background: #fff;
  border-radius: 20px;
  padding: 5px 10px;
  appearance: none;
}
button:hover{
  background-color: #7cffcb;
  background-image: linear-gradient(315deg, #7cffcb 0%, #74f2ce 74%);
}
button:focus{
  outline: none;
}
.active{
  background-color: #7cffcb;
  background-image: linear-gradient(315deg, #7cffcb 0%, #74f2ce 74%);
}
.fade-enter-active,
.fade-leave-active{
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to{
  opacity: 0;
}
</style>
