<template>
	<v-container>
		<h2>상대팀 검색</h2>
		<v-text-field label="팀명" v-model="searchCond.teamName" />
		<v-text-field label="팀장이름" v-model="searchCond.leaderName" />
		<v-btn @click="searchOpponents()">검색</v-btn>

		<v-data-table
			v-model="selected"
			:headers="headers"
			:items="opponents"
			:single-select="true"
			item-key="teamSeq"
			show-select
			class="elevation-1"
		/>
	</v-container>
</template>

<script>
	import GameAPI from '@/api/GameAPI.js';
	// import SearchBtn from '@/components/button/SearcheBtn.vue';

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
				selected: [],
			};
		},
		methods: {
			// TODO API044 농구팀 목록 조회 붙이기
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
