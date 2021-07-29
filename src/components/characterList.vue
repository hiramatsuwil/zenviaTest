<template>
  <div class="card rounded-lg overflow-hidden shadow">
    <div class="">
      <img :src="char.img" :alt="char.name" class="char-img">
    </div>

    <div class="py-3">
      <div class="mb-2">
        <span class="text-muted">Name:</span> {{ char.name }}<br>
        <span class="text-muted">Nickname:</span> {{ char.nickname }}
      </div>
      <router-link :to="`details/${char.char_id}`">
        <i class="fas fa-plus mr-1"></i>More details
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    char:{
        type: Object,
        required: true,
        default: () => []
    }
  }
}
</script>

<style lang="sass">
.char-img
  height: 350px
  width: 100%
  object-fit: cover

  overflow: hidden
@media (max-width: 630px)
  .char-img
    object-position: top
</style>
