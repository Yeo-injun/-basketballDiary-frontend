<template>
	<v-container class="px-15"  v-if="this.isAsyncComplete">
		<v-row>
			<v-col>
				<ProfileUpdateBtn
					@do-open="openProfileUpdateModal()"
					pBtnName="프로필 수정"
				/>
				<ProfileUpdateModal
					:pTeamSeq="this.pTeamSeq"
					:pIsActivated="isActivatedProfileModal"
					:pBackNumber="profile.backNumber"
					:pImageUrl="profile.imageUrl"
					@modal-close="closeProfileUpdateModal()"
				/>
			</v-col>
			<v-col>
				<MyTeamInfoUpdateBtn
					v-if="this.isManager()"
					@do-open="isActivatedTeamInfoModal = true"
					pBtnName="팀정보 수정"
				/>
				<MyTeamInfoUpdateModal
					v-model="isActivatedTeamInfoModal"
					@input="isActivatedTeamInfoModal = $event"
					:pTeamSeq="this.pTeamSeq"
				/>
			</v-col>
			<v-col>
				<TeamMemberAddBtn
					v-if="this.isManager()"
					@do-add="clickAddTeamMember"
					pBtnName="팀원 추가"
				/>
			</v-col>
		</v-row>
	
		<v-container>
			<TeamProfileSubTitle class="pb-2" pTitleName="개인프로필" />
			<TeamProfileComp :pTeamProfile="profile"/>
		</v-container>


		<v-container>
			<ManagerSubTitle pTitleName="운영진 목록" />
			<Managers 
				:pTeamSeq="this.pTeamSeq"
				:pTeamManagers="managers"
			/>
		</v-container>

		<v-container>
			<TeamMemberSubTitle pTitleName="팀원 목록" />
			<TeamMembersComp
				:pTeamSeq="this.pTeamSeq"
				:pTeamMembers="teamMembers"
				:pPagination="pagination"
				@click-page="getTeamMembers"
			/>
		</v-container>

	</v-container>
</template>

<script>
	import AuthManager from '@/common/auth/AuthManager.js';
	/** Backend API */
	import MyTeamAPI from '@/api/MyTeamAPI.js';
	/** CODE */
	/** Utils */
	/** Components */
	import ProfileUpdateModal from '@/views/myTeam/detail/tab/modal/MyTeamProfileUpdateModal.vue';
	import ProfileUpdateBtn from '@/components/button/FrameOpenBtn.vue';

	import MyTeamInfoUpdateModal from '@/views/myTeam/detail/tab/modal/MyTeamInfoUpdateModal.vue';
	import MyTeamInfoUpdateBtn from '@/components/button/FrameOpenBtn.vue';

	import TeamMemberAddBtn from '@/components/button/FrameAddBtn.vue';

	import TeamProfileSubTitle from '@/components/title/FrameTabSubTitle.vue';
	import TeamProfileComp from '@/views/myTeam/detail/components/member/TeamProfileComp.vue';

	import ManagerSubTitle from '@/components/title/FrameTabSubTitle.vue';
	import Managers from '@/views/myTeam/detail/components/member/TeamManagersComp.vue';
	
	import TeamMemberSubTitle from '@/components/title/FrameTabSubTitle.vue';
	import TeamMembersComp from '@/views/myTeam/detail/components/member/TeamMembersComp.vue';

	// TODO 팀원추가 화면을 Layer로 구현하는 것을 고민... FrameOpenBtn 으로 대체 예정
	// ( FrameAddBtn은 API를 호출해서 데이터가 추가되는 동작일 경우 사용 )

	export default {
		components: {
			ProfileUpdateModal,
			ProfileUpdateBtn,
			MyTeamInfoUpdateModal,
			MyTeamInfoUpdateBtn,

			TeamMemberAddBtn,

			TeamProfileSubTitle,
			TeamProfileComp,
			
			ManagerSubTitle,
			Managers,

			TeamMemberSubTitle,
			TeamMembersComp,
		},
		props: {
			pTeamSeq : {
				type : Number,
				required : true,
			},
		},
		data() {
			return {
				isActivatedTeamInfoModal: false,
				isActivatedProfileModal: false,

				isAsyncComplete: false,
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
				this.profile = await MyTeamAPI.getProfile(this.pTeamSeq);
			},
			async getManagers() {
				const response = await MyTeamAPI.getManagers(this.pTeamSeq);
				this.managers = response.data.managers;
			},
			async getTeamMembers() {
				const { data } = await MyTeamAPI.getTeamMembers(
					{ teamSeq: this.pTeamSeq },
					{ pageNo: this.pagination.pageNo }
				);
				this.teamMembers = data.teamMembers;
				this.pagination = data.pagination;
			},
			clickAddTeamMember() {
				const teamSeq = this.pTeamSeq;
				this.$router.push({
					name: 'MyTeamMemberManagePage',
					query: { teamSeq: teamSeq },
				});
			},
			isManager() {
				return AuthManager.isManager( this.pTeamSeq );
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
