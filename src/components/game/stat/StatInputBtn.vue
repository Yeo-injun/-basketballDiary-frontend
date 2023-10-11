<template>
	<v-btn
		:class="this.btnColor"
		@touchstart="onInitTouches"
		@touchmove="onClasifyGesture"
		@touchend="onEmitStatInfoByGesture"
	>
		{{ this.pCount }}</v-btn
	>
</template>

<script>
	import {
		StatType,
		RecordMode,
	} from '@/views/game/quarterRecordInputBoard/const/QuarterRecordInputBoard.js';

	export default {
		props: {
			pType: String,
			pCount: Number,
			pActiveMode: String,
			pGameJoinPlayerSeq: Number,
		},
		data() {
			return {
				statBtnName: this.getStatBtnName(),
				touches: {
					startX: 0,
					gestureType: 'touch',
				},
			};
		},
		computed: {
			btnColor() {
				const colorDegreeForMode =
					this.pActiveMode == RecordMode.ADD ? '4' : '5';
				const statType = this.pType;
				if (this.isNegativeStat(statType)) {
					return `red lighten-${colorDegreeForMode}`;
				}
				return `blue lighten-${colorDegreeForMode}`;
			},
		},
		methods: {
			onInitTouches(e) {
				this.touches.gestureType = 'touch';
				this.touches.startX = e.touches[0].screenX;
			},
			onClasifyGesture(e) {
				const gestureDistance = 10;
				const moveDistance = this.touches.startX - e.touches[0].screenX;
				if (moveDistance + gestureDistance < 0) {
					this.touches.gestureType = 'rightSwipe';
				}
			},
			onEmitStatInfoByGesture() {
				switch (this.touches.gestureType) {
					case 'rightSwipe':
						this.$emit('cancel-stat', {
							gameJoinPlayerSeq: this.pGameJoinPlayerSeq,
							statType: this.pType,
							mode: RecordMode.CANCEL,
						});
						return;
					case 'touch':
						this.$emit('add-stat', {
							gameJoinPlayerSeq: this.pGameJoinPlayerSeq,
							statType: this.pType,
							mode: RecordMode.ADD,
						});
						return;
				}
			},
			emitAddStatInfo() {
				this.$emit('add-stat', {
					gameJoinPlayerSeq: this.pGameJoinPlayerSeq,
					statType: this.pType,
					mode: RecordMode.ADD,
				});
			},
			emitCancelStatInfo() {
				this.$emit('cancel-stat', {
					gameJoinPlayerSeq: this.pGameJoinPlayerSeq,
					statType: this.pType,
					mode: RecordMode.CANCEL,
				});
			},
			isNegativeStat(statType) {
				if (
					StatType.TRY_FREE_THROW == statType ||
					StatType.TRY_TWO_POINT == statType ||
					StatType.TRY_THREE_POINT == statType ||
					StatType.TURNOVER == statType ||
					StatType.FOUL == statType
				) {
					return true;
				}
				return false;
			},
			// 버튼 이름 가져오기
			getStatBtnName() {
				const statType = this.pType;
				switch (statType) {
					case StatType.FREE_THROW:
						return '자유투';
					case StatType.TWO_POINT:
						return '2점 성공';
					case StatType.THREE_POINT:
						return '3점 성공';
					case StatType.TRY_FREE_THROW:
						return '자유투 시도';
					case StatType.TRY_TWO_POINT:
						return '2점 시도';
					case StatType.TRY_THREE_POINT:
						return '3점 시도';
					case StatType.FOUL:
						return '파울';
					case StatType.TURNOVER:
						return '턴오버';
					case StatType.REBOUND:
						return '리바운드';
					case StatType.ASSIST:
						return '어시스트';
					case StatType.BLOCK:
						return '블락';
					case StatType.STEAL:
						return '스틸';
				}
				return '';
			},
		},
	};
</script>

<style lang="scss" scoped></style>
