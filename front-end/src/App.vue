<template>
  <v-app>
    <v-container fluid class="fill-height pl-0">

      <v-card class="fill-height rounded-sm mt-13">
        <v-navigation-drawer
            permanent
            width="50px"
        >
          <v-list
              nav
              dense
          >
            <v-list-item link>
              <v-list-item-icon>
                <v-icon>mdi-folder</v-icon>
              </v-list-item-icon>

            </v-list-item>
            <v-list-item link>
              <v-list-item-icon>
                <v-icon>mdi-account-multiple</v-icon>
              </v-list-item-icon>
            </v-list-item>
            <v-list-item link>
              <v-list-item-icon>
                <v-icon>mdi-star</v-icon>
              </v-list-item-icon>
            </v-list-item>
          </v-list>
        </v-navigation-drawer>
      </v-card>

      <v-app-bar class='text-h4 elevation-0' style="color: white" color="primary" app>
        <div style="width: 100%" class="d-flex justify-space-between">
          <span class="d-flex">Fake GSKED Teams app in dev mode for real</span>
          <span class="d-flex subtitle-2">
            {{ userPrincipalName }}
          </span>
        </div>
      </v-app-bar>


      <!-- Sizes your content based upon application components -->
      <v-main>
        <div style="width: 800px">  <pre>{{ userInfo }}</pre></div>
        <!-- Provides the application the proper gutter -->
        <v-container fluid>
          <v-card color="grey lighten-2" class="pa-3">
            <v-card-title>
              To do list
            </v-card-title>
            <v-card-subtitle>draft version</v-card-subtitle>

            <v-card class="mb-4" v-for="(task, index) in taskList" :key="`${index}`">
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
                  open video
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
      userPrincipalName: '',
      userInfo: '',
      token: {},
      user: '',
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

  created() {
    microsoftTeams.initialize()
  },
  async mounted() {
    this.getContext()
   await this.getToken()



  },
  methods: {

    async getUserProfile(token) {

      const graphResponse = await fetch(`https://graph.microsoft.com/v1.0/${this.userPrincipalName}`,
          {
            method: 'GET',
            headers: {
              "accept": "application/json",
              "authorization": `${token}`
            },
            mode: 'cors',
            cache: 'default'
          });
      console.log(graphResponse)
      if (!graphResponse.ok) {
        throw (`Error ${graphResponse.status} calling Microsoft Graph: ${graphResponse.statusText}`);
      }
      return graphResponse.json();
    },


    async getToken() {
      const authTokenRequest = {
        successCallback: async (result) => {
          console.log("Success: " + result);
          this.getAuthentificaionToken(result)
        },
        failureCallback: (error) => {
          console.log("Failure: " + error);
        }
      };
      this.token = microsoftTeams.authentication.getAuthToken(authTokenRequest);
    },
    getContext() {
      microsoftTeams.getContext((context) => {
        console.log(context)
        this.userPrincipalName = context.userPrincipalName
        this.tabContext = JSON.stringify(context, null, '\t')
      })
    },
    getAuthentificaionToken(token) {
      fetch(`http://localhost:3030/userProfile?token=${token}`)
          .then(async response => {
            const temp = await response.json()
            this.userInfo =JSON.stringify(JSON.parse(temp), null, '\t')
            console.log(this.userInfo)
          })
          .catch((error) => {
            console.error('Error:', error);
          });

      // const url = "https://login.microsoftonline.com/4a8567aa-3a72-4dbd-91f9-b0a141b206f1/v2.0";
      // const params = {
      //   "grant_type": "urn:ietf:params:oauth:grant-type:jwt-bearer",
      //   "client_id": '69454f0c-36a1-42e9-a7e5-1f453a124b41',
      //   "client_secret": 'DDL7Q~ggBz2ZFpmeuY25pB_QSBhbcgom_-IlR',
      //   "scope": 'access_as_user',
      //   "requested_token_use": "on_behalf_of",
      //   "assertion": this.token
      // };
      // fetch(url, {
      //   method: "POST",
      //   body: this.toQueryString(params),
      //   headers: {
      //     Accept: "application/json",
      //     "Content-Type": "application/x-www-form-urlencoded"
      //   },
      //   mode: 'cors',
      // }).then(result => {
      //   if (result.status !== 200) {
      //     result.json().then(json => {
      //       console.log('error: ', json)
      //     });
      //   } else {
      //     result.json().then(json => {
      //       console.log('Success: ', json)
      //     });
      //   }
      // });
    },

    toQueryString(queryParams) {
      let encodedQueryParams = [];
      for (let key in queryParams) {
        encodedQueryParams.push(key + "=" + encodeURIComponent(queryParams[key]));
      }
      return encodedQueryParams.join("&");
    }
  }
};
</script>
