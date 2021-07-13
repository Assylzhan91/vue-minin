<template>
	<div style="display: inline-block">
		<button
			class="btn" :class="setStyleBtn"
			@click="$emit('delete')"
		>
			{{text}}</button>
	</div>
</template>

<script>
export default {
  name: "VButton",
	emits: ['delete'],
	props: {
    text: {
      type: String,
		},
    styleBtn: {
      type: String
		}
	},
	computed: {
    setStyleBtn() {
      return `btn-${this.styleBtn}`
		}
	}
}
</script>
