<template>
	<v-container>
		<v-row justify="center">
			<v-col cols="1">
				<v-btn color="primary" @click="confirmGame">게임확정</v-btn>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
	import GameAPI from '@/api/GameAPI.js';

	export default {
		props: {
			pGameSeq: Number,
		},
		data() {
			return {
				eventEmitName: 'confirm-game',
			};
		},
		methods: {
			async confirmGame() {
				const message = '게임을 확정하시겠습니까? 게임확정후에는 게임기록을 수정할 수 없습니다.';
				if ( !confirm( message ) ) {
					return;
				}
				await GameAPI.confirmGame({
					gameSeq: this.pGameSeq,
				});
				this.$emit(this.eventEmitName);
			},
		},
	};
</script>

<style lang="scss" scoped></style>
