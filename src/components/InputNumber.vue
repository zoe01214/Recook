<template lang='pug'>
  v-text-field(
    outlined
    append-icon='$vuetify.icons.plus'
    :label='label'
    :mask='mask'
    :outline='outline'
    prepend-inner-icon='$vuetify.icons.minus'
    :rules='rules'
    :value='value'
    dense
    solo
    flat
    color="orange"
    @click:append.stop='increase'
    @click:prepend-inner.stop='decrease'
    @change='$emit("input", $event)')
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: ''
    },
    min: {
      type: Number,
      default: 1
    },
    max: {
      type: Number,
      default: 9999
    },
    maxLength: {
      type: Number,
      default: 4
    },
    outline: {
      type: Boolean,
      default: true
    },
    rules: {
      type: Array,
      default: () => []
    },
    step: {
      type: Number,
      default: 1
    },
    height: {
      type: String
    },
    value: [String, Number]
  },
  computed: {
    mask () {
      let mask = ''
      for (let i = 0; i < this.maxLength; i++) mask = `${mask}#`
      return mask
    }
  },
  methods: {
    increase () {
      if (isNaN(parseInt(this.value))) return this.$emit('input', this.step)
      if (this.value === this.max) return
      this.$emit('input', parseInt(this.value) + this.step)
    },
    decrease () {
      if (isNaN(parseInt(this.value))) return this.$emit('input', this.min)
      if (this.value === this.min) return
      this.$emit('input', parseInt(this.value) - this.step)
    }
  }
}
</script>
