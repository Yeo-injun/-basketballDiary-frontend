<template>
	<v-container>
		<v-card class="grey lighten-3">
			<v-row>
				<v-col cols="2">
					<ProfileImage :pImageUrl="pMyProfile.memberImagePath" />
				</v-col>
				<v-col cols="10">
					<v-row justify="space-between">
						<v-col>포지션: {{ pMyProfile.positionCodeName }}</v-col>
						<v-col>직책: {{ pMyProfile.teamAuthCodeName }}</v-col>
						<v-col>가입일: {{ pMyProfile.joinYmd }}</v-col>
					</v-row>
					<v-row justify="space-between">
						<v-col>
							<v-row>
								<v-col>신장: {{ pMyProfile.height }}</v-col>
								<v-col>체중: {{ pMyProfile.weight }}</v-col>
							</v-row>
						</v-col>
						<v-col>등번호: {{ pMyProfile.backNumber }}</v-col>
						<v-col>경기참여: {{ pMyProfile.totGame }}회</v-col>
					</v-row>
				</v-col>
			</v-row>
		</v-card>
	</v-container>
</template>

<script>
	import ProfileImage from '@/components/image/FrameImageComp.vue';

	export default {
		components: {
			ProfileImage,
		},
		props: {
			pMyProfile: Object,
		},
	};
</script>

<style lang="scss" scoped></style>
