<template>
  <v-app>
    <v-container fluid class="fill-height pl-0">
    <v-card class="fill-height rounded-sm mt-13">
      <v-navigation-drawer
          permanent
          expand-on-hover
      >
        <v-list>
          <v-list-item class="px-2">
            <v-list-item-avatar>
              <v-img src="https://randomuser.me/api/portraits/women/85.jpg"></v-img>
            </v-list-item-avatar>
          </v-list-item>

          <v-list-item link>
            <v-list-item-content>
              <v-list-item-title class="text-h6">
                Sandra Adams
              </v-list-item-title>
              <v-list-item-subtitle>{{tabContext.userPrincipalName}}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list
            nav
            dense
        >
          <v-list-item link>
            <v-list-item-icon>
              <v-icon>mdi-folder</v-icon>
            </v-list-item-icon>
            <v-list-item-title>My Files</v-list-item-title>
          </v-list-item>
          <v-list-item link>
            <v-list-item-icon>
              <v-icon>mdi-account-multiple</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Shared with me</v-list-item-title>
          </v-list-item>
          <v-list-item link>
            <v-list-item-icon>
              <v-icon>mdi-star</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Starred</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </v-card>


    <v-app-bar class='text--white text-h4 elevation-0' color="primary" app>
      Test Teams app hello
    </v-app-bar>


    <!-- Sizes your content based upon application components -->
    <v-main>
      <!-- Provides the application the proper gutter -->
      <v-container fluid>

      <v-card>
        <v-card-title>
          To do list
        </v-card-title>
        <v-card-subtitle>draft version</v-card-subtitle>

        <v-card>
          <v-card-actions></v-card-actions>
        </v-card>

      </v-card>
      </v-container>
    </v-main>

    <v-footer app>
      <!-- -->
    </v-footer>
  </v-container></v-app>
</template>

<script>

import * as microsoftTeams from "@microsoft/teams-js";

export default {
  name: "App",
  data() {
    return {
      tabContext:{},
      drawer: false,
      items: [
        { title: 'Dashboard', icon: 'mdi-view-dashboard' },
        { title: 'Account', icon: 'mdi-account-box' },
        { title: 'Admin', icon: 'mdi-gavel' },
      ],// Hide mobile side menu by default
    };
  },

  beforeCreate() {
    microsoftTeams.initialize()
  },
  mounted() {
    this.getContext()
    },
  methods:{
    getContext(){

      microsoftTeams.getContext((context)=> {
        console.log('test')
      console.log("context :",context)
     this.tabContext =  context


      })  }
  }
};
</script>