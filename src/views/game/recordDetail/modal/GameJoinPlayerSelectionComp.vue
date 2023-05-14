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
		<v-container>
			<v-tabs-items v-model="tab">
				<v-tab-item v-for="(title, idx) in tabTitles" :key="title">
					<TeamMemberSearchTab
						v-if="idx == 0"
						@add-game-join-player-01="addGameJoinPlayer"
						:pActivatedTabName="activatedTabName"
					/>
					<GuestMemberSearchTab
						v-if="idx == 1"
						@add-game-join-player-02="addGameJoinPlayer"
						:pActivatedTabName="activatedTabName"
					/>
					<GuestRegistrationTab
						v-if="idx == 2"
						@add-game-join-player-03="addGameJoinPlayer"
					/>
				</v-tab-item>
			</v-tabs-items>
		</v-container>
	</v-container>
</template>

<script>
	import { GameJoinPlayerSelectionEvent } from '@/views/game/recordDetail/const/EventConst.js';

	import { GameJoinPlayerManageTabs } from '@/views/game/recordDetail/const/CompConst.js';
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
				console.log(targetPlayer);
				this.$emit(
					GameJoinPlayerSelectionEvent.ADD_GAME_JOIN_PLAYER,
					targetPlayer
				);
			},
		},
	};
</script>

<style lang="scss" scoped></style>
