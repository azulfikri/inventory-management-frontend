<template>
  <div class="item-list container my-5 bg-white rounded">
    <div class="header d-flex justify-content-between align-items-center mb-3">
      <h2 class="mt-2">Daftar Barang</h2>

      <button class="btn btn-primary mt-2" @click="showAddForm">
        Tambah Item
      </button>
    </div>
    <div class="row px-5">
      <ItemCard
        v-for="item in items"
        :key="item.kode"
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
import { EventBus } from "@/utils/EventBus";
import { useItemStore } from "@/store/itemStore";
import ItemCard from "./ItemCard.vue";
import Modal from "../../Modal.vue";
import ItemForm from "./ItemForm.vue";
export default {
  components: {
    ItemCard,
    Modal,
    ItemForm,
  },
  setup() {
    const itemStore = useItemStore();
    return { itemStore };
  },
  data() {
    return {
      // items: [],
      showForm: false,
      selectedItem: null,
      isEdit: false,
    };
  },
  computed: {
    // ...mapState(useItemStore, ["items"]), mengambil items dari store pinia
    items() {
      return this.itemStore.items; // mengakses items dari store pinia
    },
    filteredItems() {
      return this.items.filter((item) => {
        return (
          item.kode.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          item.nama.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      });
    },
  },
  methods: {
    // ...mapActions(useItemStore, ["addItem", "updateItem", "deleteItem"]), // Mapping actions dari store
    showAddForm() {
      this.selectedItem = { kode: "", nama: "", deskripsi: "", stok: 0 };
      this.isEdit = false;
      this.showForm = true;
    },
    editItem(item) {
      this.selectedItem = { ...item };
      this.isEdit = true;
      this.showForm = true;
    },
    handleSubmit(item) {
      if (
        item.kode &&
        item.nama &&
        item.deskripsi &&
        item.stok !== null &&
        !isNaN(item.stok)
      ) {
        if (this.isEdit) {
          this.itemStore.updateItem(item); //memanggil action update item dari store
          // const index = this.items.findIndex((i) => i.kode === item.kode);
          // this.items[index] = item;
        } else {
          this.itemStore.addItem(item); // memanggil action add item dari store
          // this.items.push(item);
        }
      }
      this.showForm = false;
    },
    cancelEditForm() {
      this.showForm = false;
      this.selectedItem = null;
      this.isEdit = false;
    },
    deleteItem(kode) {
      this.itemStore.deleteItem(kode); // memanggil action delete item dari store
      // this.items = this.items.filter((item) => item.kode !== kode);
      // this.$emit("delete-item", kode);
    },
    handleSearch(query) {
      this.searchQuery = query;
    },
  },
  mounted() {
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
