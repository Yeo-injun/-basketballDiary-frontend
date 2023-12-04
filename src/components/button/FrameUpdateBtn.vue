<template>
	<v-container>
		<v-btn block color="primary" @click="doUpdate">{{ this.pBtnName }}</v-btn>
	</v-container>
</template>

<script>
	/**
	 * Update 버튼의 동작 정의
	 * - HTTP API 호출을 통한 데이터 수정 로직 포함
	 *   cf. PK를 채번하지 않음. 기존 PK로 데이터를 수정하는 동작
	 */

	export default {
		props: {
			pBtnName: String,
		},
		data() {
			return {
				eventEmitName: 'do-update',
			};
		},
		methods: {
			doUpdate() {
				this.$emit(this.eventEmitName);
			},
		},
	};
</script>

<style lang="scss" scoped></style>
