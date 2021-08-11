<template>
  <v-app>
    <v-progress-linear
      :active="topLoader"
      :indeterminate="topLoader"
      absolute
      top
      color="secondary"
      style="z-index: 9"
      height="2"
    />
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      app
      temporary
      absolute
      :width="245"
    >
      <v-list class="pa-0">
        <v-list-item router class="px-2 ">
          <!-- <v-list-item-action class="ma-0 ml-1">
            <img
              :src="`${$appURL}images/roadsurfer-campervan-hire.jpg`"
              alt
              width="50"
              :class="miniVariant ? 'ml-2' : ''"
            />
          </v-list-item-action> -->
          <v-list-item-content v-if="!miniVariant" class="py-0 text-center">
            <v-list-item-title>
              <div class="pt-1">
                <span class="grey--text lighten-2" style="font-size: 20px">
                  RS
                </span>
                <span
                  class="font-weight-bold primary-color text-decoration-none"
                  style="font-size: 20px"
                >
                  Back Office
                </span>
              </div>
            </v-list-item-title>
          </v-list-item-content>
          <v-list-item-content v-else class="py-0 px-0 text-center">
            <v-avatar :size="35" color="primary">
              <span class="white--text font-weight-medium">RS</span>
            </v-avatar>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <!-- <v-list shaped class="main-navigation">
        <v-tooltip right :disabled="!miniVariant">
          <template v-slot:activator="{ on }">
            <v-list-item
              v-on="on"
              @click="goToApp"
              color="primary"
              :class="miniVariant ? '' : 'hover'"
            >
              <v-list-item-action>
                <v-icon>mdi-view-dashboard</v-icon>
              </v-list-item-action>
              <v-list-item-content class="py-0">
                <v-list-item-title>Main Menu</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
          <span>Main Menu</span>
        </v-tooltip>
      </v-list>
      <v-divider></v-divider> -->
      <v-list nav dense class="main-navigation">
        <v-tooltip
          v-for="(item, i) in menuItems"
          :key="`main-nav-item-${i}`"
          right
          :disabled="!miniVariant"
        >
          <template #activator="{ on }">
            <v-list-item v-if="!item.subMenu.length" :to="item.to" router color="primary" v-on="on">
              <v-list-item-action>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title v-text="item.title" />
              </v-list-item-content>
            </v-list-item>
            <v-list-group
              v-else
            >
              <template #activator>
                <v-list-item-title v-text="item.title" />
              </template>

              <v-list-item
                v-for="(subitem, j) in item.subMenu"
                :key="j"
                link
              >
                <v-list-item-icon>
                  <v-icon v-text="subitem.icon" />
                </v-list-item-icon>
                <v-list-item-title v-text="subitem.title" />
              </v-list-item>
            </v-list-group>
          </template>
          <span>{{ item.title }}</span>
        </v-tooltip>
      </v-list>
      <v-spacer />

      <v-flex class="mini-variant-wrap" :class="!miniVariant ? 'close' : ''">
        <v-btn small icon @click.stop="miniVariant = !miniVariant">
          <v-icon>mdi-{{ `chevron-${miniVariant ? "right" : "left"}` }}</v-icon>
        </v-btn>
      </v-flex>

      <v-flex v-if="!miniVariant" class="mini-variant-wrap2">
        <v-list-item-subtitle
          class="caption grey--text text-center"
          style="font-family: 'Montserrat', sans-serif !important"
        >
          ROAD SURFER © 2021
        </v-list-item-subtitle>
      </v-flex>
    </v-navigation-drawer>
    <v-app-bar color="primary" :clipped-left="clipped" app :height="56" flat>
      <logo />
      <v-app-bar-nav-icon
        v-if="!drawer"
        color="white"
        @click="drawer = !drawer"
      />
      <v-spacer />
      <div class="body-2 mr-2 white--text font-weight-medium">
        Admin Account
      </div>

      <v-avatar :size="35" color="secondary">
        <span class="white--text font-weight-medium">A</span>
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
import Logo from '~/components/logo.vue'
export default {
  components: {
    Logo
  },
  data (vm) {
    return {
      clipped: false,
      drawer: false,
      miniVariant: false,
      menuItems: vm.$pluginsData.mainMenu,
      title: 'Hassan Mehmood',
      scrollSettings: {
        maxScrollbarLength: 160
      },
      onTop: true
    }
  },
  computed: {
    topLoader () {
      return this.$store.getters['pageHeader/getTopLoader']
    }
  },
  created () {
    // Register the events
    // window.getApp = this;
  }
}
</script>
<style lang="scss">
.mini-variant-wrap {
  position: absolute !important;
  bottom: 30px !important;
  left: 22px;

  &.close {
    left: 15px;
  }
}

.mini-variant-wrap2 {
  position: absolute !important;
  bottom: 10px !important;
  left: 22px;
}
</style>
