<template>
  <v-navigation-drawer app right v-model="bookingDrawer" temporary width="400">
    <v-app-bar color="primary" :height="55">
      <v-toolbar-title class="white--text"
        >{{ this.actionType }} booking for {{ this.bookingModel.customerName }}
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-tooltip left>
        <template v-slot:activator="{ on }">
          <v-btn
            v-on="on"
            color="white"
            @click="bookingDrawer = false"
            text
            icon
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </template>
        <span>Close</span>
      </v-tooltip>
    </v-app-bar>
    <v-card class="ma-3">
      <v-form ref="form">
        <v-card-text>
          <v-layout row wrap>
            <v-flex md12 lg12 xl6>
              <v-menu
                ref="menu"
                v-model="etdPicker"
                transition="scale-transition"
                offset-y
                min-width="290px"
                left
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-on="on"
                    :value="bookingModel.startDate | fullDate"
                    label="From Date"
                    readonly
                    required
                    outlined
                    :rules="[v => !!v || 'Required']"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="bookingModel.startDate"
                  no-title
                  @input="etdPicker = false"
                  color="primary"
                ></v-date-picker>
              </v-menu>
            </v-flex>

            <v-flex md12 lg12 xl6>
              <v-menu
                ref="menu"
                v-model="etaPicker"
                transition="scale-transition"
                offset-y
                min-width="290px"
                left
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-on="on"
                    :value="bookingModel.endDate | fullDate"
                    label="To Date"
                    readonly
                    outlined
                    required
                    :rules="[v => !!v || 'Required']"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="bookingModel.endDate"
                  no-title
                  @input="etaPicker = false"
                  color="primary"
                ></v-date-picker>
              </v-menu>
            </v-flex>
          </v-layout>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text color="secondary" @click="$emit('onclose')">Cancel</v-btn>
          <v-btn
            depressed
            color="primary"
            @click="saveBooking"
            :loading="loading"
            >{{ actionType == "Add" ? "Add booking" : "Update booking" }}</v-btn
          >
        </v-card-actions>
      </v-form>
    </v-card>
  </v-navigation-drawer>
</template>

<script>
export default {
  props: ["actionType", "booking", "openDrawer"],
  data: () => ({
    bookingModel: {},
    loading: false,
    bookingDrawer: false,

    etdPicker: false,
    etaPicker: false
  }),

  watch: {
    openDrawer() {
      this.bookingDrawer = this.openDrawer;
    },
    bookingDrawer() {
      if (this.bookingDrawer == false) {
        this.$emit("onclose");
      }
    },
    booking: {
      immediate: true,
      handler() {
        if (this.booking)
          this.bookingModel = {
            customerName: this.booking.customerName,
            startDate: this.booking.startDate,
            endDate: this.booking.endDate
          };
      }
    }
  },

  methods: {
    saveBooking() {
      if (this.$refs.form.validate()) {
        if (this.actionType == "Add") {
          this.addBooking();
        } else if (this.actionType == "Edit") {
          this.editBooking();
        }
      }
    },

    addBooking() {
      // code goes here for adding a booking to a store
    },

    editBooking() {
      this.loading = true;
      setTimeout(() => {
        this.$emit("bookingUpdated", this.bookingModel);
        this.$emit("onclose");
        this.bookingModel = {};
        this.$refs.form.resetValidation();
        this.loading = false;
      }, 500);
    }
  }
};
</script>
