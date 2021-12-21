<template>
  <div>
    test : {{ testValue }}
    <pre>
        {{ JSON.stringify(testValue2) }}
    </pre>
    <v-btn @click="onCickButton()">
      Test
    </v-btn>
    <template v-for="item in items">
      <div :key="item">
        {{ item }}
      </div>
    </template>
  </div>
</template>

<script>
export default {
  layout: 'default',
  components: {

  },
  mixins: [],
  props: {

  },
  asyncData ({ isDev, route, store, env, params, query, req, res, redirect, error }) {

  },
  provide: {

  },
  inject: {

  },
  data: () => ({
    testValue: 'Example code',
    testValue2: { name: 'Hassan', age: 29 },
    items: [
      'item 1',
      'item 2',
      'item 3',
      'item 4'
    ]
  }),
  computed: {},
  watch: {
    testValue: {
      immediate: true,
      handler (newValue, oldValue) {

      }
    }
  },
  created () {

  },
  mounted () {

  },
  destroyed () {},
  methods: {
    onCickButton () {
      alert('test')
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
