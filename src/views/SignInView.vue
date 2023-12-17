<template>
  <div class="my-40">
    <h3 class="mb-5">Sign In</h3>
    <form @submit.prevent="submit">
      <div class="my-5">
        <label for="" class="mx-3">Email: </label>
        <input v-model="data.email" type="email" placeholder="email" class="border-solid border-2 border-gray-500 "/>
      </div>
      <div class="my-5">
        <label for="" class="mx-3">Password:</label>
        <input v-model="data.password" type="password" placeholder="password" class="border-solid border-2 border-gray-500 "/>
      </div>
      <button type="submit" class="border-solid border-2 border-gray-500 px-2 py-1">Submit</button>
    </form>
  </div>
</template>

<script>
import { reactive,computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export default {
  name: "SignIn",
  setup() {
    const store=useStore();
    const data = reactive({
      email: "",
      password: "",
    });
    const router = useRouter();
    const status = computed(() => store.getters["auth/isAuthenticated"]);

    const submit = async () => {
      const response = await fetch("http://16.171.161.68:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials:'include',
        body: JSON.stringify(data),
      });
      const responseData = await response.json();
      const token = responseData.token;
      localStorage.setItem("user", token);
      store.dispatch('auth/login');
      if(status.value){
        router.push('/')
      }else{
        router.push('/signin')
      }
      
    };
    return {
      data,
      submit,
    };
  },
};
</script>

<style scoped></style>
