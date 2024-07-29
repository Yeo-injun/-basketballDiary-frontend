<template>
	<v-btn block color="primary" :disabled="this._disabled" @click="doAdd">{{ this.pBtnName }}</v-btn>
</template>

<script>
	export default {
		props: {
			pBtnName: {
				type	: String,
				default() {
					return "추가"
				},
			},
			_disabled: {
				type	: Boolean,
				default() {
					return false;
				},
			},
		},
		methods: {
			doAdd() {
				this.$emit( "do-add" );
			},
		},
	};
</script>

<style lang="scss" scoped></style>
