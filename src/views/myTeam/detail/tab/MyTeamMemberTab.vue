<template>
	<div v-if="this.isAsyncComplete">
		<v-container class="px-15">
			<div class="d-flex">
				<ProfileUpdateBtn
					@do-open="openProfileUpdateModal()"
					pBtnName="프로필 수정"
				/>
				<ProfileUpdateModal
					:pTeamSeq="teamSeq"
					:pIsActivated="isActivatedProfileModal"
					:pBackNumber="this.profile.backNumber"
					:pImageUrl="profile.imageUrl"
					@modal-close="closeProfileUpdateModal()"
				/>

				<MyTeamInfoUpdateBtn
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
			/>

			<v-subheader>팀원 목록</v-subheader>
			<TeamMemberList
				:pList="teamMembers"
				:pPagination="pagination"
				@click-page="getTeamMembers"
			>
				<template v-slot:itemSlot="data">
					<MyTeamMemberComp :pTeamMember="data.item" :pTeamSeq="teamSeq" />
				</template>
				<template v-slot:itemEmptySlot> 등록된 팀원이 없습니다. </template>
			</TeamMemberList>
		</v-container>
	</div>
</template>

<script>
	/** Backend API */
	import MyTeamAPI from '@/api/MyTeamAPI';
	/** CODE */
	/** Utils */
	import AuthUtil from '@/common/AuthUtil.js';

	/** Components */
	import ProfileUpdateModal from '@/views/myTeam/detail/tab/modal/MyTeamProfileUpdateModal.vue';
	import ProfileUpdateBtn from '@/components/button/FrameOpenBtn.vue';

	import MyTeamInfoUpdateModal from '@/views/myTeam/detail/tab/modal/MyTeamInfoUpdateModal.vue';
	import MyTeamInfoUpdateBtn from '@/components/button/FrameOpenBtn.vue';

	import TeamMemberAddBtn from '@/components/button/FrameAddBtn.vue';

	import MyTeamProfileComp from '@/views/myTeam/detail/components/MyTeamProfileComp.vue';
	import MyTeamManagerComp from '@/views/myTeam/detail/components/MyTeamManagerComp.vue';
	import TeamMemberList from '@/components/list/FramePaginationList.vue';
	import MyTeamMemberComp from '@/views/myTeam/detail/components/MyTeamMemberComp.vue';

	// TODO 팀원추가 화면을 Layer로 구현하는 것을 고민... FrameOpenBtn 으로 대체 예정
	// ( FrameAddBtn은 API를 호출해서 데이터가 추가되는 동작일 경우 사용 )

	export default {
		components: {
			ProfileUpdateModal,
			ProfileUpdateBtn,
			MyTeamInfoUpdateModal,
			MyTeamInfoUpdateBtn,

			TeamMemberAddBtn,

			MyTeamProfileComp,
			MyTeamManagerComp,
			TeamMemberList,
			MyTeamMemberComp,
		},
		data() {
			return {
				isActivatedTeamInfoModal: false,
				isActivatedProfileModal: false,

				isAsyncComplete: false,
				teamSeq: Number(this.$route.query.teamSeq),
				profile: {},
				managers: [],
				teamMembers: [],
				pagination: {}, // 비어있는객체로 초기화해서 자식컴포넌트에 props 로 넘겨주면 초기화값 반영
			};
		},
		methods: {
			async onLoad() {
				await this.getTeamMembers();
				await this.getProflie();
				await this.getManagers();
			},
			async getProflie() {
				this.profile = await MyTeamAPI.findMyTeamsProfile(this.teamSeq);
			},
			async getManagers() {
				const response = await MyTeamAPI.getManagers(this.teamSeq);
				this.managers = response.data.managers;
			},
			async getTeamMembers() {
				const { data } = await MyTeamAPI.getTeamMembers(
					{ teamSeq: this.teamSeq },
					{ pageNo: this.pagination.pageNo }
				);
				// TODO 자식컴포넌트와 호출 순서 확인 및 제어 필요
				console.log('getTeamMembers호출!!');
				console.log(data);
				this.teamMembers = data.teamMembers;
				this.pagination = data.pagination;
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
