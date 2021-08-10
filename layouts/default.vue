<template>
  <v-app dark>
    <v-progress-linear
      :active="topLoader"
      :indeterminate="topLoader"
      absolute
      top
      color="secondary"
      style="z-index: 9;"
      height="2"
    ></v-progress-linear>
    <v-app-bar color="primary" :clipped-left="clipped" app :height="56" flat>
      <logo />
      <v-spacer />
      <div class="body-2 mr-2 white--text font-weight-medium">
        Hassan Mehmood
      </div>

      <v-avatar :size="35" color="secondary">
        <span class="white--text font-weight-medium">H</span>
      </v-avatar>
    </v-app-bar>
    <v-main>
      <v-container fluid class="pt-0">
        <nuxt />
      </v-container>
      <snackbar />
    </v-main>
  </v-app>
</template>

<script>
import Logo from "~/components/logo.vue";
export default {
  components: {
    Logo
  },
  data() {
    return {
      clipped: false,
      title: "Hassan Mehmood",
      scrollSettings: {
        maxScrollbarLength: 160
      },
      onTop: true
    };
  },
  computed: {
    topLoader() {
      return this.$store.getters["pageHeader/getTopLoader"];
    }
  },
  created() {
    // Register the events
    // window.getApp = this;
  }
};
</script>
