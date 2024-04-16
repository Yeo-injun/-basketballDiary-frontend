<template>
	<v-container>
		<h3>선수기록지</h3>
		<HomeAwayTeamToggle
			:pHomeTeamName="this.pHomeTeamName"
			:pAwayTeamName="this.pAwayTeamName"
			@select-home-away-team="changeInputTeam"
		/>
		<v-container>
			<EntryManageModal
				:pHomeAwayCode="this.inputTargetHomeAwayCode"
				@post-open-handle="emitOpenEntryManageModal"
				@save-entry="emitSaveEntryEvent"
			/>
		</v-container>
		<HomeTeamInGamePlayerSheet 
			v-if="this.inputTargetHomeAwayCode == '01'"
			:pEntry="pHomeTeamEntry" 
			@emit-stat-info="this.inputStat" 
		/>
		<AwayTeamInGamePlayerSheet 
			v-else-if="this.inputTargetHomeAwayCode == '02'"
			:pEntry="pAwayTeamEntry" 
			@emit-stat-info="this.inputStat" 
		/>
	</v-container>
</template>

<script>
	/** Backend API */
	/** Code */
	import { HomeAwayCode } from '@/const/code/GameCode';
	import {
		RecordMode,
		StatType,
	} from '@/components/game/stat/const/Stat.js';
	/** Utils */
	import ArrayUtil from '@/common/util/ArrayUtil.js';

	/** Components */
	import HomeAwayTeamToggle from '@/components/game/toggle/HomeAwayTeamToggle.vue';
	import EntryManageModal from '@/views/game/quarterInput/components/modal/EntryManageModal.vue';
	import HomeTeamInGamePlayerSheet from '@/views/game/quarterInput/components/inputBoard/tableType/InGamePlayerSheet.vue';
	import AwayTeamInGamePlayerSheet from '@/views/game/quarterInput/components/inputBoard/tableType/InGamePlayerSheet.vue';

	/** Emit Event */

	export default {
		components: {
			HomeAwayTeamToggle,
			EntryManageModal,
			HomeTeamInGamePlayerSheet,
			AwayTeamInGamePlayerSheet,
		},
		props: {
			pHomeTeamName:String,
			pAwayTeamName:String,
			pHomeTeamEntry: Array,
			pAwayTeamEntry: Array,
		},
		data() {
			return {
				// latestAddStat: {},
				inputTargetHomeAwayCode: HomeAwayCode.HOME_TEAM,	// 기본값 - 홈팀
			};
		},
		methods: {
			emitOpenEntryManageModal() {
				this.$emit('open-entry-manage-modal');
			},
			emitSaveEntryEvent() {
				this.$emit('save-entry');
			},
			changeInputTeam( params ) {
				this.inputTargetHomeAwayCode = params.homeAwayCode; 
			},
			// 선수기록 입력 제어 메소드
			inputStat( statInput ) {
				const statType = statInput.statType;
				const stat = {
					gameJoinPlayerSeq	: statInput.gameJoinPlayerSeq,
					statType			: statType,
					mode				: statInput.mode,
					homeAwayCode		: this.inputTargetHomeAwayCode,
					timeStamp			: new Date(),
				};
				const targetPlayer 		= this.getTargetPlayer( stat );
				// 팀원 기록이 정상 update돼야지만 팀기록 update하기
				if ( this.updatePlayerRecoredWithStat( stat, targetPlayer ) ) {
					this.emitTeamRecord( stat );
				}
			},
			getTargetPlayer( statInfo ) {
				switch( statInfo.homeAwayCode ) {
					case HomeAwayCode.HOME_TEAM	: 
						return ArrayUtil.findItemById( this.pHomeTeamEntry, statInfo,'gameJoinPlayerSeq');
					case HomeAwayCode.AWAY_TEAM	: 
						return ArrayUtil.findItemById( this.pAwayTeamEntry, statInfo,'gameJoinPlayerSeq');
					default : throw new Error( "홈/어웨이 코드가 정상적이지 않습니다." );
				}
			},
			updatePlayerRecoredWithStat( statInput, targetPlayer ) {
				const statType = statInput.statType;
				switch( statInput.mode ) {
					case RecordMode.ADD 	: 
						return PlayerRecordOperator.add( statType, targetPlayer );
					case RecordMode.CANCEL 	: 
						return PlayerRecordOperator.cancel( statType, targetPlayer );
					default : throw new Error( "기록 입력 모두가 유효한 값이 아닙니다." );
				}
			},
			emitTeamRecord( statInput ) {
				const homeAwayCode		= statInput.homeAwayCode;
				const statModeOperator 	= RecordMode.CANCEL === statInput.mode ? -1 : 1;
				switch( statInput.statType ) {
					case StatType.FREE_THROW 		: 
						this.$emit( 'record-team-score', {
							homeAwayCode	: homeAwayCode,
							score 			: statModeOperator * 1 
						});
						break;
					case StatType.TWO_POINT			:
						this.$emit( 'record-team-score', {
							homeAwayCode	: homeAwayCode,
							score 			: statModeOperator * 2
						});						break;
					case StatType.THREE_POINT		:
						this.$emit( 'record-team-score', {
							homeAwayCode	: homeAwayCode,
							score 			: statModeOperator * 3
						});
						break;
					case StatType.FOUL :
						this.$emit( 'record-team-foul', {
							homeAwayCode	: homeAwayCode,
							foul 			: statModeOperator * 1
						});
						break;
					default :
						console.log( '팀기록 미입력 : 향후 다른 기록도 팀기록 반영시 EMIT추가' );
				}
			},
		}
	};

	const PlayerRecordOperator = {
		add( statType, record ) {
			record[ statType ]++; // 기본스탯 횟수는 기본적으로 반영 ( 그외 반영정책이 있는 경우 별도 처리 )
			const addOperation = StatOperationPolicy[ statType ];
			if ( !addOperation ) {
				// 스탯더하는 동작은 항상 true 리턴.
				return true;
			}
			if ( typeof addOperation.addPlayer === "function" ) {
				addOperation.addPlayer( record );
			}
			return true;
		},
		cancel( statType, record ) {
			const currentStatCnt = record[ statType ];
			if ( currentStatCnt < 1 ) {
				return false;
			}

			const statPolicy = StatOperationPolicy[ statType ];
			if ( !statPolicy ) {
				return false;
			}

			if ( typeof statPolicy.enableCancel === "function" 
				 && !statPolicy.enableCancel( record ) 
			) {
				return false;
			}

			record[ statType ]--;
			if ( typeof statPolicy.cancelPlayer === "function" ) {
				statPolicy.cancelPlayer( record );
			}
			return true;
		},
	}

	const StatOperationPolicy = {
		freeThrow : {
			addPlayer( record ) {
				record.tryFreeThrow++;
				record.totalScore++;
			},
			cancelPlayer( record ) {
				record.tryFreeThrow--
				record.totalScore--;
			},
		},
		twoPoint : {
			addPlayer( record ) {
				record.tryTwoPoint++;
				record.totalScore += 2;
			},
			cancelPlayer( record ) {
				record.tryTwoPoint--;
				record.totalScore -= 2;
			},
		},
		threePoint : {
			addPlayer( record ) {
				record.tryThreePoint++;
				record.totalScore += 3;
			},
			cancelPlayer( record ) {
				record.tryThreePoint--;
				record.totalScore -= 3;	
			},
		},
		tryFreeThrow : {
			enableCancel( record ) {
				return record.freeThrow < record.tryFreeThrow;
			}
		},
		tryTwoPoint : {
			enableCancel( record ) {
				return record.twoPoint < record.tryTwoPoint;
			}
		},
		tryThreePoint : {
			enableCancel( record ) {
				return record.threePoint < record.tryThreePoint;
			}
		},
		// 스탯 입력정보 추가제어시 아래와 같이 속성 추가하여 관리
		turnover : {

		},
		assist : {

		},
		rebound : {

		},
		block : {

		},
		steal : {

		},
		foul : {

		},
}
</script>

<style lang="scss" scoped></style>
