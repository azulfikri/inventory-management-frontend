<template>
  <div :class="['sidebar', { 'd-none': !isSidebarVisible }]">
    <a
      href="#"
      class="logo d-flex justify-content-center align-items-center text-center mb-4 text-white text-decoration-none fw-bold fs-5"
      >SIMBAR</a
    >
    <ul class="nav flex-column fs-6">
      <li
        v-if="currentRole === 'admin'"
        class="nav-item mb-2"
        :class="{ 'active-nav': activeComponent === 'users' }"
      >
        <a
          href="#"
          @click.prevent="setActiveComponent('users')"
          class="nav-link d-flex align-items-center"
        >
          <i class="bi bi-house-door fs-4 me-2"></i> Users
        </a>
      </li>

      <li
        class="nav-item mb-2"
        :class="{ 'active-nav': activeComponent === 'items' }"
      >
        <a
          href="#"
          @click.prevent="setActiveComponent('items')"
          class="nav-link d-flex align-items-center"
        >
          <i class="bi bi-box fs-4 me-2"></i> Items
        </a>
      </li>

      <li
        class="nav-item"
        :class="{ 'active-nav': activeComponent === 'transactions' }"
      >
        <a
          href="#"
          @click.prevent="setActiveComponent('transactions')"
          class="nav-link d-flex align-items-center"
        >
          <i class="bi bi-cash fs-4 me-2"></i> Transactions
        </a>
      </li>

      <li
        v-if="currentRole == 'user'"
        class="nav-item"
        :class="{ 'active-nav': activeComponent === 'history' }"
      >
        <a
          href="#"
          @click.prevent="setActiveComponent('history')"
          class="nav-link d-flex align-items-center"
        >
          <i class="bi bi-clock-history me-2"></i> History
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    currentRole: {
      type: String,
      required: true,
    },
    isSidebarVisible: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      activeComponent: null,
    };
  },
  methods: {
    setActiveComponent(component) {
      this.activeComponent = component;
      this.ShowComponent(component);
    },
    ShowComponent(component) {
      this.$emit("showComponent", component);
    },
  },
  emits: ["showComponent"],
};
</script>
<style scoped>
.sidebar {
  width: 200px;
  background: #2980b9;
  padding: 14px;
  height: 100vh;
  cursor: pointer;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  font-size: 18px;
  font-family: sans-serif;
  transition: transform 0.3s ease-in-out;
  transform: translateX(-2);
}
.nav-link {
  color: white;
  cursor: pointer;
  display: flex;
  justify-content: left;
  align-items: start;
  margin-left: 8px;
  padding: 2px 0;
  transition: background-color 0.3s ease;
}
.active-nav {
  background-color: #ff245bc1;
  border-radius: 5px;
}
.nav-item:hover {
  background-color: #191616;
  border-radius: 5px;
}
.me-2 {
  margin-right: 0.5rem;
}
</style>
