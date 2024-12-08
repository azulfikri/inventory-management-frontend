<template>
  <div class="register-form">
    <h2 class="h4 fw-bold mb-3 text-custom">Register</h2>
    <form @submit.prevent="register">
      <div class="mb-3">
        <label for="username" class="form-label">Username</label>
        <input
          type="text"
          id="username"
          v-model="username"
          class="form-control"
        />
      </div>
      <div class="mb-3">
        <label for="email" class="form-label">Email</label>
        <input
          type="email"
          id="email"
          v-model="email"
          class="form-control"
          required
        />
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Password</label>
        <input
          type="password"
          id="password"
          v-model="password"
          class="form-control"
          required
        />
      </div>
      <div class="mb-3">
        <label for="confirm-password" class="form-label"
          >Confirm Password</label
        >
        <input
          type="password"
          id="confirm-password"
          v-model="confirmPassword"
          class="form-control"
          required
        />
      </div>
      <button type="submit" class="btn btn-success w-100">Register</button>
    </form>
    <div
      v-if="error"
      class="alert alert-danger mt-3 d-flex justify-content-between align-items-center"
    >
      {{ error }}
      <button
        type="button"
        class="btn-close"
        @click="error = ''"
        aria-label="Close"
      ></button>
    </div>
    <div class="mt-3 text-center">
      <p class="text-muted">
        Already have an account?
        <a
          href="#"
          @click.prevent="$emit('switch', 'Login')"
          class="text-custom"
        >
          Login here
        </a>
      </p>
    </div>
  </div>
</template>
<script>
import { register as registerService } from "@/services/authServices";
export default {
  data() {
    return {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      error: "",
    };
  },
  methods: {
    async register() {
      // validasi username
      if (!this.username) {
        this.error = "Username harus diisi";
        setTimeout(() => {
          this.error = "";
        }, 4000);
        return;
      }
      // validasi email
      if (!this.email) {
        this.error = "Email harus diisi";
        setTimeout(() => {
          this.error = "";
        }, 4000);
      }
      // regex format email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(this.email)) {
        this.error = "Email tidak valid!";
        setTimeout(() => {
          this.error = "";
        }, 4000);
        return;
      }
      // validasi password
      if (!this.password) {
        this.error = "Password harus diisi.";
        setTimeout(() => {
          this.error = "";
        }, 4000);
        return;
      }
      // validasi panjang password
      if (this.password.length < 8) {
        this.error = "Password harus minimal 8 karakter!";
        setTimeout(() => {
          this.error = "";
        }, 4000);
        return;
      }
      // validasi confirm password
      if (this.password !== this.confirmPassword) {
        this.error = "Password tidak cocok!";
        setTimeout(() => {
          this.error = "";
        }, 4000);
        return;
      }
      try {
        const response = await registerService(
          this.username,
          this.email,
          this.password
        );
        console.log("Registration succesful:", response);
        alert("Registration succesful!");
        this.$emit("switch", "Login");
      } catch (error) {
        if (error.response) {
          this.error =
            error.response.data.message ||
            "Username sudah digunakan, silahkan gunakan username lain";
        } else {
          this.error = error.message || "An unexpected error occurred";
        }
        console.error("Registration failed:", error);
        setTimeout(() => {
          this.error = "";
        }, 5000);
      }
    },
  },
};
</script>
<style scoped>
.text-custom {
  color: #4b3f6b;
}
.form-label {
  color: #000;
}
</style>
