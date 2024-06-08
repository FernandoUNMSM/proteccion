<template>
  <div id="app">
    <div class="container-fluid" v-if="logged">
      <router-view></router-view>
      <div v-show="!user">
        <section class="wrapper">
          <div class="loader">
            <div class="loading one"></div>
            <div class="loading two"></div>
            <div class="loading three"></div>
            <div class="loading four"></div>
          </div>
        </section>
      </div>
    </div>
    <div v-if="!logged">
      <Login />
    </div>
  </div>
</template>

<script lang="ts">
import { mapState, mapMutations } from "vuex";
import Login from "./views/Login.vue";

export default {
  name: "app",
  components: {
    Login
  },
  computed: {
    ...mapState({
      logged: (state: any) => state.login.logged,
      user: (state: any) => state.login.user
    })
  },
  methods: {
    ...mapMutations("login", ["updateUser"])
  },
  created() {
    const account = this.$msal.getUser();
    if (account) {
      this.updateUser(account);
      sessionStorage.setItem("user", JSON.stringify(account));
    }
  }
};
</script>
<style lang="stylus">
@import "./assets/global.styl"

.wrapper{
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}
.wrapper .loader{
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
}
.loader .loading{
  background: #ccc;
  width: 30px;
  height: 30px;
  border-radius: 50px;
  margin: 0 10px;
  animation: load 0.7s ease infinite;
}
.loader .loading.one{
  animation-delay: 0.3s;
}
.loader .loading.two{
  animation-delay: 0.4s;
}
.loader .loading.three{
  animation-delay: 0.5s;
}
@keyframes load{
  0%{
      width: 30px;
      height: 30px;
  }
  50%{
      width: 20px;
      height: 20px;

  }
}
</style>
