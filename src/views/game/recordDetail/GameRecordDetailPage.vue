/** * 화면ID : G002P01 * 화면명 : 게임기록 상세조회 * 생성일시 : 2022.12.29 *
작성자 : 여인준 * 작업일지 * 2022.12.29(목) 여인준 : 최초생성 */

<template>
	<v-container>
		<GameInfoTitle pTitleName="경기정보" />
		<v-container class="cont-container">
			<GameInfoComp :pGameSeq="this.qGameSeq"/>
		</v-container>

		<GameJoinTeamsInfoTitle pTitleName="팀 정보" />
		<v-container class="cont-container">
			<GameJoinTeamsInfoComp :pGameSeq="this.qGameSeq" />
		</v-container>
		
		<GameJoinPlayersInfoTitle pTitleName="경기참가선수" />
		<v-container class="cont-container">
			<GameJoinPlayersInfoComp 
				:pGameSeq="this.qGameSeq"
				:pEditable="this.editableGameRecord()"
			/>
		</v-container>
		
		<GameQuartersTitle pTitleName="경기기록" />
		<v-container class="cont-container">
			<GameQuartersComp 
				:pGameSeq="this.qGameSeq" 
				:pTeamSeq="this.qTeamSeq" 
				:pEditable="this.editableGameRecord()"
			/>
		</v-container>
		<v-container v-if="editableGameRecord()">
			<v-row >
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
	</v-container>
</template>

<script>
	/** Backend API */
	/** Code */
	/** Utils */
	import AuthManager from '@/common/auth/AuthManager';

	/** Components */
	import GameInfoTitle from '@/components/title/FramePageSubTitle.vue';
	import GameInfoComp from '@/views/game/recordDetail/components/GameInfoComp.vue';

	import GameJoinTeamsInfoTitle from '@/components/title/FramePageSubTitle.vue';
	import GameJoinTeamsInfoComp from '@/views/game/recordDetail/components/GameJoinTeamsInfoComp.vue';

	import GameJoinPlayersInfoTitle from '@/components/title/FramePageSubTitle.vue';
	import GameJoinPlayersInfoComp from '@/views/game/recordDetail/components/GameJoinPlayersInfoComp.vue';

	import GameQuartersTitle from '@/components/title/FramePageSubTitle.vue';
	import GameQuartersComp from '@/views/game/recordDetail/components/GameQuartersComp.vue';

	import GameConfirmBtn from '@/components/game/button/GameConfirmBtn.vue';
	import GameDeleteBtn from '@/components/game/button/GameDeleteBtn.vue';

	/** Emit Event */
	import { GameRecordStateCode } from '@/const/code/GameCode.js';


	const GAME_CONFIRMATION_CODE = GameRecordStateCode.GAME_CONFIRMATION.code;
	export default {
		components: {
			GameInfoTitle,
			GameInfoComp,
			GameJoinTeamsInfoTitle,
			GameJoinTeamsInfoComp,
			GameJoinPlayersInfoTitle,
			GameJoinPlayersInfoComp,
			GameQuartersTitle,
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
			editableGameRecord() {
				const isGameConfirmed = this.gameRecordState == GAME_CONFIRMATION_CODE;
				if ( isGameConfirmed ) {
					return false;
				}
				return AuthManager.enableGameRecord( this.qGameSeq );
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

<style lang="scss" scoped>
	.cont-container {
		padding-top: 0px;
	}
</style>
