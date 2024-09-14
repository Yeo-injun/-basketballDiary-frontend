<template>
	<v-container>
		<v-card>
			<v-card-title>
				<v-row>
					<v-col> 초대한 선수 목록 </v-col>
					<v-col>
						<PlayerInviteModal
							@close="searchInvitedPlayer"
							:pTeamSeq="pTeamSeq"
						/>
					</v-col>
				</v-row>
			</v-card-title>

			<v-card-subtitle>
				<v-select
					v-model="filterCond"
					:items="filterConds"
					item-text="text"
					item-value="value"
					@change="searchInvitedPlayer"
					label="초대상태"
				></v-select>
			</v-card-subtitle>
			<v-card-text>
				<v-data-table :headers="invitedPlayerHeaders" :items="invitedPlayers" />
			</v-card-text>
		</v-card>
	</v-container>
</template>

<script>
	import MyTeamAPI from '@/api/MyTeamAPI.js';
	import PlayerInviteModal from '@/views/myTeam/memberManage/tab/modal/PlayerInviteModal.vue';

	export default {
		components: {
			PlayerInviteModal,
		},
		props: {
			pTeamSeq: Number,
		},
		data() {
			return {
				filterCond: '',
				filterConds: [
					{ text: '전체', value: '' },
					{ text: '대기중', value: '01' },
					{ text: '거절', value: '03' },
				],
				invitedPlayerHeaders: [
					{ text: '초대일시', value: 'requestDate', sortable: false },
					{ text: '이름', value: 'name', sortable: false },
					{ text: '이메일', value: 'email', sortable: false },
					{ text: '포지션', value: 'positionCodeName', sortable: false },
					{ text: '키', value: 'height', sortable: false },
					{ text: '몸무게', value: 'weight', sortable: false },
					{
						text: '초대상태',
						value: 'joinRequestStateCodeName',
						sortable: false,
					},
				],
				invitedPlayers: [],
			};
		},
		methods: {
			async searchInvitedPlayer() {
				const { data } = await MyTeamAPI.getInvitations(
					this.pTeamSeq,
					this.filterCond
				);
				this.invitedPlayers = data.invitations;
			},
		},
		beforeMount() {
			this.searchInvitedPlayer();
		},
	};
</script>

<style lang="scss" scoped></style>
