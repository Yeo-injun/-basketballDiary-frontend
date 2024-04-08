<template>
	<!-- <v-container> -->
		<v-btn block color="primary" @click="doAdd">{{ this.pBtnName }}</v-btn>
	<!-- </v-container> -->
</template>

<script>
	export default {
		props: {
			pBtnName: String,
		},
		data() {
			return {
				eventEmitName: 'do-add',
			};
		},
		methods: {
			doAdd() {
				this.$emit(this.eventEmitName);
			},
		},
	};
</script>

<style lang="scss" scoped></style>
