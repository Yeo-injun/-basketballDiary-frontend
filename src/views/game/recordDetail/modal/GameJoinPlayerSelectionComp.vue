<template>
	<v-container>
		<v-tabs centered v-model="tab">
			<v-tab
				v-for="title in tabTitles"
				:key="title"
				@click="changeActivatedTabName(title)"
			>
				{{ title }}
			</v-tab>
		</v-tabs>
		<v-tabs-items v-model="tab">
			<v-tab-item v-for="(title, idx) in tabTitles" :key="title">
				<TeamMemberSearchTab
					v-if="idx == 0"
					@add-game-join-player="addGameJoinPlayer"
					:pActivatedTabName="activatedTabName"
				/>
				<GuestMemberSearchTab v-if="idx == 1" />
				<GuestRegistrationTab
					v-if="idx == 2"
					@regist-guest-not-member="addGameJoinPlayer"
				/>
			</v-tab-item>
		</v-tabs-items>
	</v-container>
</template>

<script>
	import { GameJoinPlayerManageTabs } from '@/views/game/recordDetail/const/CompNameConst.js';
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
				tabTitles: [
					GameJoinPlayerManageTabs.TEAM_MEMBER,
					GameJoinPlayerManageTabs.GUEST_MEMBER,
					GameJoinPlayerManageTabs.GUEST_NON_MEMBER,
				],
				activatedTabName: GameJoinPlayerManageTabs.TEAM_MEMBER,
			};
		},
		methods: {
			changeActivatedTabName(title) {
				this.activatedTabName = title;
			},
			addGameJoinPlayer(targetPlayer) {
				this.$emit('add-game-join-player', targetPlayer);
			},
		},
	};
</script>

<style lang="scss" scoped></style>
