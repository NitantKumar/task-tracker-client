<template>
  <div>
    <h3 class="my-2 border-t-2 border-solid border-black py-5">Task Tracker</h3>
    <AddTask v-if="isAuthenticated" />
    <div id="tasks" v-if="isAuthenticated">
      <div >
        <h4 class="py-3">Task Yet to be completed</h4>
        <TaskRender :tasks="completedTask" type="not-completed" class=""/>
      </div>
      <div class="border-2 border-solid border-black">
        <h4 class="py-3">Task completed</h4>
        <TaskRender :tasks="completedTask" type="completed" />
      </div>
    </div>
    <div v-else class="my-20">
      You are not logged In
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import TaskRender from '../components/TaskRender.vue';
import AddTask from '../components/AddTask.vue';
import VueJwtDecode from "vue-jwt-decode";

export default {

  name: 'TaskTracker',
  computed: {
    ...mapGetters(['allTasks']),
    ...mapGetters('auth', ['isAuthenticated']),
    completedTask() {
      return this.allTasks;
    },
    // checkuser(){
    //   let token = localStorage.getItem("user");
    //   if(token!=null)
    //     return true
    //   else  
    //     return false
    // }
  },
  methods: {
  ...mapActions('auth', ['login']),
  ...mapActions(['fetchTasks']),
},

mounted() {
  this.login();
  let token = localStorage.getItem("user");
  if (token != null) {
    try {
      let decoded = VueJwtDecode.decode(token);
      this.user = decoded;
      this.fetchTasks(token);
    } catch (error) {
      console.log(error, 'error from decoding token');
    }
  }
},
  components: {
    TaskRender,
    AddTask
  },
};
</script>

<style scoped>
</style>
