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
              <v-list-item-subtitle>sandra_a88@gmail.com</v-list-item-subtitle>
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
      Test Teams app hello {{tabContext.userPrincipalName}}
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
     this.tabContext =  context || {
          "teamId": "The Microsoft Teams ID in the format 19:[id]@thread.skype",
            "teamName": "The name of the current team",
            "channelId": "The channel ID in the format 19:[id]@thread.skype",
            "channelName": "The name of the current channel",
            "chatId": "The chat ID in the format 19:[id]@thread.skype",
            "locale": "The current locale of the user formatted as languageId-countryId (for example, en-us)",
            "entityId": "The developer-defined unique ID for the entity this content points to",
            "subEntityId": "The developer-defined unique ID for the sub-entity this content points to",
            "loginHint": "A value suitable as a login hint for Azure AD. This is usually the login name of the current user, in their home tenant",
            "userPrincipalName": "The principal name of the current user, in the current tenant",
            "userObjectId": "The Azure AD object id of the current user, in the current tenant",
            "tid": "The Azure AD tenant ID of the current user",
            "groupId": "Guid identifying the current O365 Group ID",
            "theme": "The current UI theme: default | dark | contrast",
            "isFullScreen": "Indicates if the tab is in full-screen",
            "teamType": "The type of team",
            "teamSiteUrl": "The root SharePoint site associated with the team",
            "teamSiteDomain": "The domain of the root SharePoint site associated with the team",
            "teamSitePath": "The relative path to the SharePoint site associated with the team",
            "channelRelativeUrl": "The relative path to the SharePoint folder associated with the channel",
            "sessionId": "The unique ID for the current Teams session for use in correlating telemetry data",
            "userTeamRole": "The user's role in the team",
            "isTeamArchived": "Indicates if team is archived",
            "hostClientType": "The type of host client. Possible values are android, ios, web, desktop, rigel",
            "frameContext": "The context where tab URL is loaded (for example, content, task, setting, remove, sidePanel)",
            "sharepoint": "The SharePoint context is available only when hosted in SharePoint",
            "tenantSKU": "The license type for the current user tenant. Possible values are enterprise, free, edu, unknown",
            "userLicenseType": "The license type for the current user",
            "parentMessageId": "The parent message ID from which this task module is launched",
            "ringId": "The current ring ID",
            "appSessionId": "The unique ID for the current session used for correlating telemetry data",
            "isCallingAllowed": "Indicates if calling is allowed for the current logged in user",
            "isPSTNCallingAllowed": "Indicates if PSTN calling is allowed for the current logged in user",
            "meetingId": "The meeting ID used by tab when running in meeting context",
            "defaultOneNoteSectionId": "The OneNote section ID that is linked to the channel",
            "isMultiWindow": "The indication whether the tab is in a pop out window"
        }


      })  }
  }
};
</script>