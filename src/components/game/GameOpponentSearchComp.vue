<template>
	<v-container>
		<h2>상대팀 검색</h2>
		<v-text-field label="팀명" v-model="searchCond.teamName" />
		<v-text-field label="팀장이름" v-model="searchCond.leaderName" />
		<v-btn @click="searchOpponents()">검색</v-btn>

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
	import GameAPI from '@/api/GameAPI.js';
	// import SearchBtn from '@/components/button/SearcheBtn.vue';
	import ValidationUtil from '@/common/util/ValidationUtil.js';

	export default {
		components: {
			// SearchBtn,
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
			async searchOpponents() {
				const queryStrings = this.searchCond;
				const res = await GameAPI.searchOpponents(queryStrings);
				const opponents = res.data.opponents;
				this.opponents = opponents;
			},
		},
		mounted() {
			this.searchOpponents();
		},
	};
</script>

<style lang="scss" scoped></style>
