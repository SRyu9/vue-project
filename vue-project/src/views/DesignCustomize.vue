<template>
    <v-main class="bg-dark-lighten-1">
        <v-autocomplete
            v-model="model"
            v-model:search-input="search"
            :items="items"
            chips
            clearable
            hide-details
            hide-selected
            item-title="name"
            item-value="symbol"
            label="Search for a part / bom"
            variant="solo"
            >
        </v-autocomplete>
        <v-btn
            color="primary"
            prepend-icon="mdi-plus"
            >
            Add
        </v-btn>
    </v-main>
  </template>
  
  <script>
 import order_service from '@/service/order'


export default {
  data () {
    return {
      hasSaved: false,
      isEditing: null,
      model: null,
      states: [
        { name: 'Information', id: 1 },
        { name: 'Inquiry', id: 2 },
        { name: 'Received', id: 3 },
      ],
      customers: [
        { name: 'Sales',  id: 'SALES' },
        { name: 'Design',  id: 'DESIGN' },
        { name: 'Production', id: 'PRODUCTION' },
      ],
      order: [],
    }
  },
  methods: {
    customFilter (item, queryText) {
      const textOne = item.name.toLowerCase()
      const textTwo = item.abbr.toLowerCase()
      const searchText = queryText.toLowerCase()

      return textOne.indexOf(searchText) > -1 ||
        textTwo.indexOf(searchText) > -1
    },
    save () {
      this.isEditing = !this.isEditing
      this.hasSaved = true
    },
    //api call
    get_order (){
      const self = this
      order_service.show(this.$route.query.id).then(function(res){
        console.log(res);
        console.log(res.status);
        self.order = res.data;
      });
    }
  },
  mounted: function(){
    this.get_order()
  }
}
</script>

<style scoped>

</style>