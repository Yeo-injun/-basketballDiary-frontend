<template>
	<v-container>
		<!-- TODO data-table-row에 클릭이벤트 emit시키기 -->
		<v-data-table
			:headers="headers"
			:items="pEntry"
			item-key="quarterPlayerRecordsSeq"
			hide-default-footer
			class="elevation-1"
		>
			<!-- row별 버튼 -->
			<template v-slot:[`item.foul`]="{ item }">
				<template>
					<FoulCountComp :pFoulCnt="item.foul" />
				</template>
			</template>
		</v-data-table>
	</v-container>
</template>

<script>
	import FoulCountComp from '@/components/game/stat/FoulCountComp.vue';

	export default {
		components: {
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
					{ text: '개인파울', value: 'foul' },
				],
			};
		},
		methods: {
			// TODO data-table-click시 이벤트 emit시키기
			clickRowButton(targetPlayer) {
				this.$emit('click-player', targetPlayer);
			},
		},
	};
</script>

<style lang="scss" scoped></style>
