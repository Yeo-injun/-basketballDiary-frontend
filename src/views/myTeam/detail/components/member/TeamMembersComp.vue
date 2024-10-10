<template>
	<PaginagtionList
		:pList="pTeamMembers"
		:pPagination="pPagination"
		@click-page="onClickPage"
	>
		<template v-slot:itemSlot="data">
			<TeamMemberComp :pTeamMember="data.item" :pTeamSeq="pTeamSeq" />
			<v-divider v-if="data.idx < pTeamMembers.length - 1"/>
		</template>
		<template v-slot:itemEmptySlot> 등록된 팀원이 없습니다. </template>
	</PaginagtionList>
</template>

<script>
	/** Backend API */
	/** CODE */
	/** Utils */
	/** Components */
	import PaginagtionList from '@/components/list/FramePaginationList.vue';
	import TeamMemberComp from '@/views/myTeam/detail/components/member/TeamMemberComp.vue';

	export default {
		components: {
			PaginagtionList,
			TeamMemberComp,
		},
		props: {
			pTeamMembers: {
				type: Array,
				default() {
					return [];
				},
			},
			pPagination: {
				type: Object,
				default() {
					return {
						pageNo : 1,
					}
				},
			},
			pTeamSeq: {
				type: Number,
				required: true,
			},
		},
		methods: {
			onClickPage( pagination ) {
				// 페이징 번호를 클릭하면 페이징 이벤트를 상위 컴포넌트로 전달한다.
				this.$emit( 'click-page', pagination );
			},
		},
	};
</script>

<style></style>
