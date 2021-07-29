<template>
  <div class="details">
    
    <div v-if="showLoader" class="text-center my-5">
      <div class="spinner-border text-success" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>

    <b-container v-else>
      <div class="text-left my-3">
        <router-link to="/">
          <i class="fas fa-chevron-left mr-1"></i>Back
        </router-link>
      </div>

      <b-row>
        <b-card no-body class="overflow-hidden shadow w-100">
          <b-row no-gutters>
            <b-col lg="3" md="4" sm="12">
              <div class="card-img w-100">
                <b-card-img :src="character.img" :alt="character.name" class="rounded-0"></b-card-img>
              </div>
            </b-col>
            <b-col lg="9" md="8" sm="12">
              <b-card-body class="text-left" :title="character.name">
                <b-card-text>
                  <span class="text-muted">Nickname:</span> {{ character.nickname }}<br>
                  <span class="text-muted">Birthday:</span> {{ convertDate(character.birthday) }}<br>
                  <span class="text-muted">Appearance (seasons):</span> <span v-for="(season, index) in character.appearance" :key="`appearance-${index}`">{{ character.appearance.length == index+1 ? season : `${season},` }} </span><br>
                  <span class="text-muted">Occupation:</span> <span v-for="(occupation, index) in character.occupation" :key="`occupation-${index}`">{{ character.occupation.length == index+1 ? occupation : `${occupation},` }} </span><br>
                  <span class="text-muted">Status:</span> <span :class="`badge ${character.status == 'Alive' ? 'badge-success' : 'badge-danger'}`">{{ character.status }}</span><br>
                  <span class="text-muted">Actor/Actress:</span> {{ character.portrayed }}
                  <blockquote v-if="quoteByChar" class="blockquote text-center mt-4">
                    <p class="mb-0">{{ quoteByChar.quote }}</p>
                    <footer class="blockquote-footer">{{ quoteByChar.author }} in <cite :title="quoteByChar.series">{{ quoteByChar.series }}</cite></footer>
                  </blockquote>
                </b-card-text>
              </b-card-body>
            </b-col>
          </b-row>
        </b-card>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { getCharacterById, getCharacterQuote } from '@/api/breakingbadApi';

export default {
  components: {
  },
  data() {
    return {
      character: [],
      showLoader: true,
      nameToFind: '',
      quote: '',
    }
  },
  mounted(){
    this.showLoader = true
    getCharacterById(this.$route.params.id).then((response) => {
      this.character = response.data[0]
      this.nameToFind = this.character.name.replace(/ /g, "+");
      this.getQuote()
    }, (error) => {
      console.log(error)
    });
  },
  computed: {
    quoteByChar(){
      return this.quote
    }
  },
  methods: {
    convertDate(date){
      if(date == 'Unknown'){
        return date
      }
      let dateObject = new Date(date);
      let formattedDate = ((((dateObject.getMonth() + 1)) )) + "/" + dateObject.getDate() + "/" + dateObject.getFullYear(); 
      return formattedDate
    },
    getQuote(){
      getCharacterQuote(this.nameToFind).then((response) => {
        this.quote = response.data[0]
        this.showLoader = false
      }, (error) => {
        console.log(error)
      });
    }
  }

}
</script>