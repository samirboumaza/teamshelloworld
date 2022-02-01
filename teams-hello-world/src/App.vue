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
                <v-list-item-subtitle>{{ tabContext.userPrincipalName }}</v-list-item-subtitle>
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


      <v-app-bar class='text-h4 elevation-0' color="primary" app>
        Test Teams app
      </v-app-bar>


      <!-- Sizes your content based upon application components -->
      <v-main>
        <!-- Provides the application the proper gutter -->
        <v-container fluid>
{{user}}
          <v-card color="grey lighten-2" class="pa-3">
            <v-card-title>
              To do list
            </v-card-title>
            <v-card-subtitle>draft version</v-card-subtitle>


            <v-card class="mb-4" v-for="(task, index) in taskList" :key="index">
              <v-card-title class="d-flex justify-space-between ">
                <span class="d-flex" :class="{'text-decoration-line-through': task.done}">  {{ task.task }} </span>
                <div class="d-flex">
                  <v-checkbox v-model="task.done" hide-details class="ma-0"></v-checkbox>
                  <v-btn icon small>
                    <v-icon @click="taskList.splice(index, 1)">
                      mdi-close
                    </v-icon>

                  </v-btn>
                </div>
              </v-card-title>

            </v-card>

          </v-card>

          <div class="text-center mt-3" style="width: 100%; height: 600px">
            <v-dialog
                v-model="dialog"
                width="800"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                    color="red lighten-2"
                    dark
                    v-bind="attrs"
                    v-on="on"
                >
                  Click Me
                </v-btn>
              </template>

              <v-card>
                <div class="d-flex justify-center align-center">
                  <iframe
                      class="mt-10"
                      width="697"
                      height="392"
                      src="https://www.youtube.com/embed/aqz-KE-bpKQ"
                      title="YouTube video player"
                      frameborder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowfullscreen>
                  </iframe>
                </div>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                      color="primary"
                      text
                      @click="dialog = false"
                  >
                    Close
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </div>
        </v-container>
      </v-main>

      <v-footer app>
        <!-- -->
      </v-footer>


    </v-container>


  </v-app>
</template>

<script>

import * as microsoftTeams from "@microsoft/teams-js";

export default {
  name: "App",
  data() {
    return {
      user:'',
      dialog: false,
      taskList: [
        {"task": "HTML I", "done": true},
        {"task": "CSS", "done": true},
        {"task": "Responsive design", "done": true},
        {"task": "Git", "done": true},
        {"task": "JavaScript I", "done": true},
        {"task": "JavaScript II", "done": false}
      ],
      tabContext: {},
      drawer: false,
      items: [
        {title: 'Dashboard', icon: 'mdi-view-dashboard'},
        {title: 'Account', icon: 'mdi-account-box'},
        {title: 'Admin', icon: 'mdi-gavel'},
      ],// Hide mobile side menu by default
    };
  },

  beforeCreate() {
    microsoftTeams.initialize()
  },
  mounted() {
    fetch('https://graph.microsoft.com/v1.0/me')
        .then(response => this.user = response.json())
    this.getContext()
  },
  methods: {
    getContext() {

      microsoftTeams.getContext((context) => {
        this.tabContext = context
      })
    }
  }
};
</script>