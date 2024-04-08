<template>
	<v-btn block color="secondary" @click="doOpen">{{ this.pBtnName }}</v-btn>
</template>

<script>
	export default {
		props: {
			pBtnName: String,
		},
		data() {
			return {
				eventEmitName: 'do-open',
			};
		},
		methods: {
			doOpen() {
				this.$emit(this.eventEmitName);
			},
		},
	};
</script>

<style lang="scss" scoped></style>
