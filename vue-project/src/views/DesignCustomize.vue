<template>
    <v-main class="bg-dark-lighten-1">
      <div class="mx-5" ><span class="text-grey">#1234</span><h1>ProjectA</h1></div>
      <div class="mx-5">
        <v-row
          align="center"
          class="my-5"
          no-gutters
        >
        <!-- 担当者 -->
        <v-col
            cols="4"
            sm="2"
            md="1"
          >
              <v-icon
                color="red"
                icon="mdi-account-multiple"
              ></v-icon>
          </v-col>
          <v-col
            class="hidden-xs-only text-left ml-2"
            sm="5"
            md="3"
          >
            <strong>Sales</strong>
          </v-col>
          <!-- 期日 -->
          <v-col
            cols="4"
            sm="2"
            md="1"
          >
              <v-icon
                color="teal"
                icon="mdi-calendar"
              ></v-icon>
          </v-col>

          <v-col
            class="hidden-xs-only text-left ml-2"
            sm="5"
            md="3"
          >
            <strong>2022/12/7</strong>
          </v-col>
      </v-row>
      <v-divider></v-divider>
      <div class="my-5">
        <h3>Part Component</h3>
      </div>
      <v-table>
        <thead>
          <tr>
            <th class="text-left">
              PartId
            </th>
            <th class="text-left">
              PartName
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in parts"
            :key="item.partId"
          >
            <td>{{ item.partId }}</td>
            <td>{{ item.partName }}</td>
          </tr>
        </tbody>
      </v-table>
      <div class="my-3"></div>
      <v-divider></v-divider>
      </div>
      <div class="mx-5">
        <v-text-field 
            v-model="keyward" 
            label="Search Part Bom"
            prepend-inner-icon="mdi-magnify">

        </v-text-field>
      </div>
      
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
      messages: [
        {
          color: 'red',
          icon: 'mdi-account-multiple',
          name: 'Social',
          new: 1,
          total: 3,
          title: 'Twitter',
        },
        {
          color: 'teal',
          icon: 'mdi-calendar',
          name: 'Promos',
          new: 2,
          total: 4,
          title: 'Shop your way',
          exceprt: 'New deals available, Join Today',
        },
      ],
      keyward: '',
      parts: [

      ]
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