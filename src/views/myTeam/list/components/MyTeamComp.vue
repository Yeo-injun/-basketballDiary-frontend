<template>
	<v-container>
		<!-- Error :  Avoid using non-primitive value as key, use string/number value instead. -->
		<!-- 해결법 : https://crispypotato.tistory.com/33 -->
		<v-card class="mt-10">
			<v-container>
				<h2>{{ pTeamInfo.teamName }}</h2>
				<v-row class="mb-5">
					<v-col md="3">
						<MyTeamLogoImage
							:pImageUrl="pTeamInfo.teamImagePath"
							:pMaxHeight="String(150)"
							:pMaxWidth="String(250)"
						/>
					</v-col>
					<v-col>
						<v-row>
							<v-col>연고지: {{ pTeamInfo.hometown }}</v-col>
						</v-row>
						<v-row>
							<v-col>회원수: {{ pTeamInfo.totMember }}명</v-col>
							<v-col>창단일: {{ pTeamInfo.foundationYmd }}</v-col>
						</v-row>
						<v-row>
							<v-col>
								{{ pTeamInfo.introduction }}
							</v-col>
						</v-row>
					</v-col>
				</v-row>
				<v-row no-gutters>
					<v-col>
						정기운동 시간/장소: 팀목록 조회하는 화면과 공통으로 사용하는
						컴포넌트로 구현하기
					</v-col>
				</v-row>
			</v-container>

			<v-container>
				<v-row align="center" justify="space-around">
					<v-btn absolute right color="info" @click="moveMyTeamDetailPage()">
						상세보기
					</v-btn>
				</v-row>
			</v-container>
		</v-card>
	</v-container>
</template>

<script>
	import MyTeamLogoImage from '@/components/image/FrameImageComp.vue';

	export default {
		components: {
			MyTeamLogoImage,
		},
		props: {
			pTeamInfo: Object,
		},
		methods: {
			moveMyTeamDetailPage() {
				this.$router.push({
					name: 'MyTeamDetailPage',
					query: {
						teamSeq: this.pTeamInfo.teamSeq,
						teamName: this.pTeamInfo.teamName,
					},
				});
			},
		},
	};
</script>

<style></style>
