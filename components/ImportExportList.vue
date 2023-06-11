<template>
  <div class="mb-3">
      <b-button v-b-toggle.collapse-1 variant="primary" class="toggleCollapse">Import/Export Reading List</b-button>
      <b-collapse id="collapse-1">
        <b-card no-body>
          <b-tabs card>
            <b-tab title="YAML" active>
              <b-card-text>
                <b-button @click="exportToYAML" variant="primary" class="mb-3 exportToYAML">Export to YAML</b-button>
                <br>
                <b-form-group label="Import from YAML:" label-cols-sm="2">
                  <input type="file" ref="doc" @change="importFromYaml()" />
                </b-form-group>
              </b-card-text>
            </b-tab>
            <b-tab title="Pantry">
              <b-overlay :show="loading" rounded="sm">
                <b-card-text>
                  <b-form-group label="Pantry ID:" label-cols-sm="2">
                    <b-form-input v-model="pantryId" placeholder="Pantry ID"></b-form-input>
                  </b-form-group>
                  <b-form-group label="Basket Name:" label-cols-sm="2">
                    <b-form-input v-model="basketName" placeholder="Basket Name"></b-form-input>
                  </b-form-group>
                  <b-button @click="exportToPantry" variant="primary" class="mb-3 exportToPantry">Export to Pantry</b-button>
                  <b-button @click="importFromPantry" variant="primary" class="mb-3 importFromPantry">Import from Pantry</b-button>
                  <b-alert v-model="showErrorAlert" variant="danger" dismissible>
                    {{ alertText }}
                  </b-alert>
                  <b-alert v-model="showSuccessAlert" variant="success" dismissible>
                    {{ alertText }}
                  </b-alert>
                </b-card-text>
              </b-overlay>
            </b-tab>
          </b-tabs>
        </b-card>
      </b-collapse>

       
  </div>
</template>

<script>
import YAML from 'yaml'

export default {
    name: "ImportExportList",
    data() {
      return {
        pantryId: '',
        basketName: '',
        loading: false,
        showErrorAlert: false,
        showSuccessAlert: false,
        alertText: ""
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
        this.loading = true;
        const config = {
          headers: {
            'Content-Type': 'application/json'
          }
        }

        const listStringified = JSON.stringify(this.$store.state.booklist);
        await this.$axios.$post(`https://getpantry.cloud/apiv1/pantry/${this.pantryId}/basket/${this.basketName}`, listStringified, config).then((res) => {
          this.loading = false;
          this.showSuccessAlert = true;
          this.alertText = "Good news! Your list has successfully been exported to you Pantry Basket."
        }).catch((err) => {
          this.loading = false;
          this.showErrorAlert = true;
          this.alertText = "Unfortunately we were unable to export your list to your Pantry Basket. Please verify the details you have entered and try again."
          console.log(err)
        })
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
          this.loading = false;
          this.showSuccessAlert = true;
          this.alertText = "Good news! Your list has successfully been imported from Pantry."
        }).catch((err) => {
          this.loading = false;
          this.showErrorAlert = true;
          this.alertText = "Unfortunately we were unable to import data from Pantry. Please verify the details you have entered and try again."
          console.log(err)
        })
      },
      commitImportToStore(importData) {
        this.$store.commit('IMPORT_BOOKLIST', importData);
        location.reload();
      }
    }
}
</script>
