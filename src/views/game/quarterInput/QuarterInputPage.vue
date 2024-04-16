<template>
	<div>
		<div v-if="this.isInitData.gameQuarterInfo">
			<GameInfo
				:pGameYmd="this.gameYmd"
				:pGameStartTime="this.gameStartTime"
				:pGameEndTime="this.gameEndTime"
			/>
			<QuarterInfo
				:pQuarterCode="this.quarterCode"
				:pQuarterCodeName="this.quarterCodeName"
				:pQuarterTime="this.quarterTime"
				:pHomeTeamRecord="this.homeTeamQuarterRecord"
				:pAwayTeamRecord="this.awayTeamQuarterRecord"
				@select-quarter-time="setQuarterTime"
			/>
			<!-- <v-container>
				<h4 v-if="$platform.isWeb">
					<div>※ PC웹브라우저인 경우 마우스 클릭으로 입력이 안될수 있습니다.</div>
					<div>F12를 눌러 개발도구창을 활성화 시킨 후 Ctrl + Shift + M을 눌러 태블릿 모드로 전환시켜 주세요.</div>
				</h4>
			</v-container> -->
		</div>

		<div v-if="this.isInitData.gameEntry">
			<TableInputBoard
				:pHomeTeamName="this.homeTeamQuarterRecord.teamName"
				:pAwayTeamName="this.awayTeamQuarterRecord.teamName"
				:pHomeTeamEntry="this.homeTeamEntry"
				:pAwayTeamEntry="this.awayTeamEntry"
				@record-team-score="updateTeamScore"
				@record-team-foul="updateTeamFoul"
				@open-entry-manage-modal="saveGameQuarter"
				@save-entry="getGameEntry"
			/>
		</div>
		<v-container>
			<v-row>
				<v-col cols="6" justify="center">
					<SaveGameQuarterBtn
						pBtnName="쿼터저장"
						@do-save="saveGameQuarterWithMessageAlert"
					/>
				</v-col>
				<v-col cols="6" justify="center">
					<DeleteGameQuarterBtn
						pBtnName="쿼터삭제"
						@do-delete="deleteGameQuarter"
					/>
				</v-col>
			</v-row>
		</v-container>
	</div>
</template>

<script>
	/** Backend API */
	/** Code */
	import { HomeAwayCode } from '@/const/code/GameCode';

	/** Utils */
	/** Components */
	/** Emit Event */
	import GameAPI from '@/api/GameAPI.js';

	import GameInfo from '@/views/game/quarterInput/components/GameInfo.vue';
	import QuarterInfo from '@/views/game/quarterInput/components/QuarterInfo.vue';

	import TableInputBoard from '@/views/game/quarterInput/components/TableInputBoard.vue';

	import SaveGameQuarterBtn from '@/components/button/FrameSaveBtn.vue';
	import DeleteGameQuarterBtn from '@/components/button/FrameDeletionBtn.vue';

	export default {
		components: {
			GameInfo,
			QuarterInfo,
			TableInputBoard,
			SaveGameQuarterBtn,
			DeleteGameQuarterBtn,
		},
		data() {
			const query = this.$route.query;
			return {
				gameSeq: query.gameSeq,
				teamSeq: query.teamSeq,
				quarterCode: query.quarterCode,
				isInitData: {
					gameQuarterInfo: false,
					gameEntry: false,
				},
				quarterCodeName	: '',
				gameYmd			: '',
				gameStartTime	: '',
				gameEndTime		: '',
				quarterTime		: '',
				homeTeamQuarterRecord: {},
				awayTeamQuarterRecord: {},

				homeTeamEntry: [],
				awayTeamEntry: [],

			};
		},
		mounted() {
			this.getGameQuarterRecords();
			this.getGameEntry();
		},
		methods: {
			async getGameQuarterRecords() {
				const params = {
					gameSeq		: this.gameSeq,
					quarterCode	: this.quarterCode,
				};

				const res = await GameAPI.getGameQuarterRecords(params);
				const quarterInfo = res.data;
				this.quarterCodeName	= quarterInfo.quarterCodeName;
				this.gameYmd			= quarterInfo.gameYmd;
				this.gameStartTime		= quarterInfo.gameStartTime;
				this.gameEndTime		= quarterInfo.gameEndTime;
				this.quarterTime		= quarterInfo.quarterTime;
				this.homeTeamQuarterRecord = quarterInfo.homeTeamRecords;	// TODO 속성명 변경 요망 homeTeamRecord로
				this.awayTeamQuarterRecord = quarterInfo.awayTeamRecords;	// TODO 속성명 변경 요망 homeTeamRecord로
				

				this.isInitData.gameQuarterInfo = true;
			},
			updateTeamScore( statInfo ) {
				switch( statInfo.homeAwayCode ) {
					case HomeAwayCode.HOME_TEAM	: 
						this.homeTeamQuarterRecord.score += statInfo.score;
						if ( 0 > this.homeTeamQuarterRecord.score ) {
							this.homeTeamQuarterRecord.score = 0;
						} 
						break;
					case HomeAwayCode.AWAY_TEAM	: 
						this.awayTeamQuarterRecord.score += statInfo.score;
						if ( 0 > this.awayTeamQuarterRecord.score ) {
							this.awayTeamQuarterRecord.score = 0;
						} 
						break;
					default : throw new Error( "홈/어웨이 코드가 정상적이지 않습니다." );
				}
			},
			updateTeamFoul( statInfo ) {
				switch( statInfo.homeAwayCode ) {
				case HomeAwayCode.HOME_TEAM	: 
					this.homeTeamQuarterRecord.foul += statInfo.foul;
					break;
				case HomeAwayCode.AWAY_TEAM	: 
					this.awayTeamQuarterRecord.foul += statInfo.foul;
					break;
				default : throw new Error( "홈/어웨이 코드가 정상적이지 않습니다." );
				}
			},
			async getGameEntry() {
				const params = {
					gameSeq: this.gameSeq,
					quarterCode: this.quarterCode,
				};

				const res = await GameAPI.getGameEntry(params);

				const homeTeamInfo = res.data.homeTeamEntry;
				this.homeTeamEntry = homeTeamInfo.entry;

				const awayTeamInfo = res.data.awayTeamEntry;
				this.awayTeamEntry = awayTeamInfo.entry;

				// 비동기 통신 완료 후 자식 컴포넌트 생성 제어
				this.isInitData.gameEntry = true;
			},
			setQuarterTime(targetVal) {
				this.quarterTime = targetVal;
			},
			// 게임쿼터 저장API 호출 후 성공여부에 따라 메세지 alert창 호출
			async saveGameQuarterWithMessageAlert() {
				const result = await this.saveGameQuarter();
				alert(result.message);
			},
			// 게임쿼터 저장API 호출 ( 선수교체전 현재 입력한 데이터를 저장하여 교체되는 선수의 기록을 유지하기 위함. )
			async saveGameQuarter() {
				try {
					await GameAPI.saveQuarterRecords(
						{
							gameSeq: this.gameSeq,
							quarterCode: this.quarterCode,
						},
						{
							quarterTime: this.quarterTime,
							homeTeamPlayerRecords: this.homeTeamEntry,
							awayTeamPlayerRecords: this.awayTeamEntry,
						}
					);
				} catch (e) {
					return {
						success: false,
						message: e.message,
					};
				}
				return {
					success: true,
					message: '저장완료되었습니다.',
				};
			},
			async deleteGameQuarter() {
				const params = {
					gameSeq: this.gameSeq,
					quarterCode: this.quarterCode,
				};

				await GameAPI.deleteGameQuarter(params);
				this.$router.push({
					name: 'GameRecordDetailPage',
					query: {
						gameSeq: this.gameSeq,
						teamSeq: this.teamSeq,
					},
				});
			},
		}
	};
</script>

<style lang="scss" scoped></style>
