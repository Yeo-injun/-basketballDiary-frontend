<template>
	<div>
		<v-tabs centered v-model="tabIndex">
			<v-tab v-for="title in tabTitles" :key="title">
				{{ title }}
			</v-tab>
		</v-tabs>
		<v-tabs-items v-model="tabIndex">
			<v-tab-item v-for="(title, idx) in tabTitles" :key="title">
				<MyTeamMembersTab v-if="idx == 0" />
				<MyTeamGamesTab v-if="idx == 1" />
				<GameCreationPage v-if="idx == 2" :pTeamSeq="pTeamSeq" />
			</v-tab-item>
		</v-tabs-items>
	</div>
</template>

<script>
	import MyTeamMembersTab from '@/views/myTeam/detail/tab/MyTeamMemberTab.vue';
	import MyTeamGamesTab from '@/views/myTeam/detail/tab/MyTeamGameListTab.vue';
	import GameCreationPage from '@/views/game/creation/GameCreationPage.vue';
	import ValidationUtil from '@/common/util/ValidationUtil.js';
	import ArrayUtil from '@/common/util/ArrayUtil';

	// TODO Tabs컴포넌트 공통화하기 ( 재사용성을 위한 기본 동작 )
	const Tabs = {
		MyTeamMembersTab: { idx: 0, title: '팀원조회' },
		MyTeamGamesTab: { idx: 1, title: '팀기록 조회' },
		GameCreationPage: { idx: 2, title: '게임생성' },
	};
	export default {
		components: {
			MyTeamMembersTab,
			MyTeamGamesTab,
			GameCreationPage,
		},
		props: {
			pTabName: String,
			pTeamSeq: Number,
		},
		data() {
			return {
				tabTitles: this.getTabTitles(),
				tabIndex: this.getTabIndex(this.pTabName),
			};
		},
		methods: {
			// 탭정보에서 제목목록 가져오기
			getTabTitles() {
				const tabInfoArr = ArrayUtil.convertObjectToArray(Tabs);
				const titles = [];
				tabInfoArr.forEach(function (item) {
					titles.push(item.title);
				});
				return titles;
			},
			// 탭이름으로 Tab의 idx가져오기
			getTabIndex(tabName) {
				const tab = Tabs[tabName];
				return ValidationUtil.isNotNull(tab) ? tab.idx : 0;
			},
		},
	};
</script>

<style lang="scss" scoped></style>
