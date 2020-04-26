<template>
  <div class="hi">
    <button v-if="!authenticated" @click="login">Login</button>
    <div v-if="authenticated">
      <button @click="logout">Logout</button>
      <h1>Hi {{ name }}!</h1>

      <p>
        Your key is:
        <input :value="token" />.
      </p>
    </div>
  </div>
</template>

<script>
import Firebase from "../firebase";
export default {
  name: "Dashboard",
  props: {},
  computed: {
    authenticated() {
      return this.user.loggedIn;
    },
    name() {
      if (this.user.data.displayName) {
        return this.user.data.displayName.split(" ")[0];
      }
      return null;
    },
    token() {
      console.log(this.user);
      return this.user.token;
    }
  },
  methods: {
    login() {
      Firebase.login();
    },
    logout() {
      Firebase.logout();
    }
  },
  mounted: function() {
    Firebase.auth.onAuthStateChanged(async (user) => {
      if (user) {
        this.user.loggedIn = true;
        this.user.data = user;
        this.user.token = await user.getIdToken(true);
      } else {
        this.user.loggedIn = false;
        this.user.data = {};
      }
    });
  },
  data() {
    return {
      user: {
        token: "",
        loggedIn: false,
        data: {}
      }
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
