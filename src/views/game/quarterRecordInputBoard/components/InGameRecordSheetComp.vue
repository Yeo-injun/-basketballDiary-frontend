<template>
	<v-container>
		<v-data-table
			:headers="headers"
			:items="pEntry"
			@click:row="postEmitStatInfo"
			item-key="quarterPlayerRecordsSeq"
			hide-default-footer
			class="elevation-1"
		>
			<!-- TODO 스와이프 이벤트로 이전 동작이 취소되도록 구현 / http://www.mins01.com/mh/tech/read/1529  -->
			<template v-slot:[`item.freeThrow`]="{ item }">
				<FreeThrowInput
					pType="freeThrow"
					:pCount="item.freeThrow"
					pActiveMode="add"
					@get-stat-type="emitStatInfo"
				/>
				<TryFreeThrowInput
					pType="tryFreeThrow"
					:pCount="item.tryFreeThrow"
					pActiveMode="add"
					@get-stat-type="emitStatInfo"
				/>
			</template>
			<template v-slot:[`item.twoPoint`]="{ item }">
				<TwoPointInput
					pType="twoPoint"
					:pCount="item.twoPoint"
					pActiveMode="add"
					@get-stat-type="emitStatInfo"
				/>
				<TryTwoPointInput
					pType="tryTwoPoint"
					:pCount="item.tryTwoPoint"
					pActiveMode="add"
					@get-stat-type="emitStatInfo"
				/>
			</template>
			<template v-slot:[`item.threePoint`]="{ item }">
				<ThreePointInputBtn
					pType="threePoint"
					pActiveMode="add"
					:pCount="item.threePoint"
					@get-stat-type="emitStatInfo"
				/>
				<TryThreePointInputBtn
					pType="tryThreePoint"
					pActiveMode="add"
					:pCount="item.tryThreePoint"
					@get-stat-type="emitStatInfo"
				/>
			</template>
			<template v-slot:[`item.turnover`]="{ item }">
				<TurnoverInputBtn
					pType="turnover"
					pActiveMode="add"
					:pCount="item.turnover"
					@get-stat-type="emitStatInfo"
				/>
			</template>
			<template v-slot:[`item.assist`]="{ item }">
				<AssistInputBtn
					pType="assist"
					pActiveMode="add"
					:pCount="item.assist"
					@get-stat-type="emitStatInfo"
				/>
			</template>
			<template v-slot:[`item.rebound`]="{ item }">
				<ReboundInputBtn
					pType="rebound"
					pActiveMode="add"
					:pCount="item.rebound"
					@get-stat-type="emitStatInfo"
				/>
			</template>
			<template v-slot:[`item.block`]="{ item }">
				<BlockInputBtn
					pType="block"
					pActiveMode="add"
					:pCount="item.block"
					@get-stat-type="emitStatInfo"
				/>
			</template>
			<template v-slot:[`item.steal`]="{ item }">
				<StealInputBtn
					pType="steal"
					pActiveMode="add"
					:pCount="item.steal"
					@get-stat-type="emitStatInfo"
				/>
			</template>
			<template v-slot:[`item.foul`]="{ item }">
				<FoulInputBtn
					pType="foul"
					pActiveMode="add"
					:pCount="item.foul"
					@get-stat-type="emitStatInfo"
				/>
				<FoulCountComp :pFoulCnt="item.foul" />
			</template>
		</v-data-table>
	</v-container>
</template>

<script>
	import {
		StatType,
		RecordMode,
	} from '@/views/game/quarterRecordInputBoard/const/QuarterRecordInputBoard.js';

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
			postEmitStatInfo(targetPlayer) {
				this.$emit('post-emit-stat-info', targetPlayer);
			},
			emitStatInfo(statType) {
				const inputInfo = {
					statType: statType,
					mode: RecordMode.ADD,
				};
				this.$emit('emit-stat-info', inputInfo);
			},
		},
	};
</script>

<style lang="scss" scoped></style>
