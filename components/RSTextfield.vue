<template>
  <div class="rs-textfield">
    <v-text-field
      :outlined="outlined"
      :rounded="rounded"
      :solo="solo"
      :flat="flat"
      height="65px"
      :rules="[v => !!v || 'required']"
      label="outlined"
      clearable
    />
  </div>
</template>

<script>
export default {
  props: {
    outlined: {
      type: Boolean,
      default: true
    },
    rounded: {
      type: Boolean,
      default: false
    },
    solo: {
      type: Boolean,
      default: false
    },
    flat: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
.rs-textfield {
  ::v-deep .v-input__slot {
    border: 1px solid;
    border-radius: 12px;
    padding-top: 10px;

    .v-text-field__slot {
      margin-top:10px;

    }
  }
  ::v-deep fieldset {
    border: none;
    padding: 10px auto;
  }
  // ::v-deep .v-input__slot {
  //   input {
  //     padding: 0px;
  //   }
  // }
  // ::v-deep .v-input--is-label-active {
  //   label {
  //     top: 28px !important;
  //   }
  // }
  // .v-input--is-focused {
  //   ::v-deep .v-text-field__slot {
  //     // label {
  //     //   margin-top: 10px;
  //     // }
  //   }
  // }
  // ::v-deep .v-input--has-state {
  //   label {
  //     top: 28px !important;
  //   }
  // }
}
</style>

<!--
<style lang="scss" scoped>
.rs-textfield {
  ::v-deep .v-input__slot {
    border: 1px solid;
    padding-top: 10px;
  }
}
</style>
-->
