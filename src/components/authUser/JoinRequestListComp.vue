<template>
	<v-card>
		<v-card-title>팀 가입요청 목록</v-card-title>
		<v-card-text>
			<v-data-table :headers="joinRequestTeamListHeader" :items="joinRequests">
				<!-- row별 승인 버튼 -->
				<template v-slot:[`item.cancel`]="{ item }">
					<template v-if="isShowButton(item.joinRequestStateCode)">
						<v-btn class="mr-2" small @click="cancelRequest(item)">
							요청 취소
						</v-btn>
					</template>
				</template>
			</v-data-table>
		</v-card-text>
	</v-card>
	<!--// 팀 가입요청 목록 -->
</template>

<script>
	import authUserAPI from '@/api/AuthUserAPI.js';

	export default {
		data() {
			return {
				joinRequestTeamListHeader: [
					{ text: '초대일시', value: 'requestDate', sortable: false },
					{ text: '팀명', value: 'teamName', sortable: false },
					{ text: '팀장이름', value: 'leaderName', sortable: false },
					{ text: '연고지', value: 'hometown', sortable: false },
					{ text: '창단일', value: 'foundationYmd', sortable: false },
					{ text: '상태', value: 'joinRequestStateCodeName', sortable: false },
					{ text: '취소', value: 'cancel', sortable: false },
				],
				joinRequests: [],
			};
		},
		methods: {
			async getInvitations() {
				const res = await authUserAPI.getJoinRequestsTo();
				this.joinRequests = res.data;
			},
			async initLoad() {
				await this.getInvitations();
			},
			async cancelRequest(item) {
				if (!confirm('가입요청을 취소하시겠습니까?')) {
					return;
				}
				const params = {
					teamJoinRequestSeq: item.teamJoinRequestSeq,
				};

				await authUserAPI.cancelJoinReqeust(params);
				const res = await authUserAPI.getJoinRequestsTo();
				this.joinRequests = res.data;
			},
			isShowButton(joinRequestStateCode) {
				const WAITING = '01';
				return joinRequestStateCode == WAITING;
			},
		},
		mounted() {
			this.initLoad();
		},
	};
</script>

<style lang="scss" scoped></style>
