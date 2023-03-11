<template>
	<div>
		<v-container class="px-15">
			<div class="d-flex">
				<v-btn
					color="black white--text"
					small
					@click.stop="isActivatedMyTeamProfileModal = true"
				>
					프로필 수정
				</v-btn>
				<MyTeamProfileUpdateModal
					:pTeamSeq="teamSeq"
					:value="isActivatedMyTeamProfileModal"
					@input="isActivatedMyTeamProfileModal = $event"
				/>

				<v-btn
					v-if="this.isManager()"
					color="black white--text"
					small
					@click.stop="dialog = true"
				>
					팀정보 수정
				</v-btn>
				<MyTeamInfoUpdateModal
					v-model="dialog"
					@input="dialog = $event"
					:pTeamSeq="teamSeq"
				/>
			</div>

			<v-subheader>개인프로필</v-subheader>
			<MyTeamProfileComp :pMyProfile="profile" />

			<v-subheader>운영진</v-subheader>
			<div v-for="(manager, index) in managerList" v-bind:key="index">
				<MyTeamManagerComp :pTeamManager="manager" :pTeamSeq="teamSeq" />
			</div>

			<v-btn
				v-if="this.isManager()"
				class="ml-auto"
				small
				color="black white--text"
				@click="clickAddTeamMember"
			>
				팀원 추가
			</v-btn>

			<v-subheader>팀원 목록</v-subheader>
			<div v-for="(member, index) in teamMembers" v-bind:key="'A' + index">
				<MyTeamMemberComp :pTeamMember="member" :pTeamSeq="teamSeq" />
			</div>

			<!-- TODO 페이지네이션 공통 컴포넌트로 관리하기 -->
			<div class="text-center">
				<v-pagination
					v-model="pager.pageNo"
					:length="pager.totalPageCount"
					@input="handlePage"
				/>
			</div>
		</v-container>
	</div>
</template>

<script>
	import myTeamApi from '@/api/MyTeamAPI';

	import MyTeamProfileComp from '@/components/myTeam/MyTeamProfileComp.vue';
	import MyTeamManagerComp from '@/components/myTeam/MyTeamManagerComp.vue';
	import MyTeamMemberComp from '@/components/myTeam/MyTeamMemberComp.vue';

	import MyTeamInfoUpdateModal from '@/components/myTeam/modal/MyTeamInfoUpdateModal.vue';
	import MyTeamProfileUpdateModal from '@/components/myTeam/modal/MyTeamProfileUpdateModal.vue';

	import authUtil from '@/common/AuthUtil.js';

	export default {
		//data: {} // Component끼리 data를 공유하면 안되므로 다음과 같이 사용하면 안됨.
		data() {
			return {
				teamSeq: this.$route.query.teamSeq,
				profile: {},
				managerList: [],
				teamMembers: [],
				teamInfo: {},
				dialog: false,
				isActivatedMyTeamProfileModal: false,
				// TODO 페이지네이션 공통 처리 적용
				pager: {
					pageNo: 1,
					totalCount: 0,
					totalPageCount: 1,
				},
			};
		},
		components: {
			MyTeamProfileComp,
			MyTeamManagerComp,
			MyTeamMemberComp,
			// eslint-disable-next-line
			MyTeamInfoUpdateModal,
			MyTeamProfileUpdateModal,
		},
		methods: {
			async onLoad() {
				// TODO 새로고침시 props값이 날라가는 것을 제어해야함...(제어할 수 있는지 검토 필요)
				await this.getProflie();
				await this.getListManager();
				await this.getListMember();
			},
			async getProflie() {
				var response = await myTeamApi.findMyTeamsProfile(this.teamSeq);
				const { data } = response;
				this.profile = data;
			},
			async getListManager() {
				var response = await myTeamApi.searchManagers(this.teamSeq);
				const { data } = response;
				this.managerList = data;
			},
			async getListMember() {
				const response = await myTeamApi.searchMembers(
					this.teamSeq,
					this.pager.pageNo - 1
				);
				const { data } = response;
				this.teamMembers = data.teamMembers;
				this.pager = data.pager;
			},
			clickAddTeamMember() {
				const teamSeq = this.teamSeq;
				this.$router.push({
					name: 'MyTeamMemberManagePage',
					// TODO 걷어내기
					params: { pTeamSeq: teamSeq },
					// TODO 적용하기
					query: { teamSeq: teamSeq },
				});
			},
			handlePage() {
				this.getListMember();
			},
			isManager() {
				return authUtil.isManager(this.teamSeq);
			},
			isLeader() {
				return authUtil.isLeader(this.teamSeq);
			},
		},
		mounted() {
			this.onLoad();
		},
	};
</script>

<style lang="scss" scoped></style>
