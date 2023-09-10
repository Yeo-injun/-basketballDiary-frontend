<template>
	<div>
		<v-container class="px-15">
			<div class="d-flex">
				<ProfileUpdateBtn
					@do-open="isActivatedProfileModal = true"
					pBtnName="프로필 수정"
				/>
				<MyTeamProfileUpdateModal
					:pTeamSeq="teamSeq"
					:value="isActivatedProfileModal"
					@input="isActivatedProfileModal = $event"
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
			<!-- // TODO 프로필 사진 이미지 경로로 가져오기!!  -->
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

	import ProfileUpdateBtn from '@/components/button/FrameOpenBtn.vue';
	import TeamInfoUpdateBtn from '@/components/button/FrameOpenBtn.vue';
	// TODO 팀원추가 화면을 Layer로 구현하는 것을 고민... FrameOpenBtn 으로 대체 예정
	// ( FrameAddBtn은 API를 호출해서 데이터가 추가되는 동작일 경우 사용 )
	import TeamMemberAddBtn from '@/components/button/FrameAddBtn.vue';

	import AuthUtil from '@/common/AuthUtil.js';

	export default {
		//data: {} // Component끼리 data를 공유하면 안되므로 다음과 같이 사용하면 안됨.
		data() {
			return {
				teamSeq: this.$route.query.teamSeq,
				profile: {},
				managers: [],
				teamMembers: [],
				teamInfo: {},
				isActivatedTeamInfoModal: false,
				isActivatedProfileModal: false,
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
			// 버튼 컴포넌트
			ProfileUpdateBtn,
			TeamInfoUpdateBtn,
			TeamMemberAddBtn,
		},
		methods: {
			async onLoad() {
				// TODO 새로고침시 props값이 날라가는 것을 제어해야함...(제어할 수 있는지 검토 필요)
				await this.getProflie();
				await this.getManagers();
				await this.getTeamMembers();
			},
			async getProflie() {
				this.profile = await myTeamApi.findMyTeamsProfile(this.teamSeq);
				// const { data } = response;
				// this.profile = data;
				// // TODO 실행환경별 Host처리 API에서 처리하기...
				// this.profile.imageUrl =
				// 	'http://127.0.0.1:18080/images' + this.profile.memberImagePath;
			},
			async getManagers() {
				const response = await myTeamApi.getManagers(this.teamSeq);
				this.managers = response.data.managers;
			},
			async getTeamMembers() {
				const response = await myTeamApi.getTeamMembers(
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
				this.getTeamMembers();
			},
			isManager() {
				return AuthUtil.isManager(this.teamSeq);
			},
			isLeader() {
				return AuthUtil.isLeader(this.teamSeq);
			},
		},
		mounted() {
			// TODO 순서를 바꾸면 화면 렌더링 제대로 안됨.
			this.onLoad();
		},
	};
</script>

<style lang="scss" scoped></style>
