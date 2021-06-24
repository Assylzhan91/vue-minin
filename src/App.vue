<template>
  <div id="app">
		<div class="container">
			<div class="card mt-5 p-5">
				<h1 class="h2 text-success">Data base</h1>
				<form action="" @submit.prevent="createPerson">
					<div class="form-group mb-3">
						<label for="name" class="cursor-text">Enter your name</label>
						<input class="form-control" type="text" id="name" v-model.trim="name">
					</div>
						<button
							type="submit"
							class="btn btn-primary"
							:class="getLengthName"
						>
							Create a person
						</button>
				</form>
			</div>
		</div>
  </div>
</template>
<script>
export default  {
  data () {
    return {
      name: '',
		}
	},
	methods: {
    createPerson () {
      console.log('createPerson');
		}
	},
	computed: {
    getLengthName() {
			return {
			  'cursor-n-a': this.name.length === 0,
        'text-danger': this.name.length >= 6 && this.name.length < 10,
        'text-warning': this.name.length >= 10,
			}
		}
	}
}
</script>
