<template>
  <div id="app">
		<div class="container">
			<v-alert
				:alert="alert"
				@close="alert = null"
			/>
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
					@remove="remove"
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
import VAlert from './components/VAlert';
import { users } from './assets/js/urlList';
import axios from 'axios';

export default  {
  components: {
    PeopleList,
    VButton,
    VAlert
	},
  data () {
    return {
      name: '',
      age: '',
			peopleList: [],
			showBlock: false,
      errorBlock: false,
      alert: null,
		}
	},
  created() {
		this.loadedPersons();
  },
  methods: {
 		async remove(id){
 		  this.showBlock = false
	 		try {
	 		  let foundPerson = this.peopleList.find( item => item.id === id).name;
				await axios.delete(`${users}/${id}.json`)
			 	this.peopleList = this.peopleList.filter(item=> item.id !== id)
        this.alert = {
          type: 'primary',
          title: "This person os removed",
          text: foundPerson,
        }
				if(!this.peopleList.length){
				  throw new Error('All persons are removed, please add some persons')
				}
       }catch (error) {
         this.alert = {
           type: 'danger',
           title: "Title Alert Error",
           text: error.message,
				 }
		 	}
      this.showBlock = true
		},
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
			this.alert = null;
      this.showBlock = true;
		},
    loadPersons () {
      this.loadedPersons();
		},
		async loadedPersons () {
     	try {
        const { data } = await axios.get(users + '.json');
        if(!data){
          throw new Error('Person list is empty');
        }
        this.peopleList = Object.keys(data).map(item => {
          return {
            id: item,
            ...data[item]
          }
        })

      }catch (error) {
        this.alert = {
          type: 'danger',
          title: "Title Alert Error",
          text: error.message,
				}
			}
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
