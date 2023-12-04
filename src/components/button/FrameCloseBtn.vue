<template>
	<v-container>
		<v-btn block @click="doClose">{{ this.pBtnName }}</v-btn>
	</v-container>
</template>

<script>
	/**
	 * Close 버튼의 동작 정의
	 * - Modal 등의 컴포넌트가 destroy되는 동작 포함
	 */
	export default {
		props: {
			pBtnName: String,
		},
		data() {
			return {
				eventEmitName: 'do-close',
			};
		},
		methods: {
			doClose() {
				this.$emit(this.eventEmitName);
			},
		},
	};
</script>

<style lang="scss" scoped></style>
