<template>
  <div class="item-list container my-1 bg-white rounded">
    <div class="header d-flex justify-content-between align-items-center mb-3">
      <h2 class="mt-2">Daftar Barang</h2>

      <button class="btn btn-primary mt-2" @click="showAddForm">
        Tambah Item
      </button>
    </div>
    <div class="row px-5">
      <ItemCard
        v-for="item in items"
        :key="item.id"
        :item="item"
        @edit-item="editItem"
        @delete-item="deleteItem"
        class="col-md-6 col-lg-4 mb-4"
      />
    </div>
    <Modal :visible="showForm" @close="cancelEditForm">
      <ItemForm
        :item="selectedItem"
        :isEdit="isEdit"
        @submit="handleSubmit"
        @cancel="cancelEditForm"
      />
    </Modal>
  </div>
</template>

<script>
import { computed, onMounted } from "vue";
import { useItemStore } from "@/store/itemStore";
import { useAuthStore } from "@/store/authStore";
import { EventBus } from "@/utils/EventBus";
import ItemCard from "./ItemCard.vue";
import Modal from "../../Modal.vue";
import ItemForm from "./ItemForm.vue";
export default {
  name: "items",
  components: {
    ItemCard,
    Modal,
    ItemForm,
  },
  setup() {
    const itemStore = useItemStore();
    const authStore = useAuthStore();
    const items = computed(() => itemStore.items);
    onMounted(() => {
      if (authStore.token) {
        itemStore.fetchItems();
      } else {
        console.error("Items is not found");
      }
    });
    return {
      items,
      itemStore,
      addItem: itemStore.addItem,
      updateItem: itemStore.updateItem,
      deleteItem: itemStore.deleteItem,
    };
  },
  data() {
    return {
      // items: [],
      showForm: false,
      selectedItem: null,
      isEdit: false,
      searchQuery: "",
    };
  },
  computed: {
    // ...mapState(useItemStore, ["items"]), mengambil items dari store pinia
    // items() {
    //   return this.itemStore.items; // mengakses items dari store pinia
    // },
    filteredItems() {
      return this.items.filter(
        (item) =>
          item.id.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          item.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
  },
  methods: {
    showAddForm() {
      this.selectedItem = { id: "", name: "", description: "", quantity: 0 };
      this.isEdit = false;
      this.showForm = true;
    },
    editItem(item) {
      this.selectedItem = { ...item };
      this.isEdit = true;
      this.showForm = true;
    },
    async handleSubmit(item) {
      if (this.isEdit) {
        await this.updateItem(item); //memanggil action update item dari store
        // const index = this.items.findIndex((i) => i.kode === item.kode);
        // this.items[index] = item;
      } else {
        await this.addItem(item); // memanggil action add item dari store
        // this.items.push(item);
      }
      await this.itemStore.fetchItems();
      this.showForm = false;
    },
    cancelEditForm() {
      this.showForm = false;
      // this.selectedItem = null;
      // this.isEdit = false;
    },
    async handleDeleteItem(id) {
      await this.deleteItem(id);
      await this.itemStore.fetchItems(); // memanggil action delete item dari store
      // this.items = this.items.filter((item) => item.kode !== kode);
      // this.$emit("delete-item", kode);
    },
    handleSearch(query) {
      this.searchQuery = query;
    },
  },
  onmounted() {
    EventBus.on("search", this.handleSearch);
  },
  beforeUnmount() {
    EventBus.off("search", this.handleSearch);
  },
};
</script>
<style scoped>
.item-list {
  background-color: #fff;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1);
  transition: 0.3s;
}
.item-list:hover {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}
.header h2 {
  color: #4b3f6b;
  font-size: 24px;
}
.header .btn-primary {
  background-color: #007bff;
  border-color: #007bff;
}
.header .btn-primary:hover {
  background-color: #0056b3;
  border-color: #0056b3;
}
</style>
