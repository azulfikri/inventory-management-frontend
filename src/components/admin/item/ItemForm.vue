<template>
  <div>
    <form @submit.prevent="submitForm" class="mb-3">
      <div class="mb-3">
        <label for="kode" class="form-label">Kode Barang</label>
        <input
          type="number"
          v-model="form.kode"
          id="kode"
          class="form-control"
          :disabled="isEdit"
          required
        />
      </div>
      <div class="mb-3">
        <label for="nama" class="form-label">Nama Barang</label>
        <input
          type="text"
          v-model="form.nama"
          id="nama"
          class="form-control"
          required
        />
      </div>
      <div class="mb-3">
        <label for="deskripsi" class="form-label">Deskripsi</label>
        <input
          type="text"
          v-model="form.deskripsi"
          id="deskripsi"
          class="form-control"
          required
        />
      </div>
      <div class="mb-3">
        <label for="stok" class="form-label">Stok</label>
        <input
          type="number"
          v-model="form.stok"
          id="stok"
          class="form-control"
          required
        />
      </div>
      <button type="submit" class="btn btn-success">
        {{ isEdit ? "Simpan Perubahan" : "Tambah Barang" }}
      </button>
    </form>
  </div>
</template>
<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => ({}),
    },

    isEdit: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      form: {
        kode: "",
        nama: "",
        deskripsi: "",
        stok: 0,
      },
    };
  },
  watch: {
    item: {
      immediate: true,
      handler(newItem) {
        // Jika dalam mode edit, mengisi form dengan data item
        if (this.isEdit) {
          this.form = { ...newItem };
        } else {
          // Jika bukan mode edit, reset form ke nilai awal
          this.form = {
            kode: "",
            nama: "",
            deskripsi: "",
            stok: 0,
          };
        }
      },
    },
  },
  methods: {
    // Metode untuk menangani submit form
    submitForm() {
      // Memastikan semua field dalam form terisi
      if (this.form.stok === 0) {
        alert("Stok tidak boleh bernilai 0");
        // Memancarkan event submit dengan data form
      } else {
        this.$emit("submit", this.form);
      }
    },
  },
  // Mendefinisikan event yang dapat dipancarkan oleh komponen ini
  emits: ["submit"],
};
</script>
<style scoped></style>
