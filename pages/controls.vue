<template>
  <v-container>
    <v-card class="pa-3">
      <v-card-title class="px-0">
        Text Fields
      </v-card-title>
      <v-card-text>
        <v-layout row wrap>
          <v-flex md6 class="px-3">
            <div class="py-2">
              Simple outlined
            </div>
            <v-text-field outlined label="outlined" />
          </v-flex>
          <v-flex md6 class="px-3">
            <div class="py-2">
              Disabled
            </div>
            <v-text-field outlined label="outlined" disabled />
          </v-flex>
        </v-layout>
      </v-card-text>
    </v-card>

    <v-card class="pa-3 my-2">
      <v-card-title class="px-0">
        Customized Text Fields
      </v-card-title>
      <v-card-text>
        <v-layout row wrap>
          <v-flex md6 class="px-3">
            <div class="py-2">
              Customized Textfield
            </div>
            <rs-textfield />
          </v-flex>
        </v-layout>
      </v-card-text>
    </v-card>

    <v-card class="pa-3 my-2">
      <v-card-title class="px-0">
        Dialog and Menus
      </v-card-title>
      <v-card-text>
        <v-layout row wrap class="my-2">
          <v-flex md2 class="px-3">
            <div class="py-2">
              Open Dialog
            </div>
            <v-btn color="primary" @click="dialog = true">
              <v-icon>
                mdi-information
              </v-icon>
            </v-btn>
          </v-flex>

          <v-flex md2 class="px-3">
            <div class="py-2">
              Open Menu
            </div>
            <v-menu offset-y>
              <template #activator="{ on, attrs }">
                <v-btn color="primary" v-bind="attrs" v-on="on">
                  <v-icon>
                    mdi-dots-vertical
                  </v-icon>
                </v-btn>
              </template>
              <v-card
                class="mx-auto"
                max-width="400"
                tile
              >
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>Single-line item</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>

                <v-list-item two-line>
                  <v-list-item-content>
                    <v-list-item-title>Two-line item</v-list-item-title>
                    <v-list-item-subtitle>Secondary text</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>

                <v-list-item three-line>
                  <v-list-item-content>
                    <v-list-item-title>Three-line item</v-list-item-title>
                    <v-list-item-subtitle>
                      Secondary line text Lorem ipsum dolor sit amet,
                    </v-list-item-subtitle>
                    <v-list-item-subtitle>
                      consectetur adipiscing elit.
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-card>
            </v-menu>
          </v-flex>
        </v-layout>
      </v-card-text>
    </v-card>

    <v-card class="pa-3 my-2">
      <v-card-title class="px-0">
        Buttons
      </v-card-title>
      <v-card-text>
        <v-layout row wrap class="py-3">
          <v-flex md2 class="px-3 align-center">
            <div class="py-2">
              Primary Button
            </div>
            <v-btn color="primary">
              <v-icon class="pr-2">
                mdi-home
              </v-icon> Home
            </v-btn>
          </v-flex>

          <v-flex md2 class="px-3 align-center">
            <div class="py-2">
              Secondary Button
            </div>
            <v-btn color="secondary">
              <v-icon class="pr-2">
                mdi-pencil
              </v-icon> Edit
            </v-btn>
          </v-flex>

          <v-flex md2 class="px-3">
            <div class="py-2">
              Fab Button
            </div>
            <v-btn fab small color="primary">
              <v-icon>
                mdi-plus
              </v-icon>
            </v-btn>
          </v-flex>

          <v-flex md2 class="px-3">
            <div class="py-2">
              Button Group
            </div>
            <v-btn small color="primary">
              <v-icon>
                mdi-minus
              </v-icon>
            </v-btn>
            <v-btn small color="primary">
              <v-icon>
                mdi-plus
              </v-icon>
            </v-btn>
            <v-btn small color="primary">
              <v-icon>
                mdi-close
              </v-icon>
            </v-btn>
          </v-flex>

          <v-flex md2 class="align-center">
            <div class="py-2">
              Toogle Group
            </div>
            <v-btn-toggle>
              <v-btn small color="primary">
                <v-icon color="white">
                  mdi-format-align-left
                </v-icon>
              </v-btn>

              <v-btn small color="primary">
                <v-icon color="white">
                  mdi-format-align-center
                </v-icon>
              </v-btn>

              <v-btn small color="primary">
                <v-icon color="white">
                  mdi-format-align-right
                </v-icon>
              </v-btn>

              <v-btn small color="primary">
                <v-icon color="white">
                  mdi-format-align-justify
                </v-icon>
              </v-btn>
            </v-btn-toggle>
          </v-flex>
        </v-layout>
      </v-card-text>
    </v-card>

    <v-card class="pa-3 my-2">
      <v-card-title class="px-0">
        Auto complete and selects
      </v-card-title>
      <v-card-text>
        <v-layout row wrap class="py-3">
          <v-flex md4 class="px-3 align-center">
            <div class="py-2">
              Auto complete search
            </div>
            <v-autocomplete
              :items="items"
              item-text="name"
              clearable
              item-value="value"
              label="Search by name"
              outlined
              class="px-0"
            />
          </v-flex>

          <v-flex md4 class="px-3 align-center">
            <div class="py-2">
              Select
            </div>
            <v-select
              :items="items"
              item-text="name"
              clearable
              item-value="value"
              label="Search by name"
              outlined
              class="px-0"
            />
          </v-flex>

          <v-flex md4 class="px-3 align-center">
            <div class="py-2">
              Select Multiple
            </div>
            <v-select
              :items="items"
              item-text="name"
              clearable
              small-chips
              multiple
              item-value="value"
              label="Search by name"
              outlined
              class="px-0"
            />
          </v-flex>
        </v-layout>
      </v-card-text>
    </v-card>

    <v-dialog v-model="dialog" max-width="500px" :fullscreen="$vuetify.breakpoint.xs">
      <v-card max-width="500px">
        <v-card-title>
          Confirmation
        </v-card-title>
        <v-card-text>
          <v-layout row class="text-center">
            <v-flex md12>
              <v-icon x-large color="primary">
                mdi-information
              </v-icon>
            </v-flex>
          </v-layout>
          <v-layout row class="text-center py-2">
            <v-flex md12>
              Are you sure you want to proceed
            </v-flex>
          </v-layout>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn outlined color="primary" @click="dialog=false">
            <v-icon>
              mdi-close
            </v-icon> Close
          </v-btn>
          <v-btn color="primary">
            <v-icon>
              mdi-check
            </v-icon> Confirm
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import RsTextfield from '@/components/RSTextfield'
export default {
  components: {
    RsTextfield
  },
  data: () => ({
    dialog: false,
    items: [{ id: 1, name: 'John', value: '1' }, { id: 2, name: 'Eddy', value: '2' }, { id: 3, name: 'Bosh', value: '3' }]
  })
}
</script>

<style lang="scss" scoped>

</style>
