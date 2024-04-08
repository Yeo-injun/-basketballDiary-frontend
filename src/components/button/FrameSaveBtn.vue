<template>
	<v-btn block color="primary" @click="doSave">{{ this.pBtnName }}</v-btn>
</template>

<script>
	/**
	 * Save 버튼의 동작 정의
	 * - HTTP API를 호출을 통한 데이터 생성 로직 포함
	 *   cf. PK를 채번하지 않는 동작은 Save버튼이 아닌, Update 혹은 Add버튼 사용
	 */
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
