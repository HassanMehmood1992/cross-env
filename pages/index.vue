<template>
  <v-container fluid class="ma-0 pa-0">
    <v-layout class="mt-4 mb-8">
      <welcome />
    </v-layout>

    <v-layout row align-center justify-center class="my-3">
      <v-flex md4 class="white--text title primary pa-4 text-center">
        Select your station for bookings!
      </v-flex>
    </v-layout>
    <v-layout row class="mx-2">
      <v-flex sm6 md4 class="pa-2">
        <station-search
          label="Station"
          dense
          outlined
          return-object
          v-model="station"
          clearable
          :loading="loading"
          @onSelect="station = $event"
          @onClear="station = null"
          placeholder="Search by name"
        >
        </station-search>
      </v-flex>
    </v-layout>
    <v-card>
      <v-card-text class="py-0">
        <v-layout row class="align-center py-2">
          <v-flex md5>
            <div
              :style="
                toggleView == 'today'
                  ? 'visibility:hidden;'
                  : 'visibility:visible;'
              "
            >
              <v-btn icon class="ma-2" @click="$refs.calendar.prev()">
                <v-icon>mdi-chevron-left</v-icon>
              </v-btn>
              <span class="secondary--text body-1">{{ calendarLabel }}</span>
              <v-btn icon class="ma-2" @click="$refs.calendar.next()">
                <v-icon>mdi-chevron-right</v-icon>
              </v-btn>
            </div>
          </v-flex>
          <v-spacer></v-spacer>
          <v-flex shrink class="py-2">
            <v-btn-toggle v-model="toggleView" @change="setTypeView">
              <v-btn outlined small color="primary" value="today">Today</v-btn>
              <v-btn outlined small color="primary" value="week">Week</v-btn>
              <v-btn outlined small color="primary" value="day">Day</v-btn>
            </v-btn-toggle>
          </v-flex>
        </v-layout>
      </v-card-text>

      <div>
        <v-calendar
          ref="calendar"
          class="custom--calender"
          v-model="start"
          :event-color="event => event.color"
          color="primary"
          :events="bookings"
          :type="type"
          @change="calendarUpdate"
        >
          <template v-slot:event="{ event }">
            <v-menu offset-y tile max-width="300px" nudge-left="3px">
              <template v-slot:activator="{ on }">
                <div class="ml-1" v-on="on" @click="fetchBookingInfo(event)">
                  <span>{{ event.customerName }}</span>
                </div>
              </template>
              <v-card
                max-height="200px"
                height="200px"
                width="300px"
                :color="event.color"
                tile
                elevation="0"
              >
                <v-card-text v-if="loadingBookingCard">
                  <v-progress-circular indeterminate color="white" :width="3" />
                </v-card-text>
                <v-card-text v-else-if="bookingCard">
                  <v-icon
                    small
                    color="white"
                    @click="editSchedule(event)"
                    class="booking-edit"
                    >mdi-pencil</v-icon
                  >
                  <v-layout class="white--text mx-2 py-4">
                    <v-flex>
                      <div class="font-weight-medium body-2">Customer</div>
                      <div class="font-weight-bold body-1">
                        {{
                          bookingCard.customerName
                            ? bookingCard.customerName
                            : ""
                        }}
                      </div>
                    </v-flex>
                  </v-layout>
                  <v-layout row wrap class="white--text mx-2 mt-2">
                    <v-flex md12>
                      <div>
                        <div class="font-weight-medium caption">
                          Booking Dates
                        </div>
                        <div class="caption">
                          <v-icon small color="white" class="pr-2"
                            >mdi-calendar-blank</v-icon
                          >{{
                            bookingCard.startDate
                              | dateRange(bookingCard.endDate)
                          }}
                        </div>
                      </div>
                    </v-flex>
                  </v-layout>
                </v-card-text>
              </v-card>
            </v-menu>
          </template>
        </v-calendar>
      </div>
    </v-card>

    <edit-booking
      :actionType="actionType"
      :openDrawer="addEditDrawer"
      :booking="bookingCard"
      @bookingUpdated="onBookingUpdated()"
      @onclose="
        addEditDrawer = false;
        bookingCard = null;
      "
    >
    </edit-booking>
  </v-container>
</template>

<script>
import editBooking from "@/components/editBooking";
import welcome from "@/components/welcome";
export default {
  components: {
    editBooking,
    welcome
  },
  data: () => ({
    loading: false,
    station: null,
    addEditDrawer: false,
    actionType: "Edit",
    start: new Date().toISOString().substr(0, 10),
    type: "week",
    loadingBookingCard: false,
    bookingCard: {},
    toggleView: "week",
    calendarLabel: "",
    bookings: [],
    selectedBooking: null,
    colors: ["purple", "green", "primary", "secondary", "red"]
  }),

  watch: {
    station: {
      immediate: true,
      handler() {
        if (this.station) {
          this.fetchStations();
        }
      }
    }
  },
  methods: {
    fetchStations() {
      this.loading = true;
      this.axios
        .get(`stations?name=` + this.station.name)
        .then(response => {
          if (response.data.length > 0) {
            this.setBookings([response.data[0]]);
          }
        })
        .finally(() => {
          this.loading = false;
        });
    },

    fetchBookingInfo(event) {
      this.bookingCard = {};
      this.loadingBookingCard = true;
      this.axios
        .get(`stations/${event.stationId}/bookings/${event.bookingId}`)
        .then(response => {
          if (response.data) {
            this.bookingCard = response.data;
          }
        })
        .finally(() => {
          this.loadingBookingCard = false;
        });
    },
    getRandomColor() {
      const randomInt = Math.floor(Math.random() * this.colors.length);
      return this.colors[randomInt];
    },

    calendarUpdate(event) {
      if (this.type == "week") {
        this.calendarLabel = `${this.$options.filters.dateRange(
          event.start.date,
          event.end.date
        )}`;
      } else if (this.type == "day") {
        this.calendarLabel = this.$options.filters.fullDate(event.start.date);
      }
    },

    setTypeView(event) {
      if (event) {
        if (event == "today") {
          this.start = new Date().toISOString().substr(0, 10);
          this.type = "day";
        } else {
          this.type = event;
        }
      } else {
        this.type = "week";
        this.toggleView = "week";
      }
    },
    editSchedule() {
      this.actionType = "Edit";
      this.addEditDrawer = true;
    },
    onBookingUpdated() {
      alert("Update schedule and perform post update operations here");
    },
    setBookings(stations) {
      let schedules = [];
      stations.forEach(station => {
        for (let j = 0; j < station.bookings.length; j++) {
          let booking = station.bookings[j];
          schedules.push({
            bookingId: booking.id,
            customerName: booking.customerName || "",
            stationId: station.id,
            stationName: station.name,
            start: new Date(booking.startDate),
            end: booking.endDate ? new Date(booking.endDate) : null,
            color: this.getRandomColor()
          });
        }
      });
      this.bookings = schedules;
    }
  }
};
</script>

<style lang="scss" scoped>
.booking-edit {
  position: absolute;
  right: 20px;
  top: 20px;
  cursor: pointer;
}
</style>
