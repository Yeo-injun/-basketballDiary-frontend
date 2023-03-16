/** * 화면ID : G002P01 * 화면명 : 게임기록 상세조회 * 생성일시 : 2022.12.29 *
작성자 : 여인준 * 작업일지 * 2022.12.29(목) 여인준 : 최초생성 */

<template>
	<v-container>
		<GameInfoComp :pGameSeq="this.gameSeq" />
		<GameJoinTeamsInfoComp :pGameSeq="this.gameSeq" />
		<GameJoinPlayersInfoComp :pGameSeq="this.gameSeq" />
		<GameQuartersComp :pGameSeq="this.gameSeq" />
		<!-- TODO 컴포넌트의 배치를 조절하여 간격 조절하기 -->
		<v-row v-if="isShowGameManageBtn()">
			<v-col>
				<GameConfirmBtn
					:pGameSeq="this.gameSeq"
					@confirm-game="moveMyTeamPage"
				/>
			</v-col>
			<v-col>
				<GameDeletionBtn
					:pGameSeq="this.gameSeq"
					@delete-game="moveMyTeamPage"
				/>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
	import { GameRecordStateCode } from '@/const/code/GameCode.js';

	import GameInfoComp from '@/views/game/recordDetail/GameInfoComp.vue';
	import GameJoinTeamsInfoComp from '@/views/game/recordDetail/GameJoinTeamsInfoComp.vue';
	import GameJoinPlayersInfoComp from '@/views/game/recordDetail/GameJoinPlayersInfoComp.vue';
	import GameQuartersComp from '@/views/game/recordDetail/GameQuartersComp.vue';
	import GameConfirmBtn from '@/views/game/recordDetail/button/GameConfirmBtn.vue';
	import GameDeletionBtn from '@/components/game/button/GameDeletionBtn.vue';

	export default {
		components: {
			GameInfoComp,
			GameJoinTeamsInfoComp,
			GameJoinPlayersInfoComp,
			GameQuartersComp,
			GameConfirmBtn,
			GameDeletionBtn,
		},
		data() {
			return {
				gameSeq: this.$route.params.gameSeq,
			};
		},
		methods: {
			isShowGameManageBtn() {
				const isConfirmState =
					GameRecordStateCode.CONFIRMATION ==
					this.$route.params.gameRecordState;
				if (isConfirmState) {
					return false;
				}

				// TODO 게임기록권한 테이블의 데이터를 조회해서 제어하기 (어느 API에서 가져올 것인지 )
				return true;
			},
			moveMyTeamPage() {
				const routeParams = this.$route.params;
				this.$router.push({
					name: 'MyTeamPage',
					params: {
						teamSeq: routeParams.teamSeq,
						teamName: routeParams.teamName,
					},
				});
			},
		},
	};
</script>

<style lang="scss" scoped></style>
