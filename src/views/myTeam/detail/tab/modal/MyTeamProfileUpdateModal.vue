<!-- 모달 Template을 만들 필요가 있어 보임 -->
<template>
	<v-dialog v-model="isActivated" width="1200px">
		<v-card>
			<v-card-title class="text-h5 grey lighten-2"> 프로필 수정 </v-card-title>

			<v-card-text>
				<v-container>
					<h3>프로필 사진</h3>
					<MyTeamProfileImageComp :pImageUrl="this.imageUrl" />
					<v-file-input
						show-size
						label="수정할 프로필 사진 업로드"
						accept="image/*"
						@change="selectImage"
					/>

					<!-- TODO 입력 오류 해결 필요 -->
					<v-text-field label="등번호" v-model="this.backNumber" />
				</v-container>
			</v-card-text>
			<v-card-actions>
				<MyTeamProfileUpdateBtn pBtnName="수정" @do-update="updateProfile" />
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script>
	/** Backend API */
	import MyTeamAPI from '@/api/MyTeamAPI';
	/** CODE */
	/** Utils */
	/** Components */
	import MyTeamProfileImageComp from '@/components/myTeam/MyTeamProfileImageComp.vue';
	import MyTeamProfileUpdateBtn from '@/components/button/FrameUpdateBtn.vue';

	export default {
		components: {
			MyTeamProfileImageComp,
			MyTeamProfileUpdateBtn,
		},
		data() {
			console.log('data()');
			return {
				backNumber: this.pBackNumber,
				imageUrl: this.pImageUrl,
			};
		},
		props: {
			pIsActivated: {
				type: Boolean,
				required: true,
			},
			pTeamSeq: {
				type: String,
				required: true,
			},
			pBackNumber: {
				type: String,
				required: false,
			},
			pImageUrl: {
				type: String,
				required: false,
			},
		},
		computed: {
			// TODO 모달이 열리는 시점에 props 데이터로 모달 데이터 업데이트하기
			isActivated: {
				get() {
					console.log('isActiveGET()');

					return this.pIsActivated;
				},
				set(isActivated) {
					console.log('isActiveSET()');
					if (isActivated) {
						this.backNumber = this.pBackNumber;
						this.imageUrl = this.pImageUrl;
						return;
					}
					this.$emit('modal-close', false);
				},
			},
		},
		mounted() {
			// 소스코드 정리 필요
			console.log('mounted()');
			this.backNumber = this.pBackNumber;
			this.imageUrl = this.pImageUrl;
			console.log(this);
			// this.load();
		},
		methods: {
			selectImage(imageUrl) {
				this.imageUrl = imageUrl;
			},
			async updateProfile() {
				const msg = {
					teamSeq: this.pTeamSeq,
					backNumber: this.backNumber,
					imageFile: this.imageUrl,
				};

				await MyTeamAPI.modifyMyTeamsProfile(msg);
			},
		},
	};
</script>

<style lang="scss" scoped></style>
