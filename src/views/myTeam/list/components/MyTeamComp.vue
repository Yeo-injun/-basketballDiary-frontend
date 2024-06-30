<template>
	<v-container>
		<!-- Error :  Avoid using non-primitive value as key, use string/number value instead. -->
		<!-- 해결법 : https://crispypotato.tistory.com/33 -->
		<v-card class="mt-10">
			
				<v-row>
					<v-col md="3">
						<MyTeamLogoImage
							:pImageUrl="pTeamInfo.teamImagePath"
							:pMaxHeight="String(180)"
							:pMaxWidth="String(240)"
						/>
					</v-col>
					<v-col align-self="center">
						<h3>{{ pTeamInfo.teamName }}</h3>
						<v-chip
							color="lighten-4"
							class="ml-0 mr-2 black--text"
							label small
						>
							<v-img src="@/assets/person.svg"/>
							{{ pTeamInfo.totMember }}
						</v-chip>
						<div><strong>설립일 |</strong> {{ formattedFoundationYmd }}</div>
						<div><strong>연고지 | </strong>{{ pTeamInfo.hometown }}</div>
						<div><strong>팀소개 | </strong>{{ pTeamInfo.introduction }}</div>
					</v-col>
				</v-row>
				<v-container>
					<MoveMyTeamDetailBtn pBtnName="상세보기"
						pRoutePageName="MyTeamDetailPage"
						:pRouteParams="{
							teamSeq		: this.pTeamInfo.teamSeq,
							teamName	: this.pTeamInfo.teamName,
						}"
					/>
				</v-container>
		</v-card>
	</v-container>
</template>

<script>
	/** Backend API */
	/** Code */
	/** Utils */
	import DateUtil from '@/common/DateUtil';
	/** Components */
	import MyTeamLogoImage from '@/components/image/FrameImageComp.vue';
	import MoveMyTeamDetailBtn from '@/components/button/FramePageMoveBtn.vue';

	/** Emit Event */

	export default {
		components: {
			MyTeamLogoImage,
			MoveMyTeamDetailBtn,
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
