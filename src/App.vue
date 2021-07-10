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
				<ul>
					<li v-for="(person, id) of persons" :key="id">
						<strong>{{ person.name }}</strong> - <b>{{ person.age }}</b>
					</li>
				</ul>
			</div>
			<div v-if="errorBlock">
				<h1>Error</h1>
			</div>
		</div>
  </div>
</template>
<script>
export default  {
  data () {
    return {
      name: '',
      age: '',
			persons: [],
			showBlock: false,
      errorBlock: false,
			urlUsers: 'https://vue-http-481d2-default-rtdb.asia-southeast1.firebasedatabase.app/user.json',
		}
	},
  created() {
		fetch('https://vue-http-481d2-default-rtdb.asia-southeast1.firebasedatabase.app/user.json')
			.then(response => response.json())
			.then(data => {
        this.persons = Object.values(data);
        this.showBlock = true
			})
			.catch(error => {
			  console.log(error)
        this.errorBlock = true
			})

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
      const response =  await fetch(this.urlUsers, requestOptions);
      await response.json();
      this.showBlock = true;
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
