<template>
	<v-btn color="red white--text" small @click="dischargeTeamMember()">
		강퇴하기
	</v-btn>
</template>

<script>
	/** Backend API */
	import MyTeamAPI from '@/api/MyTeamAPI.js';

	/** CODE */
	/** Utils */
	/** Components */

	export default {
		props: {
			pTeamSeq: String,
			pTeamMemberSeq: Number,
		},
		methods: {
			async dischargeTeamMember() {
				const params = {
					teamSeq: this.pTeamSeq,
					teamMemberSeq: this.pTeamMemberSeq,
				};
				try {
					const res = await MyTeamAPI.dischargeTeamMember(params);
					if (res.status == '200') {
						alert('강퇴 되었습니다.');
					}
				} catch (e) {
					console.log(e);
				}
			},
		},
	};
</script>

<style lang="scss" scoped></style>
