<template>
	<div v-if="this.isAsyncComplete">
		<v-container class="px-15">
			<div class="d-flex">
				<ProfileUpdateBtn
					@do-open="openProfileUpdateModal()"
					pBtnName="프로필 수정"
				/>
				<MyTeamProfileUpdateModal
					:pTeamSeq="teamSeq"
					:pIsActivated="isActivatedProfileModal"
					:pBackNumber="this.profile.backNumber"
					:pImageUrl="profile.imageUrl"
					@modal-close="closeProfileUpdateModal()"
				/>

				<TeamInfoUpdateBtn
					v-if="this.isManager()"
					@do-open="isActivatedTeamInfoModal = true"
					pBtnName="팀정보 수정"
				/>
				<MyTeamInfoUpdateModal
					v-model="isActivatedTeamInfoModal"
					@input="isActivatedTeamInfoModal = $event"
					:pTeamSeq="teamSeq"
				/>
			</div>

			<v-subheader>개인프로필</v-subheader>
			<MyTeamProfileComp :pMyProfile="profile" />

			<v-subheader>운영진</v-subheader>
			<div v-for="(manager, index) in managers" v-bind:key="index">
				<MyTeamManagerComp :pTeamManager="manager" :pTeamSeq="teamSeq" />
			</div>

			<TeamMemberAddBtn
				v-if="this.isManager()"
				@do-add="clickAddTeamMember"
				pBtnName="팀원 추가"
			>
			</TeamMemberAddBtn>

			<v-subheader>팀원 목록</v-subheader>
			<div v-for="(member, index) in teamMembers" v-bind:key="'A' + index">
				<MyTeamMemberComp :pTeamMember="member" :pTeamSeq="teamSeq" />
			</div>

			<!-- TODO 페이지네이션 공통 컴포넌트로 관리하기 -->
			<v-pagination
				v-model="pagination.pageNo"
				:length="pagination.totalPageCount"
				@input="getTeamMembersWithPagination"
			/>
		</v-container>
	</div>
</template>

<script>
	/** Backend API */
	import MyTeamAPI from '@/api/MyTeamAPI';
	/** CODE */
	/** Utils */
	import AuthUtil from '@/common/AuthUtil.js';
	import PaginationUtil from '@/common/util/PaginationUtil.js';

	/** Components */
	import MyTeamProfileComp from '@/views/myTeam/detail/components/MyTeamProfileComp.vue';
	import MyTeamManagerComp from '@/views/myTeam/detail/components/MyTeamManagerComp.vue';
	import MyTeamMemberComp from '@/views/myTeam/detail/components/MyTeamMemberComp.vue';

	import MyTeamInfoUpdateModal from '@/views/myTeam/detail/tab/modal/MyTeamInfoUpdateModal.vue';
	import MyTeamProfileUpdateModal from '@/views/myTeam/detail/tab/modal/MyTeamProfileUpdateModal.vue';

	import ProfileUpdateBtn from '@/components/button/FrameOpenBtn.vue';
	import TeamInfoUpdateBtn from '@/components/button/FrameOpenBtn.vue';
	// TODO 팀원추가 화면을 Layer로 구현하는 것을 고민... FrameOpenBtn 으로 대체 예정
	// ( FrameAddBtn은 API를 호출해서 데이터가 추가되는 동작일 경우 사용 )
	import TeamMemberAddBtn from '@/components/button/FrameAddBtn.vue';

	export default {
		components: {
			MyTeamProfileComp,
			MyTeamManagerComp,
			MyTeamMemberComp,
			// eslint-disable-next-line
			MyTeamInfoUpdateModal,
			MyTeamProfileUpdateModal,
			// 버튼 컴포넌트
			ProfileUpdateBtn,
			TeamInfoUpdateBtn,
			TeamMemberAddBtn,
		},
		//data: {} // Component끼리 data를 공유하면 안되므로 다음과 같이 사용하면 안됨.
		data() {
			return {
				isAsyncComplete: false,
				teamSeq: Number(this.$route.query.teamSeq),
				profile: {},
				managers: [],
				teamMembers: [],
				teamInfo: {},
				isActivatedTeamInfoModal: false,
				isActivatedProfileModal: false,
				pagination: PaginationUtil.getIntlPager(),
			};
		},
		methods: {
			async onLoad() {
				await this.getProflie();
				await this.getManagers();
				await this.getTeamMembers();
			},
			async getProflie() {
				this.profile = await MyTeamAPI.findMyTeamsProfile(this.teamSeq);
			},
			async getManagers() {
				const response = await MyTeamAPI.getManagers(this.teamSeq);
				this.managers = response.data.managers;
			},
			async getTeamMembers(pageNo) {
				const response = await MyTeamAPI.getTeamMembers(
					{ teamSeq: this.teamSeq },
					{ pageNo: pageNo }
				);
				const { data } = response;
				this.teamMembers = data.teamMembers;
				this.pagination = data.pagination;
			},
			/** v-pagination @input이벤트 - page번호가 바뀌면 바뀐 page번호가 이벤트 handler의 인자로 들어옴 */
			getTeamMembersWithPagination(pageNo) {
				this.getTeamMembers(pageNo);
			},
			clickAddTeamMember() {
				const teamSeq = this.teamSeq;
				this.$router.push({
					name: 'MyTeamMemberManagePage',
					query: { teamSeq: teamSeq },
				});
			},
			isManager() {
				return AuthUtil.isManager(this.teamSeq);
			},
			isLeader() {
				return AuthUtil.isLeader(this.teamSeq);
			},
			/**-----------------------------
			 * Modal 제어
			 **-----------------------------*/
			openProfileUpdateModal() {
				this.isActivatedProfileModal = true;
			},
			closeProfileUpdateModal() {
				this.isActivatedProfileModal = false;
			},
		},
		async mounted() {
			// TODO 순서를 바꾸면 화면 렌더링 제대로 안됨.
			await this.onLoad();
			this.isAsyncComplete = true;
		},
	};
</script>

<style lang="scss" scoped></style>
