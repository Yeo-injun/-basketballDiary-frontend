/** * 화면ID : G002P01 * 화면명 : 게임기록 상세조회 * 생성일시 : 2022.12.29 *
작성자 : 여인준 * 작업일지 * 2022.12.29(목) 여인준 : 최초생성 */

<template>
	<v-container>
		<GameInfoComp :pGameSeq="this.qGameSeq" />
		<GameJoinTeamsInfoComp :pGameSeq="this.qGameSeq" />
		<GameJoinPlayersInfoComp :pGameSeq="this.qGameSeq" />
		<GameQuartersComp :pGameSeq="this.qGameSeq" :pTeamSeq="this.qTeamSeq" />
		<!-- TODO 컴포넌트의 배치를 조절하여 간격 조절하기 -->
		<v-row v-if="enableGameRecord()">
			<v-col>
				<GameConfirmBtn
					:pGameSeq="this.qGameSeq"
					@confirm-game="moveMyTeamPage"
				/>
			</v-col>
			<v-col>
				<GameDeleteBtn
					:pGameSeq="this.qGameSeq"
					@delete-game="moveMyTeamPage"
				/>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
	import { GameRecordStateCode } from '@/const/code/GameCode.js';

	import GameInfoComp from '@/views/game/recordDetail/components/GameInfoComp.vue';
	import GameJoinTeamsInfoComp from '@/views/game/recordDetail/components/GameJoinTeamsInfoComp.vue';
	import GameJoinPlayersInfoComp from '@/views/game/recordDetail/components/GameJoinPlayersInfoComp.vue';
	import GameQuartersComp from '@/views/game/recordDetail/components/GameQuartersComp.vue';

	import GameConfirmBtn from '@/components/game/button/GameConfirmBtn.vue';
	import GameDeleteBtn from '@/components/game/button/GameDeleteBtn.vue';

	const GAME_CONFIRMATION_CODE = GameRecordStateCode.GAME_CONFIRMATION.code;
	export default {
		components: {
			GameInfoComp,
			GameJoinTeamsInfoComp,
			GameJoinPlayersInfoComp,
			GameQuartersComp,
			GameConfirmBtn,
			GameDeleteBtn,
		},
		data() {
			const query = this.$route.query;

			return {
				qGameSeq: String( query.gameSeq ),
				qTeamSeq: String( query.teamSeq ),
				teamName: query.teamName,
				gameRecordState: query.gameRecordState,
			};
		},
		methods: {
			enableGameRecord() {
				const isGameConfirmed = this.gameRecordState == GAME_CONFIRMATION_CODE;
				if (isGameConfirmed) {
					return false;
				}

				// TODO 게임기록권한 테이블의 데이터를 조회해서 제어하기 (어느 API에서 가져올 것인지 )
				return true;
			},
			moveMyTeamPage() {
				this.$router.push({
					name: 'MyTeamDetailPage',
					query: {
						teamSeq	: this.qTeamSeq,
						teamName: this.teamName,
						tabName	: 'MyTeamGamesTab',
					},
				});
			},
		},
	};
</script>

<style lang="scss" scoped></style>
