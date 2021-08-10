<template>
  <!-- Snackbar -->
  <v-snackbar :timeout="config.timeout" top right :color="config.color" v-model="config.show">
    <!-- For Multiple actions case -->
    <template v-if="config.actions">
      <v-flex>
        <v-card-text class="pa-0">{{ config.text }}</v-card-text>
        <v-card-actions class="pa-0 pt-2">
          <v-spacer></v-spacer>
          <v-btn
            v-for="(action,index) in config.actions"
            dark
            text
            small
            :key="index"
            @click="action.onClick(snackbar)"
          >
            <v-icon small left v-if="action.icon">{{action.icon}}</v-icon>
            {{action.name}}
          </v-btn>
        </v-card-actions>
      </v-flex>
    </template>
    <!-- For default single action case -->
    <template v-else>
      {{ config.text }}
      <v-btn dark text @click.native="config.show = false" icon small>
        <v-icon small>mdi-close</v-icon>
      </v-btn>
    </template>
  </v-snackbar>
</template>
<script>
export default {
  data: () => ({
    config: {
      show: false,
      text: null,
      color: null,

    }
  }),
  created() {
    // window.getApp.snackbar = this;
  }
};
</script>