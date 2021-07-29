<template>
  <div class="home">
    <b-container>

      <div v-if="showLoader" class="text-center my-5">
        <div class="spinner-border text-success" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </div>

      <b-row v-else >
        <b-col sm="12">
          <b-input-group size="sm" class="my-3">
            <template v-slot:append>
              <b-input-group-text class="bg-white"><i class="fas fa-search"></i></b-input-group-text>
            </template>
            <b-form-input
              v-model="searchQuery"
              type="search"
              class="form-control border-right-0"
              placeholder="Search">
            </b-form-input>
          </b-input-group>
        </b-col>

        <b-col id="charList" class="mb-4" lg="3" md="4" sm="6" v-for="(element, index) in filteredList" :key="index" >
          <characterList :char="element"/>
        </b-col>

        <b-col sm="12" class="mb-3">
          <b-pagination
            v-model="currentPage"
            :per-page="perPage"
            :total-rows="rows"
            aria-controls="charList"
            align="center"
          ></b-pagination>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import characterList from '@/components/characterList.vue'
import { getCharacters } from '@/api/breakingbadApi';

export default {
  components: {
    characterList
  },
  data() {
    return {
      characters: [],
      currentPage: 1,
      perPage: 12,
      showLoader: true,
      searchQuery: ''
    }
  },
  created(){
    this.showLoader = true
    getCharacters().then((response) => {
      this.characters = response.data
      this.showLoader = false
    }, (error) => {
      console.log(error)
    });
  },
  computed: {
    filter() {
      return this.characters.filter(element => {
        return element.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      })
    },
    filteredList(){
      return this.filter.slice(
        (this.currentPage - 1) * this.perPage,
        this.currentPage * this.perPage,
      );
    },
    rows(){
      return this.filter.length
    }
  }
}
</script>


