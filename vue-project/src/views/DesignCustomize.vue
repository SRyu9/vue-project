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
        <div>
          <v-row no-gutters>
            <v-col
              cols="12"
              sm="6"
              md="8"
            >
            </v-col>
            <v-col
              cols="6"
              md="4"
            >
            <v-btn
                variant="outlined"
                size="large"
                icon
                color="info"
                @click="edit"
              >
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            </v-col>
          </v-row>
        </div>
      </div>
      <v-table>
        <thead v-show="isDisplayHeader">
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
            v-for="item in add_parts"
            :key="item.partId"
          >
            <td>{{ item.partId }}</td>
            <td>{{ item.partName }}</td>
            <td>
              <v-btn
                color="error"
                variant="plain"
                @click="delete_part(item.partId)"
                >
                Delete
              </v-btn>
            </td>
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
            v-for="item in filterd_partboms"
            :key="item.partId"
          >
            <td>{{ item.partId }}</td>
            <td>{{ item.partName }}</td>
            <td>
              <v-btn
                color="secondary"
                prepend-icon="mdi-plus"
                @click="add_part(item.partId)"
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
 import order_service from '@/service/order'
 import message_service from '@/message/index'

export default {
  data () {
    return {
      hasSaved: false,
      isEditing: null,
      isDisplayHeader: false,
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
      selected_project:[

      ],
      keyward: '',
      add_parts: [

      ],
      search_partboms: [

      ],
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
    edit: function(){
      console.log(this.selected_project)
      message_service.success(this.selected_project.projectNo)
    },
    get_project (){
      const self = this
      order_service.show(this.$route.query.id).then(function(res){
        self.selected_project = res.data;
      });
    },
    //api call
    fetch_partboms: function(){
        const self = this
        partbom_service.show().then(function(res){
          self.search_partboms = res.data;
        });
    },
    add_part: function(val){
      const self = this
      const partId = val
      partbom_service.show(partId).then(function(res){
          self.add_parts.push(res.data)
      });
      this.isDisplayHeader = true
    },
    delete_part: function(val){
      const self = this
      const partId = val
      var index = this.add_parts.indexOf(partId);
      self.add_parts.splice(index, 1);

      if(this.add_parts.length == 0){
        this.isDisplayHeader = false
      }
    }
  },
  computed: {
      filterd_partboms: function (){
        const self = this
        if(this.keyward){
          return this.search_partboms.filter(function(partbom){
            return partbom.partName.indexOf(self.keyward) !== -1
          })
        }else{
          return this.search_partboms
        }
      }
  },
  mounted: function(){
      this.get_project()
      this.fetch_partboms()
      if(this.add_parts.length == 0){
        this.isDisplayHeader = false
      }else{
        this.isDisplayHeader = true
      }
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