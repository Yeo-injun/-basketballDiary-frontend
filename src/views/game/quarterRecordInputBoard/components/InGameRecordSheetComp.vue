<template>
	<v-container>
		<v-data-table
			:headers="headers"
			:items="pEntry"
			item-key="quarterPlayerRecordsSeq"
			hide-default-footer
			class="elevation-1"
		>
			<!-- TODO 스와이프 이벤트로 이전 동작이 취소되도록 구현 / http://www.mins01.com/mh/tech/read/1529  -->
			<template v-slot:[`item.freeThrow`]="{ item }">
				<FreeThrowInput
					:pGameJoinPlayerSeq="item.gameJoinPlayerSeq"
					pType="freeThrow"
					:pCount="item.freeThrow"
					pActiveMode="add"
					@add-stat="emitStatInfo"
					@cancel-stat="emitStatInfo"
				/>
				<TryFreeThrowInput
					:pGameJoinPlayerSeq="item.gameJoinPlayerSeq"
					pType="tryFreeThrow"
					:pCount="item.tryFreeThrow"
					pActiveMode="add"
					@add-stat="emitStatInfo"
					@cancel-stat="emitStatInfo"
				/>
			</template>
			<template v-slot:[`item.twoPoint`]="{ item }">
				<TwoPointInput
					:pGameJoinPlayerSeq="item.gameJoinPlayerSeq"
					pType="twoPoint"
					:pCount="item.twoPoint"
					pActiveMode="add"
					@add-stat="emitStatInfo"
					@cancel-stat="emitStatInfo"
				/>
				<TryTwoPointInput
					:pGameJoinPlayerSeq="item.gameJoinPlayerSeq"
					pType="tryTwoPoint"
					:pCount="item.tryTwoPoint"
					pActiveMode="add"
					@add-stat="emitStatInfo"
					@cancel-stat="emitStatInfo"
				/>
			</template>
			<template v-slot:[`item.threePoint`]="{ item }">
				<ThreePointInputBtn
					:pGameJoinPlayerSeq="item.gameJoinPlayerSeq"
					pType="threePoint"
					pActiveMode="add"
					:pCount="item.threePoint"
					@add-stat="emitStatInfo"
					@cancel-stat="emitStatInfo"
				/>
				<TryThreePointInputBtn
					:pGameJoinPlayerSeq="item.gameJoinPlayerSeq"
					pType="tryThreePoint"
					pActiveMode="add"
					:pCount="item.tryThreePoint"
					@add-stat="emitStatInfo"
					@cancel-stat="emitStatInfo"
				/>
			</template>
			<template v-slot:[`item.turnover`]="{ item }">
				<TurnoverInputBtn
					:pGameJoinPlayerSeq="item.gameJoinPlayerSeq"
					pType="turnover"
					pActiveMode="add"
					:pCount="item.turnover"
					@add-stat="emitStatInfo"
					@cancel-stat="emitStatInfo"
				/>
			</template>
			<template v-slot:[`item.assist`]="{ item }">
				<AssistInputBtn
					:pGameJoinPlayerSeq="item.gameJoinPlayerSeq"
					pType="assist"
					pActiveMode="add"
					:pCount="item.assist"
					@add-stat="emitStatInfo"
					@cancel-stat="emitStatInfo"
				/>
			</template>
			<template v-slot:[`item.rebound`]="{ item }">
				<ReboundInputBtn
					:pGameJoinPlayerSeq="item.gameJoinPlayerSeq"
					pType="rebound"
					pActiveMode="add"
					:pCount="item.rebound"
					@add-stat="emitStatInfo"
					@cancel-stat="emitStatInfo"
				/>
			</template>
			<template v-slot:[`item.block`]="{ item }">
				<BlockInputBtn
					:pGameJoinPlayerSeq="item.gameJoinPlayerSeq"
					pType="block"
					pActiveMode="add"
					:pCount="item.block"
					@add-stat="emitStatInfo"
					@cancel-stat="emitStatInfo"
				/>
			</template>
			<template v-slot:[`item.steal`]="{ item }">
				<StealInputBtn
					:pGameJoinPlayerSeq="item.gameJoinPlayerSeq"
					pType="steal"
					pActiveMode="add"
					:pCount="item.steal"
					@add-stat="emitStatInfo"
					@cancel-stat="emitStatInfo"
				/>
			</template>
			<template v-slot:[`item.foul`]="{ item }">
				<FoulInputBtn
					:pGameJoinPlayerSeq="item.gameJoinPlayerSeq"
					pType="foul"
					pActiveMode="add"
					:pCount="item.foul"
					@add-stat="emitStatInfo"
					@cancel-stat="emitStatInfo"
				/>
				<FoulCountComp :pFoulCnt="item.foul" />
			</template>
		</v-data-table>
	</v-container>
</template>

<script>
	import { StatType } from '@/views/game/quarterRecordInputBoard/const/QuarterRecordInputBoard.js';

	import FreeThrowInput from '@/components/game/stat/StatInputBtn.vue';
	import TryFreeThrowInput from '@/components/game/stat/StatInputBtn.vue';

	import TwoPointInput from '@/components/game/stat/StatInputBtn.vue';
	import TryTwoPointInput from '@/components/game/stat/StatInputBtn.vue';

	import ThreePointInputBtn from '@/components/game/stat/StatInputBtn.vue';
	import TryThreePointInputBtn from '@/components/game/stat/StatInputBtn.vue';

	import AssistInputBtn from '@/components/game/stat/StatInputBtn.vue';
	import ReboundInputBtn from '@/components/game/stat/StatInputBtn.vue';
	import TurnoverInputBtn from '@/components/game/stat/StatInputBtn.vue';
	import BlockInputBtn from '@/components/game/stat/StatInputBtn.vue';
	import StealInputBtn from '@/components/game/stat/StatInputBtn.vue';
	import FoulInputBtn from '@/components/game/stat/StatInputBtn.vue';

	import FoulCountComp from '@/components/game/stat/FoulCountComp.vue';

	export default {
		components: {
			FreeThrowInput,
			TryFreeThrowInput,
			TwoPointInput,
			TryTwoPointInput,
			ThreePointInputBtn,
			TryThreePointInputBtn,

			AssistInputBtn,
			ReboundInputBtn,
			TurnoverInputBtn,
			BlockInputBtn,
			StealInputBtn,
			FoulInputBtn,

			FoulCountComp,
		},
		props: {
			pEntry: Array,
		},
		data() {
			return {
				headers: [
					{ text: '등번호', value: 'backNumber' },
					{ text: '선수이름', value: 'name' },
					{ text: '자유투', value: 'freeThrow' },
					{ text: '2점', value: 'twoPoint' },
					{ text: '3점', value: 'threePoint' },
					{ text: '턴오버', value: 'turnover' },
					{ text: '어시스트', value: 'assist' },
					{ text: '리바운드', value: 'rebound' },
					{ text: '블락', value: 'block' },
					{ text: '스틸', value: 'steal' },
					{ text: '파울', value: 'foul' },
				],
				type: {
					freeThrow: StatType.FREE_THROW,
					twoPoint: StatType.TWO_POINT,
					threePoint: StatType.THREE_POINT,
					tryFreeThrow: StatType.TRY_FREE_THROW,
					tryTwoPoint: StatType.TRY_TWO_POINT,
					tryThreePoint: StatType.TRY_THREE_POINT,
					assist: StatType.ASSIST,
					rebound: StatType.REBOUND,
					turnover: StatType.TURNOVER,
					block: StatType.BLOCK,
					steal: StatType.STEAL,
					foul: StatType.FOUL,
				},
			};
		},
		methods: {
			emitStatInfo(statInfo) {
				this.$emit('emit-stat-info', statInfo);
			},
		},
	};
</script>

<style lang="scss" scoped></style>
