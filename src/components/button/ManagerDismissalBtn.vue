<template>
	<v-container>
		<v-btn color="black white--text" small @click="dismissManager()">
			임원제명
		</v-btn>
	</v-container>
</template>

<script>
	import myTeamApi from '@/api/MyTeamAPI.js';

	export default {
		props: {
			pTeamSeq: {
				type: Number,
				required: true,
			},
			pTeamMemberSeq: Number,
		},
		methods: {
			async dismissManager() {
				const params = {
					teamSeq: this.pTeamSeq,
					teamMemberSeq: this.pTeamMemberSeq,
				};
				const res = await myTeamApi.dismissManager(params);
				if (res.status == '200') {
					alert('관리자에서 해임되었습니다.');
				}
			},
		},
	};
</script>

<style lang="scss" scoped></style>
