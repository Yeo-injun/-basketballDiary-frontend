<!-- 모달 Template을 만들 필요가 있어 보임 -->
<template>
	<v-dialog v-model="isActivated" width="1200px">
		<v-card>
			<v-card-title class="text-h5 grey lighten-2"> 프로필 수정 </v-card-title>

			<v-card-text>
				<v-container>
					<h3>프로필 사진</h3>
					<MyTeamProfileImageComp :pImageUrl="this.imageUrl" />
					<v-form ref="updateProfileInputs">
						<ProfileImageInput
							pLabel="수정할 프로필 사진 업로드"
							@exceed-max-size="handleImageFileInputEvent"
							@clear-input="handleImageFileInputEvent"
							@select-valid-image="handleImageFileInputEvent"
						/>
						<BacknumberInput 
							:pData="this.backNumber" 
							:pRequired="true"
						/>
					</v-form>
				</v-container>
			</v-card-text>
			<MyTeamProfileUpdateBtn pBtnName="수정" @do-update="updateProfile" />
			<MyTeamProfileUpdateModalCloseBtn
				@do-close="isActivated = false"
				pBtnName="닫기"
			/>

			<!-- <v-card-actions>
				actions내부에서 컴포넌트를 선언하면 줄바꿈이 되지 않고 옆으로 이어서 보여진다.
			</v-card-actions> -->
		</v-card>
	</v-dialog>
</template>

<script>
	/** Backend API */
	import MyTeamAPI from '@/api/MyTeamAPI';

	/** Code */
	/** Utils */
	/** Components */
	import MyTeamProfileImageComp from '@/components/image/FrameImageComp.vue';
	import ProfileImageInput from '@/components/input/FrameImageInput.vue';
	import BacknumberInput from '@/components/input/player/BacknumberInput.vue';

	import MyTeamProfileUpdateBtn from '@/components/button/FrameUpdateBtn.vue';
	import MyTeamProfileUpdateModalCloseBtn from '@/components/button/FrameCloseBtn.vue';

	/** Emit Event */

	export default {
		components: {
			MyTeamProfileImageComp,
			ProfileImageInput,
			BacknumberInput,
			MyTeamProfileUpdateBtn,
			MyTeamProfileUpdateModalCloseBtn,
		},
		props: {
			pIsActivated: {
				type: Boolean,
				required: true,
			},
			pTeamSeq: {
				type: Number,
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
		data() {
			const data = {
				/*-------------------
				 * Input 데이터
				 *-------------------*/
				backNumber: this.pBackNumber,
				imageUrl: this.pImageUrl,
				imageFile: null,
				imageFileErrorMessage : "",
			}
			return data;
		},
		computed: {
			// TODO 모달이 열리는 시점에 props 데이터로 모달 데이터 업데이트하기
			isActivated: {
				get() {
					return this.pIsActivated;
				},
				set() {
					this.$emit('modal-close', false);
				},
			},
		},
		methods: {
			handleImageFileInputEvent( event ) {
				this.imageFile 				= event.imageFile;
				this.imageFileErrorMessage 	= event.errorMessage;
			},
			async updateProfile() {
				if (!this.$refs.updateProfileInputs.validate()) {
					alert( this.imageFileErrorMessage );
					return;
				}

				const msg = {
					teamSeq: this.pTeamSeq,
					backNumber: this.backNumber,
					imageFile: this.imageFile,
				};
				console.log( msg );

				await MyTeamAPI.modifyMyTeamsProfile(msg);
				this.$emit('modal-close', false);
			},
		},
	};
</script>

<style lang="scss" scoped></style>
