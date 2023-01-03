<template>
	<v-container>
		<v-row justify="center">
			<v-col cols="1">
				<v-btn color="error" @click="deleteGame">{{ btnName }}</v-btn>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
	export default {
		props: {
			pBtnName: String,
		},
		data() {
			return {
				btnName: this.getBtnName(),
			};
		},
		methods: {
			getBtnName() {
				if (
					this.pBtnName == null ||
					this.pBtnName == undefined ||
					this.pBtnName == ''
				) {
					return '삭제';
				}
				return this.pBtnName;
			},
			async deleteGame() {
				alert('게임생성취소 구현중');
				this.$emit('delete-event-emit');
			},
		},
	};
</script>

<style lang="scss" scoped></style>
