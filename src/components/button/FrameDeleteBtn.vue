<template>
	<v-btn block color="error" @click="doDelete">{{ this.pBtnName }}</v-btn>
</template>

<script>
	export default {
		props: {
			pBtnName: String,
		},
		data() {
			return {
				eventEmitName: 'do-delete',
			};
		},
		methods: {
			doDelete() {
				this.$emit(this.eventEmitName);
			},
		},
	};
</script>

<style lang="scss" scoped></style>
