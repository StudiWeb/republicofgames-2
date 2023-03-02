<template>
  <div class="login text-center">
    <main class="form-signin m-auto">
      <form>
        <i class="bi bi-controller fs-1"></i>
        <h2 class="h3 mb-3 fw-normal">Please log in</h2>

        <div class="form-floating">
          <input v-model="login" type="input" class="form-control" placeholder="Your login" />
          <label>Login</label>
        </div>
        <div class="form-floating">
          <input v-model="password" type="password" class="form-control" placeholder="Password" />
          <label>Password</label>
        </div>

        <div v-if="loginData" class="alert alert-danger" role="alert">
          You have entered invalid login data.
        </div>

        <button @click="checkCredentials" class="w-100 btn btn-lg btn-primary" type="button">
          Log in
        </button>
        <p class="mt-5 mb-3 text-muted">
          Republic of games - created by Michał Stodolny, &copy; 2023
        </p>
      </form>
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      login: '',
      password: '',
      loginData: false,
      uploading: false
    }
  },

  methods: {
    // checkCredentials() {
    //   if (this.login === 'admin' && this.password === 'admin') {
    //     this.uploading = true
    //     setTimeout(() => {
    //       this.$router.push('/admin/panel')
    //     }, '3000')
    //   } else {
    //     this.loginData = true
    //   }
    // }
  }
}
</script>

<style scoped>
html,
.login {
  height: 100vh;
}

.login {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 40px;
  padding-bottom: 40px;
  background-color: #f5f5f5;
}

.form-signin {
  width: 330px;
  padding: 15px;
}

.form-signin .form-floating:focus-within {
  z-index: 2;
}

.form-signin input[type='input'] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.form-signin input[type='password'] {
  margin-bottom: 30px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>
