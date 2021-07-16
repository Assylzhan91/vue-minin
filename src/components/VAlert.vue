<template>
	<div class="alert" v-if="alert" :class="getAlertClass">
		<h3>{{ alert.title }}</h3>
		<p>{{ alert.text }}</p>
		<v-button
			text="Close"
			@handler="$emit('close')"
			styleBtn="success"
		/>
	</div>
</template>

<script>
import VButton from '../components/VButton';

export default {
  name: "VAlert",
	emits: ['close'],
	mounted() {

  },
  props: {
    alert: {
      type: Object,
			default: {},
		}
	},
	components: {
    VButton
	},
	computed: {
    getAlertClass(){
      return `alert-${this.alert.type}`;
		}
	}
}
</script>
