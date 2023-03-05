<template>
	<v-container>
		<!-- TODO 파울갯수가 실시간 재렌더링이 안되면 컴포넌트를 바꿔서 구현 검토  -->
		<v-data-table
			:headers="headers"
			:items="pEntry"
			@click:row="clickRowButton"
			item-key="quarterPlayerRecordsSeq"
			hide-default-footer
			class="elevation-1"
		>
			<!-- row별 버튼 TODO 파울 입력시 자동으로 재렌더링이 안됨... 버그해야함!! -->
			<template v-slot:[`item.foul`]="{ item }">
				<template>
					<FoulCountComp :pFoulCnt="item.foul" />
				</template>
			</template>
		</v-data-table>
		<FoulCountComp :pFoulCnt="this.pEntry[0].foul" />
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
			// TODO 클릭한 선수 row 표시하기 구현
			clickRowButton(targetPlayer) {
				this.$emit('select-player', targetPlayer);
				console.log(targetPlayer);
			},
		},
	};
</script>

<style lang="scss" scoped></style>
