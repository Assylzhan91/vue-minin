<template>
  <div id="app">
		<div class="container">
			<div class="card mt-5 p-5" v-if="showBlock">
				<h1 class="h2 text-success">Data base</h1>
				<form action="" @submit.prevent="createPerson">
					<div class="form-group mb-3">
						<label for="name" class="cursor-text">Enter your name</label>
						<input class="form-control" type="text" id="name" v-model.trim="name">
					</div>
					<div class="form-group mb-3">
						<label for="age" class="cursor-text">Enter your age</label>
						<input class="form-control" type="text" id="age" v-model.trim="age">
						<h1>{{ age }}</h1>
					</div>
					<v-button
						text="Create a person"
						styleBtn="success"
						:class="getLengthName"
						:disabled="getLengthName	"
						@handler="createPerson"
					/>
				</form>
				<people-list
					:list="peopleList"
					textError="Not any person"
					@load="loadPersons"
				/>
			</div>
			<div v-if="errorBlock">
				<h1>Error</h1>
			</div>
		</div>
  </div>
</template>
<script>

import PeopleList from './views/PeopleList';
import VButton from './components/VButton';
import { users } from './assets/js/urlList';
import axios from 'axios';

export default  {
  components: {
    PeopleList,
    VButton
	},
  data () {
    return {
      name: '',
      age: '',
			peopleList: [],
			showBlock: false,
      errorBlock: false,
		}
	},
  created() {
		this.loadedPersons();
  },
  methods: {
    async createPerson (e) {
      this.showBlock = false
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: this.name,
          age: this.age,
				})
      };
      const response =  await fetch(users + '.json', requestOptions);
      const firebaseData = await response.json();
      this.peopleList.push({
				id: firebaseData.name,
				name: this.name,
				age: this.age,
			})
			this.name = ''
			this.age = ''
      this.showBlock = true;
		},
    loadPersons () {
      console.log('loadPerson');
		},
		async loadedPersons () {
      const { data } = await axios.get(users + '.json');
      this.peopleList = Object.keys(data).map(item => {
        return {
          id: item,
					...data[item]
				}
			})
			this.showBlock = true
    }
	},
	computed: {
    getLengthName() {
			return {
        'text-danger': this.name.length >= 6 && this.name.length < 10,
        'text-warning': this.name.length >= 10,
			}
		}
	}
}
</script>
