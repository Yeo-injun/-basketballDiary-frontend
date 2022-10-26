<template>
	<v-container>
		<h2>상대팀 검색</h2>
		<v-text-field label="경기">경기일자</v-text-field>
		<v-text-field label="팀명" />
		<v-text-field label="팀장이름" />
		<SearchBtn />

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
	import SearchBtn from '@/components/button/SearcheBtn.vue';

	export default {
		components: {
			SearchBtn,
		},
		data() {
			return {
				headers: [
					{ text: '팀ID', value: 'teamSeq' },
					{ text: '팀명', value: 'teamName' },
					{ text: '팀장이름', value: 'leaderName' },
					{ text: '설립일자', value: 'foundationYmd' },
					{ text: '활동지역', value: 'hometown' },
				],
				opponents: [
					// TODO  임시데이터
					{
						teamSeq: 1,
						teamName: '바이러스',
						leaderName: '코로나',
						foundationYmd: '20221019',
						hometown: '서울특별시',
					},
					{
						teamSeq: 2,
						teamName: '바이러스',
						leaderName: '코로나',
						foundationYmd: '20221019',
						hometown: '서울특별시',
					},
				],
				selected: [],
			};
		},
		setup() {
			return {};
		},
	};
</script>

<style lang="scss" scoped></style>
