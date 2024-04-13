<template>
	<v-container>
		<h3>선수기록지</h3>
		<HomeAwayTeamToggle
			pHomeTeamName="해당 토글 구현하기/홈팀"
			pAwayTeamName="해당 토글 구현하기/어웨이팀"
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
			pHomeTeamEntry: Array,
			pAwayTeamEntry: Array,
		},
		data() {
			return {
				latestAddStat: {},
				inputTargetHomeAwayCode: HomeAwayCode.HOME_TEAM,	// 기본값 - 홈팀
				homeTeamRecords : [],	// 팀경기기록 관리용 ( 현재 사용하는 곳 없음 )
				awayTeamRecords : [],	// 팀경기기록 관리용 ( 현재 사용하는 곳 없음 )
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
				const stat = {
					gameJoinPlayerSeq	: statInput.gameJoinPlayerSeq,
					statType			: statInput.statType,
					mode				: statInput.mode,
					homeAwayCode		: this.inputTargetHomeAwayCode,
					timeStamp			: new Date(),
				};
				const homeAwayCode 		= stat.homeAwayCode;
				const targetPlayer 		= this.getTargetPlayer( stat );
				const isSuccessInput 	= this.updateRecoredWithStat( stat, targetPlayer );
				if (!isSuccessInput) {
					return;
				}
				if (HomeAwayCode.HOME_TEAM == homeAwayCode) {
					this.homeTeamRecords.push( stat );
				} else {
					this.awayTeamRecords.push( stat );
				}
				// TODO 입력한 경기스탯 emit하여 상위 컴포넌트에서 팀기록 입력하기
			},
			getTargetPlayer( statInfo ) {
				const isHomeTeamRecords = HomeAwayCode.HOME_TEAM == statInfo.homeAwayCode;
				if (isHomeTeamRecords) {
					return ArrayUtil.findItemById( this.pHomeTeamEntry, statInfo,'gameJoinPlayerSeq');
				}
				return ArrayUtil.findItemById( this.pAwayTeamEntry, statInfo,'gameJoinPlayerSeq');
			},
			updateRecoredWithStat( statInput, targetPlayer ) {
				const statType = statInput.statType;
				switch( statInput.mode ) {
					case RecordMode.ADD 	: DefaultRecordOperator.addPlayer( statType, targetPlayer ); break;
					case RecordMode.CANCEL 	: DefaultRecordOperator.cancelPlayer( statType, targetPlayer ); break;
					default : throw new Error( "기록 입력 모두가 유효한 값이 아닙니다." );
				}
			},
		}
	};

	const DefaultRecordOperator = {
		addPlayer( statType, record ) {
			record[ statType ]++;
			const addOperation = StatOperationPolicy[ statType ];
			if ( !addOperation ) {
				return;
			}
			if ( typeof addOperation.addPlayer === "function" ) {
				addOperation.addPlayer( record );
			}
		},
		cancelPlayer( statType, record ) {
			const currentStatCnt = record[ statType ];
			if ( currentStatCnt < 1 ) {
				return false;
			}

			const enableCancelOperation = StatOperationPolicy[ statType ].enableCancel;
			if ( typeof enableCancelOperation === "function" && !enableCancelOperation( record ) ) {
				return false;
			}

			record[ statType ]--;
			const cancelOperation = StatOperationPolicy[ statType ];
			if ( !cancelOperation ) {
				return;
			}
			if ( typeof cancelOperation.cancelPlayer === "function" ) {
				cancelOperation.cancelPlayer( record );
			}
		},
		// TODO 팀기록 동작 처리
		addTeam( record ) {
			record.freeThrow++;
		},
		cancelTeam( record ) {
			record.freeThrow--;
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
	}
</script>

<style lang="scss" scoped></style>
