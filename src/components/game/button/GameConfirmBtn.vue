<template>
	<SaveBtn pBtnName="게임확정" @do-save="confirmGame"/>
</template>

<script>
	/** Backend API */
	import GameAPI from '@/api/GameAPI.js';
	/** Code */
	/** Utils */
	/** Components */
	import SaveBtn from '@/components/button/FrameSaveBtn.vue';
	/** Emit Event */
	
	export default {
		components:{
			SaveBtn,
		},
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
