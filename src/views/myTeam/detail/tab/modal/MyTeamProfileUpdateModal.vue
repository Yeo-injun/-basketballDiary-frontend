<template>
	<v-dialog v-model="isActivated" width="1200px">
		<v-card>
			<v-card-title class="text-h5 grey lighten-2"> 프로필 수정 </v-card-title>

			<v-card-text>
				<v-container>
					<v-text-field label="등번호" v-model="this.backNumber" />

					<MyTeamProfileImageComp :pImageUrl="this.imageUrl" />
					<v-file-input
						show-size
						label="소속팀 프로필 사진"
						accept="image/*"
						@change="selectImage"
					/>
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
