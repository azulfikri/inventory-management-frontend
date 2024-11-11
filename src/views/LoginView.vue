<template>
  <div class="container-fluid">
    <div
      class="row justify-content-center align-items-center min-vh-100 bg-light"
    >
      <div class="col-md-4">
        <div class="card shadow-sm">
          <div class="card-body p-4">
            <!-- Header -->
            <div class="text-center mb-4">
              <h2 class="fw-bold text-primary">Login</h2>
              <p class="text-muted">Please select your role to continue</p>
            </div>

            <!-- Login Form -->
            <form @submit.prevent="login">
              <!-- Role Selection -->
              <div class="mb-4">
                <label for="role" class="form-label">Select Role</label>
                <select
                  v-model="role"
                  id="role"
                  class="form-select form-select-lg"
                  required
                >
                  <option value="" disabled selected>Choose your role</option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </div>

              <!-- Login Button -->
              <button
                type="submit"
                class="btn btn-primary w-100 py-2"
                :disabled="!role"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      role: "admin",
    };
  },
  methods: {
    login() {
      localStorage.setItem("auth", true);
      localStorage.setItem("role", this.role);
      this.$router.push({ name: this.role, params: { component: "items" } });
    },
  },
};
</script>
<style scoped>
.min-vh-100 {
  min-height: 100vh;
}

/* Hover effect untuk card */
.card {
  transition: transform 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
}

/* Custom focus styles */
.form-select:focus {
  border-color: #0d6efd;
  box-shadow: 0 0 0 0.2rem rgba(13, 110, 253, 0.25);
}

/* Custom select styling */
.form-select-lg {
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
}
</style>
