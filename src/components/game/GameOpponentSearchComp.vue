<template>
	<v-container>
		<PageSubTitle pTitleName="상대팀 검색" />
		<v-text-field label="팀명" v-model="searchCond.teamName" />
		<v-text-field label="팀장이름" v-model="searchCond.leaderName" />
		<SearchBtn @do-search="searchOpponents()" />

		<!-- Page처리 필요 -->
		<v-data-table
			:single-select="true"
			:headers="headers"
			:items="opponents"
			v-model="selectedOpponentInfo"
			item-key="teamSeq"
			show-select
			class="elevation-1"
		/>
	</v-container>
</template>

<script>
	/** Backend API */
	import GameAPI from '@/api/GameAPI.js';

	/** Code */
	/** Utils */
	import ValidationUtil from '@/common/util/ValidationUtil.js';

	/** Components */
	import PageSubTitle from '@/components/title/FramePageSubTitle.vue';
	import SearchBtn from '@/components/button/FrameSearchBtn.vue';

	/** Emit Event */

	export default {
		components: {
			PageSubTitle,
			SearchBtn,
		},
		data() {
			return {
				searchCond: {
					teamName: '',
					leaderName: '',
				},
				headers: [
					{ text: '팀ID', value: 'teamSeq' },
					{ text: '팀명', value: 'teamName' },
					{ text: '팀장이름', value: 'leaderName' },
					{ text: '설립일자', value: 'foundationYmd' },
					{ text: '활동지역', value: 'hometown' },
				],
				opponents: [],
				selectedOpponentInfo: [],
			};
		},
		// data의 상태를 감지하여 emit함
		watch: {
			selectedOpponentInfo(selected) {
				if (ValidationUtil.isNotNull(selected)) {
					const teamSeq = selected[0].teamSeq;
					this.$emit('select-opponent', teamSeq);
					return;
				}
			},
		},
		methods: {
			/** API044 농구팀 목록 조회 */
			// TODO 페이징 처리 추가 요망
			async searchOpponents() {
				const queryStrings = this.searchCond;
				const { data } = await GameAPI.searchOpponents(queryStrings);
				this.opponents = data.opponents;
			},
		},
		mounted() {
			this.searchOpponents();
		},
	};
</script>

<style lang="scss" scoped></style>
