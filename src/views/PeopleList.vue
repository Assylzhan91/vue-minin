<template>
	<ul v-if="list.length && showList" >
		<li v-for="(item) of list" :key="item.id">
			<strong>{{ item.name }}</strong> - <b>{{ item.age }}</b>
			<v-button
				text="Delete"
				styleBtn="primary"
				class="ms-sm-4"
				clickHandler="delete"
				@handler="deleteElem(item.id)"
			/>
		</li>
	</ul>
	<div v-else>
		<error-component
			:text="textError"
		/>
		<button class="btn btn-info text-light"
						@click="$emit('load')"
		>
			Add person
		</button>
	</div>
</template>

<script>
import ErrorComponent from '../components/ErrorComponent';
import VButton from '../components/VButton';
import { users } from '../assets/js/urlList';

export default {
  name: "PeopleList",
	components: {
    ErrorComponent,
    VButton,
	},
	data: ()=>({
    showList: true,
	}),
	emits: ['load'],
	props: {
    list: {
      type: Array,
			default: ()=>{[]},
		},
    textError: {
      type: String,
      default: 'Error',
		}
	},
	computed: {

	},
	methods: {
		deleteElem(id) {
		  this.showList = false;
			fetch(`${users}/${id}.json`, {method: 'DELETE'})
			.then(response => {
			})
      this.list.filter(i => i.id !== id)
      this.showList = true;
    },
	},
}
</script>
