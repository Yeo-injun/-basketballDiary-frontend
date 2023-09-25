<template>
	<div>
		<v-card>
			<v-card-title>가입요청을 보낸 선수 목록</v-card-title>
			<v-card-subtitle>
				<v-select
					v-model="filterCond"
					:items="filterConds"
					item-text="text"
					item-value="value"
					@change="searchJoinRequestPlayer"
					label="초대상태"
				></v-select>
			</v-card-subtitle>
			<!-- 가입요청한 선수목록 -->
			<!-- data-table안에 컴포넌트 넣기 : https://vuetifyjs.com/en/components/data-tables/#external-sorting -->
			<v-card-text>
				<v-data-table
					:headers="joinRequestPlayerHeader"
					:items="joinRequestPlayers"
				>
					<!-- TODO 오류 원인 파악하기 - https://stackoverflow.com/questions/61344980/v-slot-directive-doesnt-support-any-modifier-->

					<template v-slot:[`item.approval`]="{ item }">
						<template v-if="isShowButton(item.joinRequestStateCode)">
							<v-btn class="mr-2" small @click="clickApproval(item)">
								승인
							</v-btn>
						</template>
					</template>
					<template v-slot:[`item.rejection`]="{ item }">
						<template v-if="isShowButton(item.joinRequestStateCode)">
							<v-btn class="mr-2" small @click="clickRejection(item)">
								거절
							</v-btn>
						</template>
					</template>
				</v-data-table>
			</v-card-text>
		</v-card>
		<!--// 가입요청한 선수목록 -->
	</div>
</template>

<script>
	import MyTeamAPI from '@/api/MyTeamAPI.js';

	export default {
		props: {
			pTeamSeq: Number,
		},
		data() {
			return {
				filterCond: [],
				filterConds: [
					{ text: '전체', value: '' },
					{ text: '대기중', value: '01' },
					{ text: '거절', value: '03' },
				],
				joinRequestPlayerHeader: [
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
					{ text: '승인', value: 'approval' },
					{ text: '거절', value: 'rejection' },
				],
				joinRequestPlayers: [],
			};
		},
		methods: {
			async initLoad() {
				await this.searchJoinRequestPlayer();
			},
			async searchJoinRequestPlayer() {
				// this를 어디서 호출하느냐에 따라서 지칭하는 대상이 달라짐.
				const filterCond = this.filterCond;

				const params = {
					teamSeq: this.getPropTeamSeq(), // TODO 테스트용 화면에서 데이터 받아오기
					state: filterCond,
				};
				try {
					const res = await MyTeamAPI.searchJoinRequestPlayer(params);
					this.joinRequestPlayers = res.data;
				} catch (e) {
					console.log(e);
				}
			},
			async clickApproval(item) {
				if (!confirm('가입요청을 승낙하시겠습니까?')) {
					return;
				}

				const params = this.createParamsForProcessingJoinRequest(item);
				try {
					const res = await MyTeamAPI.approveJoinRequest(params);
					console.log(res);
					alert('팀원으로 추가되었습니다.');
				} catch (e) {
					console.log(e.response);
					alert(e.response.message);
				}
			},
			async clickRejection(item) {
				if (!confirm('가입요청을 거절하시겠습니까?')) {
					return;
				}

				const params = this.createParamsForProcessingJoinRequest(item);
				try {
					const res = await MyTeamAPI.rejectJoinRequest(params);
					console.log(res);
					alert('가입요청이 거절되었습니다.');
				} catch (e) {
					console.log(e.response);
					alert(e.response.message);
				}
			},
			getPropTeamSeq() {
				return this.pTeamSeq;
			},
			createParamsForProcessingJoinRequest(item) {
				const teamSeq = this.getPropTeamSeq();
				const teamJoinRequestSeq = item.teamJoinRequestSeq;
				return {
					teamSeq: teamSeq,
					teamJoinRequestSeq: teamJoinRequestSeq,
				};
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
