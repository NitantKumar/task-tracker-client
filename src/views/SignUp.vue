<template>
  <div class="my-40">
    <h3 class="mb-5">Sign Up</h3>
    <form @submit.prevent="submit">
      <div class="my-5">
        <label for="" class="mx-3">Username: </label>
        <input v-model="data.name" type="text" placeholder="username" required class="border-solid border-2 border-gray-500 "/>
      </div>
      <div class="my-5">
        <label for="" class="mx-3">Email: </label>
        <input v-model="data.email" type="email" placeholder="email" required class="border-solid border-2 border-gray-500 "/>
      </div>
      <div class="my-5">
        <label for="" class="mx-3">Password: </label>
        <input
          class="border-solid border-2 border-gray-500 "
          v-model="data.password"
          type="password"
          placeholder="password"
          required
        />
      </div>
      <button type="submit" class="border-solid border-2 border-gray-500 px-2 py-1">Submit</button>
    </form>
  </div>
</template>

<script>
import { reactive,computed } from "vue";
// import { mapActions } from 'vuex';
import { useStore } from 'vuex'
import { useRouter } from "vue-router";

export default {
  name: "SignUp",
  // methods:{
  //   ...mapActions('auth',['login'])
  // },
  setup() {
    const store=useStore();
    const data = reactive({
      name: "",
      email: "",
      password: "",
    });

    const router=useRouter();
    const status = computed(() => store.getters["auth/isAuthenticated"]);

    const submit = async () => {
      const response = await fetch("http://16.171.161.68:3000/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials:'include',
        body: JSON.stringify(data),
      });
      const responseData = await response.json();
      const token = responseData.token;
      // await storeToken(token);
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
