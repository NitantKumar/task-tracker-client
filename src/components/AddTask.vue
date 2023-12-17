<template>
    <div class="border-2 border-solid border-black">
        <h4 class="my-5">Add a Task</h4>
        <form @submit="onSubmit" class="mb-2">
            <div class="my-5">
                <label for="" class="mx-2">Add Task:</label>
                <input type="text" v-model='name' placeholder="Add a task here" class="border-2 border-solid border-gray-500 p-1" />
            </div>
            <input type="submit" value="Submit" class="border-2 border-solid border-gray-500 px-2 py-1"/>
        </form>
    </div>
</template>

<script>
    import { mapActions } from 'vuex';
    export default{
        name:'AddTask',
        data(){
            return{
                name:''
            }
        },  
        methods:{
            ...mapActions(['addTasks']),
            onSubmit(e){
                let token = localStorage.getItem("user");
                e.preventDefault();
                this.addTasks({name:this.name,token})
                this.name=''
            }
        }
    }
</script>

<style scoped>

</style>
