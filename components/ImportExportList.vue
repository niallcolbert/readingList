<template>
  <div>
       <button @click="exportToYAML" class="update">Export to YAML</button>
        <label>Import from YAML</label><input type="file" ref="doc" @change="importFromYaml()" />

      <p class="pantryId">
        Pantry ID: <input v-model="pantryId" type="text">
      </p>
      <p class="basketName">
        Basket Name: <input v-model="basketName" type="text">
      </p>
      <button @click="exportToPantry" class="update">Export to Pantry</button>
      <button @click="importFromPantry" class="update">Import from Pantry</button>
  </div>
</template>

<script>
import YAML from 'yaml'

export default {
    name: "ImportExportList",
    data() {
      return {
        pantryId: '',
        basketName: ''
      };
    },
    methods: {
      exportToYAML() {
        let listToYAML = YAML.stringify(this.$store.state.booklist);
        this.downloadToFile(listToYAML);        
      },
      downloadToFile(listToYAML) {
        const a = document.createElement('a');
        const file = new Blob([listToYAML], { type: 'text/yaml' });

        a.href = URL.createObjectURL(file);
        a.download = 'readinglist.yaml';
        a.click();

        URL.revokeObjectURL(a.href);
      },
      async exportToPantry() {
        const config = {
          headers: {
            'Content-Type': 'application/json'
          }
        }

        const listStringified = JSON.stringify(this.$store.state.booklist);
        await this.$axios.$post(`https://getpantry.cloud/apiv1/pantry/${this.pantryId}/basket/${this.basketName}`, listStringified, config).then((res) => {
          console.log(res);
        }).catch((err) => console.log(err))
      },
      importFromYaml() {
        let file = this.$refs.doc.files[0];
        const reader = new FileReader();
        if (file.name.includes(".yaml")) {
          reader.onload = (res) => {
            let content = res.target.result;
            this.commitImportToStore(YAML.parse(content).books);
          };
          reader.onerror = (err) => console.log(err);
          reader.readAsText(file);
        } else {
          console.log('invalid file type');
        }
      },
      async importFromPantry() {
        await this.$axios.$get(`https://getpantry.cloud/apiv1/pantry/${this.pantryId}/basket/${this.basketName}`).then((res) => {
          this.commitImportToStore(res.books);
        }).catch((err) => console.log(err))
      },
      commitImportToStore(importData) {
        this.$store.commit('IMPORT_BOOKLIST', importData);
        location.reload();
      }
    }
}
</script>
