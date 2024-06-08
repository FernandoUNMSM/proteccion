<template>
  <span></span>
</template>

<script lang="ts">
import { mapState } from "vuex";
export default {
  name: "Login",
  computed: {
    ...mapState({
      logout: (state: any) => state.login.logout,
      logged: (state: any) => state.login.logged
    })
  },
  methods: {
    login() {
      sessionStorage.removeItem("logged");
      this.$msal.loginRedirect([`${process.env.VUE_APP_CLIENT_ID}/.default`]);
      sessionStorage.setItem("logged", JSON.stringify(true));
    }
  },
  mounted() {
    if (!this.logout && !this.logged) {
      this.login();
    }
  }
};
</script>
