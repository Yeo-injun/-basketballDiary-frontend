<template>
	<v-container>
		<v-tabs centered v-model="tab">
			<v-tab v-for="title in tabTitles" :key="title">
				{{ title }}
			</v-tab>
		</v-tabs>
		<v-tabs-items v-model="tab">
			<v-tab-item v-for="(title, idx) in tabTitles" :key="title">
				<TeamMemberSearchTab v-if="idx == 0" />
				<GuestMemberSearchTab v-if="idx == 1" />
				<GuestRegistrationTab v-if="idx == 2" />
			</v-tab-item>
		</v-tabs-items>
	</v-container>
</template>

<script>
	import TeamMemberSearchTab from '@/views/game/recordDetail/modal/tab/TeamMemberSearchTab.vue';
	import GuestMemberSearchTab from '@/views/game/recordDetail/modal/tab/GuestMemberSearchTab.vue';
	import GuestRegistrationTab from '@/views/game/recordDetail/modal/tab/GuestRegistrationTab.vue';

	export default {
		components: {
			TeamMemberSearchTab,
			GuestMemberSearchTab,
			GuestRegistrationTab,
		},
		data() {
			return {
				tab: null,
				tabTitles: ['팀원', '게스트(회원)', '게스트(비회원)'],
			};
		},
	};
</script>

<style lang="scss" scoped></style>
