<template>
	<v-container class="px-15"  v-if="this.isAsyncComplete">
		<v-container>
			<TeamProfileSubTitle class="pb-2" pTitleName="회비 잔액" />
		</v-container>

		<v-container>
		</v-container>

		<v-container>
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


	export default {
		components: {
			TeamProfileSubTitle,

		},
		props: {
			pTeamSeq : {
				type : Number,
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
		},
		async mounted() {
			// 순서를 바꾸면 화면 렌더링 제대로 안됨.
			await this.onLoad();
			this.isAsyncComplete = true;
		},
	};
</script>

<style lang="scss" scoped></style>
