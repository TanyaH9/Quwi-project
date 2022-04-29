<template>
  <div class="wrapper">
    <h1>Login Form</h1>
    <div class="form">
      <input
        v-model="user.email"
        class="email"
        placeholder="Email"
        type="email"
      />
      <input
        v-model="user.password"
        class="password"
        placeholder="Password"
        type="password"
      />
      <button @click="login">Login</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "NuxtTutorial",

  data() {
    return {
      user: {
        email: "",
        password: "",
      },
    };
  },

  mounted: function () {
    if (localStorage.getItem("accessToken")) {
      this.$router.push({ path: "/homepage" });
    }
  },

  methods: {
    login() {
      const options = {
        method: "POST",
        url: "https://api.quwi.com/v2/auth/login",
        headers: {
          cookie:
            "_csrf=fcd6c24fa29f199bc1937aac2222521bdfa57ca8baeca84e3fe3c4415bde1cf6a%253A2%253A%257Bi%253A0%253Bs%253A5%253A%2522_csrf%2522%253Bi%253A1%253Bs%253A32%253A%2522t5e06elMO8VyCu0-Q9OBZz2HKbRF09VJ%2522%253B%257D",
          "Content-Type": "application/json",
          "Client-Device": "desktop",
          "Client-Timezone-Name": "Asia/Armenia",
        },
        data: { email: this.user.email, password: this.user.password },
      };
      axios
        .request(options)
        .then((response) => {
          localStorage.setItem("accessToken", response.data.token);
          this.$router.push({ path: "/homepage" });
        })
        .catch(function (error) {
          console.error(error);
        });
    },
  },
};
</script>

<style>
body {
  padding: 0;
  margin: 0;
}

.wrapper {
  width: 98vw;
  height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.wrapper h1 {
  font-size: 40px;
  color: #9370db;
}

.form {
  max-width: 40%;
  width: 100%;
  padding: 50px 10px 30px 10px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 0 20px 10px #9370db;
  border-radius: 20px;
}

.form input {
  outline: none;
  font-size: 20px;
  padding: 10px;
  margin: 7px 10px;
  border-bottom: 2px solid #9370db;
  border-top: none;
  border-left: none;
  border-right: none;
}

.form button {
  outline: none;
  font-size: 20px;
  padding: 10px;
  margin: 45px 10px 10px 10px;
  background: #9370db;
  color: white;
  border: none;
  cursor: pointer;
}
</style>

