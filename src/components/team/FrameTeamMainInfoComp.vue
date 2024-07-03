<template>
	<div>
		<v-row>
			<v-col md="3">
				<MyTeamLogoImage
					:pImageUrl="pTeamInfo.teamImagePath"
					:pMaxHeight="String(180)"
					:pMaxWidth="String(240)"
				/>
			</v-col>
			<v-col align-self="center">
				<div class="d-flex align-center">
					<span class="text-h6 font-weight-black">{{ pTeamInfo.teamName }}</span>
					<v-chip
						color="lighten-4"
						class="ma-1 px-2 black--text "
						label small
					>
						<v-img class="ma-1" src="@/assets/person.svg"/>
						{{ pTeamInfo.totMember }}
					</v-chip>
				</div>
				<div><strong>설립일 |</strong> {{ formattedFoundationYmd }}</div>
				<div><strong>연고지 | </strong>{{ pTeamInfo.hometown }}</div>
				<div><strong>팀소개 | </strong>{{ pTeamInfo.introduction }}</div>
			</v-col>
		</v-row>
	</div>
</template>

<script>
	/** Backend API */
	/** Code */
	/** Utils */
	import DateUtil from '@/common/DateUtil';
	/** Components */
	import MyTeamLogoImage from '@/components/image/FrameImageComp.vue';

	/** Emit Event */

	export default {
		components: {
			MyTeamLogoImage,
		},
		props: {
			pTeamInfo: {
				type 	: Object,
				default() {
					return {
						teamSeq			: "",
						teamName 		: "",
						teamImagePath 	: "",
						hometown 		: "",
						totMember 		: 0,
						foundationYmd 	: "",
						introduction 	: "",
					}
				},
			}
		},
		computed:{
			formattedFoundationYmd() {
				return DateUtil.Format.toYmd( this.pTeamInfo.foundationYmd );
			}
		}
	};
</script>

<style></style>
