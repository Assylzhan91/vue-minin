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
						<button
							type="submit"
							class="btn btn-primary"
							:class="getLengthName"
							:disabled="name.length < 4 || age.length <= 1"
						>
							Create a person
						</button>
				</form>
				<people-list
					:list="peopleList"
					textError="Not any person"
					@load="loadPersons"
				/>
			</div>
			{{ persons }}
			<div v-if="errorBlock">
				<h1>Error</h1>
			</div>
		</div>
  </div>
</template>
<script>

import PeopleList from './views/PeopleList';
import { users } from './assets/js/urlList';

export default  {
  components: {
    PeopleList
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
      await response.json();
      this.loadedPersons();
      this.showBlock = true;
		},
    loadPersons () {
      console.log('loadPerson');
		},
		loadedPersons () {
      fetch(users + '.json')
        .then(response => response.json())
        .then(data => {
          Object.entries(data).forEach((item, idx)=>{
            this.peopleList[idx] = {}
            this.peopleList[idx].id = item[0]
            this.peopleList[idx].person = item[1]
          })
          this.showBlock = true
        })
        .catch(error => {
          console.log(error)
          this.showBlock = true
        })

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
