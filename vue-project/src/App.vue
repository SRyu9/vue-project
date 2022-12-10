<template>
  <v-app>
    <div>
      <v-app-bar
      color="#6A76AB"
      dark
    >
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>SMIL</v-toolbar-title>

      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-bell</v-icon>
      </v-btn>

      <v-avatar color="indigo">
        <v-icon dark>
          mdi-account-circle
        </v-icon>
      </v-avatar>

      <v-menu
        left
        bottom
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item
            v-for="n in 5"
            :key="n"
            @click="() => {}"
          >
            <v-list-item-title>Option {{ n }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
   </div>
  <div>
    <router-link
        :to="'/login?redirect=' + $route.fullPath"
        v-if="$route.path !== '/login'"
       >Login</router-link
      >
    <v-navigation-drawer v-model="drawer">
      <v-list>
        <v-list-item
          v-for="[icon, text, to] in links"
          :key="icon"
          :to="to"
          link
        >
        <template v-slot:prepend>
          <v-icon>{{ icon }}</v-icon>
        </template>
        <v-list-item-title>{{ text }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

  </div>
    
    <router-view/>
    <notifications width="30%" position="bottom center"/>
  </v-app>
  
  
</template>

<script>
// import {success} from '@/message'
import { notify } from "@kyvg/vue3-notification";


export default {
    data: () => ({
      cards: ['Recently added orders', 'Deadline is coming up soon'],
      drawer: null,
      links: [
        ['mdi-home', 'Home', '/'],
        ['mdi-shopping', 'Order', '/orders'],
        ['mdi-pencil-ruler', 'Design', '/design'],
        ['mdi-hammer-screwdriver', 'Part/Bom', '/parts'],
        ['mdi-bell', 'Notifications', '/notifications'],
      ],
    }),
    mounted: () => {
      notify({
        title: "Title",
        text: "Message",
        duration: {
          type: Number,
          default: 3000,
        },
      });
    }
  }
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.title {
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
