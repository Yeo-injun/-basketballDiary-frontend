<template>
	<v-container class="px-15"  v-if="this.isAsyncComplete">
		<v-container>
			<TeamProfileSubTitle class="pb-2" pTitleName="개인프로필" />
			<TeamProfileComp 
				:pTeamSeq="this.pTabParams.teamSeq"
				:pTeamProfile="profile"
			/>
		</v-container>

		<v-container>
			<ManagerSubTitle pTitleName="운영진 목록" />
			<Managers 
				:pTeamSeq="this.pTabParams.teamSeq"
				:pTeamManagers="managers"
			/>
		</v-container>

		<v-container>
			<TeamMemberSubTitle pTitleName="팀원 목록" />
			<TeamMembersComp
				:pTeamSeq="this.pTabParams.teamSeq"
				:pTeamMembers="teamMembers"
				:pPagination="pagination"
				@click-page="getTeamMembers"
			/>
		</v-container>

	</v-container>
</template>

<script>
	/** Backend API */
	import MyTeamAPI from '@/api/MyTeamAPI.js';
	/** CODE */
	/** Utils */
	/** Components */
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
			TeamProfileSubTitle,
			TeamProfileComp,
			
			ManagerSubTitle,
			Managers,

			TeamMemberSubTitle,
			TeamMembersComp,
		},
		props: {
			pTabParams: {
				type: Object,
				required : true,
			},
		},
		data() {
			return {
				/** 비동기 통신 후 컴포넌트 제어 */
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
				this.profile = await MyTeamAPI.getProfile(this.pTabParams.teamSeq);
			},
			async getManagers() {
				const response = await MyTeamAPI.getManagers(this.pTabParams.teamSeq);
				this.managers = response.data.managers;
			},
			async getTeamMembers() {
				const { data } = await MyTeamAPI.getTeamMembers(
					{ teamSeq: this.pTabParams.teamSeq },
					{ pageNo: this.pagination.pageNo }
				);
				this.teamMembers = data.teamMembers;
				this.pagination = data.pagination;
			},
		},
		async mounted() {
			// 순서를 바꾸면 화면 렌더링 제대로 안됨.
			await this.onLoad();
			this.isAsyncComplete = true;
		},
	};
</script>

<style lang="scss" scoped></style>
