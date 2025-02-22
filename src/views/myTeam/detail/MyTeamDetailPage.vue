<template>
	<div>
		<v-container>
			<v-card class="mx-auto mt-6" max-width="1100" outlined >
				<MyTeamMainInfo class="pt-2 pb-2"
					v-if="this.isInitTeamInfo"
					:pTeamInfo="{
					teamName		: this.teamName,
					teamImagePath 	: this.teamImagePath,
					hometown 		: this.hometown,
					totMember 		: this.totMember,
					foundationYmd 	: this.foundationYmd,
					introduction 	: this.introduction,
					totMember		: this.memberCount,
				}"/>
				<v-row v-if="this.isManager()" class="ma-0" >
					<v-col>
						<MyTeamInfoUpdateBtn
							@do-open="isActivatedTeamInfoModal = true"
							pBtnName="팀정보 수정"
						/>
						<MyTeamInfoUpdateModal
							v-model="isActivatedTeamInfoModal"
							@input="isActivatedTeamInfoModal = $event"
							:pTeamSeq="Number( this.teamSeq )"
						/>
					</v-col>
					<v-col>
						<TeamMemberAddBtn
							@do-add="clickAddTeamMember"
							pBtnName="팀원 추가"
						/>
					</v-col>
				</v-row>
			</v-card>
		</v-container>
		<v-container>
			<TabContainer
				:pTabComponents="tabComponents"
				:pTabParams="{
					teamSeq 	: Number( teamSeq ),
					teamName 	: teamName,
				}"
			/>
		</v-container>
	</div>
</template>

<script>
	import AuthManager from '@/common/auth/AuthManager.js';

	/** Backend API */
	import MyTeamAPI from '@/api/MyTeamAPI';
	
	/** Code */
	/** Utils */
	/** Components */
	import MyTeamMainInfo from '@/components/team/FrameTeamMainInfoComp.vue';
	
	import MyTeamInfoUpdateModal from '@/views/myTeam/detail/tab/modal/MyTeamInfoUpdateModal.vue';
	import MyTeamInfoUpdateBtn from '@/components/button/FrameOpenBtn.vue';

	import TeamMemberAddBtn from '@/components/button/FrameAddBtn.vue';

	/**
	 * Tab Components
	 */
	import TabContainer from '@/components/tab/FrameDefaultTabContainer.vue';
	import MyTeamMembersTab from '@/views/myTeam/detail/tab/MyTeamMemberTab.vue';
	import MyTeamGamesTab from '@/views/myTeam/detail/tab/MyTeamGameListTab.vue';
	import MyTeamFundTab from '@/views/myTeam/detail/tab/MyTeamFundTab.vue';


	/** Emit Event */

	export default {
		components: {
			MyTeamInfoUpdateModal,
			MyTeamInfoUpdateBtn,

			TeamMemberAddBtn,

			MyTeamMainInfo,
			TabContainer,
		},
		data() {
			const query = this.$route.query;
			return {
				/** 모달 제어 */
				isActivatedTeamInfoModal: false,
				/** 탭정보 */
				tabName: query.tabName,
				/** 팀정보 */
				isInitTeamInfo	: false,
				teamSeq			: query.teamSeq,
				teamName		: "",
				teamImagePath 	: "",
				hometown 		: "",
				totMember 		: "",
				foundationYmd 	: "",
				introduction 	: "",
				memberCount		: 0,
				/** 탭 정보 */
				tabComponents: [
					{ component: MyTeamMembersTab	, label: '팀원',  },
					{ component: MyTeamGamesTab		, label: '팀경기',  },
					{ component: MyTeamFundTab		, label: '회비',  },
				],
			};
		},
		methods : {
			async intlTeamInfo() {
				const query = this.$route.query;
				const data 	= await MyTeamAPI.getTeamInfo( query.teamSeq );
				this.teamSeq		= data.teamSeq;
				this.teamName		= data.teamName;
				this.teamImagePath 	= data.teamLogoImagePath;
				this.hometown		= data.hometown;
				this.foundationYmd	= data.foundationYmd;
				this.introduction	= data.introduction;
				this.memberCount	= data.memberCount;
				// 초기화 완료
				this.isInitTeamInfo = true;
			},
			isManager() {
				return AuthManager.isManager( this.teamSeq );
			},
			clickAddTeamMember() {
				const teamSeq = this.teamSeq;
				this.$router.push({
					name: 'MyTeamMemberManagePage',
					query: { teamSeq: teamSeq },
				});
			},
		},
		mounted() {
			this.intlTeamInfo();	
		}
	};
</script>

<style lang="scss" scoped></style>
