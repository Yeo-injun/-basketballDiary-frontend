<template>
	<v-container>
		<v-btn color="primary" @click="doSave">{{ this.pBtnName }}</v-btn>
	</v-container>
</template>

<script>
	export default {
		props: {
			pBtnName: String,
		},
		data() {
			return {
				eventEmitName: 'do-save',
			};
		},
		methods: {
			doSave() {
				this.$emit(this.eventEmitName);
			},
		},
	};
</script>

<style lang="scss" scoped></style>
