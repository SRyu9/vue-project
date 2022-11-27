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
      <div class="mx-5 search_bar">
        <v-icon
          large
          color="blue-grey darken-2"
        >
          mdi-magnify
        </v-icon>
        <input type="text" id="text2"
         placeholder="Search Part Bom..."
         v-model="keyward"
         >
      </div>
      <div class="mx-5">
        <v-table>
        <thead>
          <tr>
            <th class="text-left">
              PartId
            </th>
            <th class="text-left">
              PartName
            </th>
            <th class="text-left">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in search_partboms"
            :key="item.partId"
          >
            <td>{{ item.partId }}</td>
            <td>{{ item.partName }}</td>
            <td>
              <v-btn
                color="primary"
                prepend-icon="mdi-plus"
                >
                Add
              </v-btn>
            </td>
          </tr>
        </tbody>
      </v-table>
      </div>
    </v-main>
  </template>
  
  <script>
 import partbom_service from '@/service/partbom'


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

      ],
      search_partboms: [

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
    fetch_partboms: function(){
        const self = this
        partbom_service.show().then(function(res){
          console.log(res);
          console.log(res.status);
          self.search_partboms = res.data;
        });
      }
  },
  watch: {
      keyward: function (val){
        console.log(val)
      }
  },
  mounted: function(){
      this.fetch_partboms()
    }
}
</script>

<style scoped>

.search_bar{
    display: flex; /*アイコン、テキストボックスを調整する*/
    align-items: center; /*アイコン、テキストボックスを縦方向の中心に*/
    justify-content: center; /*アイコン、テキストボックスを横方向の中心に*/
    height: 50px;
    width: 70%;
    background-color: #ddd;
}

.search_icon{ /*アイコンに一定のスペースを設ける*/
    height: 15px;
    width: 15px;
    padding: 5px 5px;
}

#text2{
    font-size: 16px;
    width: 100%; /*flexの中で100%広げる*/
    background-color: #ddd;
    border: none; /*枠線非表示*/
    outline: none; /*フォーカス時の枠線非表示*/
    box-sizing: border-box; /*横幅の解釈をpadding, borderまでとする*/
}

</style>