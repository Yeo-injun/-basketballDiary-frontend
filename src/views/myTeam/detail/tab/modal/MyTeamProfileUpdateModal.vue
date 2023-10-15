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
						<v-file-input
							show-size
							label="수정할 프로필 사진 업로드"
							accept="image/*"
							@change="setImageFile"
						/>

						<!-- TODO 입력 오류 해결 필요 -->
						<v-text-field
							label="등번호"
							v-model="backNumber"
							:rules="this.rules.backNumber"
						/>
					</v-form>
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

	/** Code/Const */

	/** Utils */
	import InputRule from '@/common/input/InputRule.js';

	/** Components */
	import MyTeamProfileImageComp from '@/components/myTeam/MyTeamProfileImageComp.vue';
	import MyTeamProfileUpdateBtn from '@/components/button/FrameUpdateBtn.vue';

	export default {
		components: {
			MyTeamProfileImageComp,
			MyTeamProfileUpdateBtn,
		},
		data() {
			return {
				/*-------------------
				 * Input 데이터
				 *-------------------*/
				backNumber: this.pBackNumber,
				imageUrl: this.pImageUrl,
				imageFile: null,
				/*-------------------
				 * Input RULE 정책
				 *-------------------*/
				rules: {
					backNumber: InputRule.backNumber,
				},
			};
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
			setImageFile(imageFile) {
				this.imageFile = imageFile;
			},
			async updateProfile() {
				if (!this.$refs.updateProfileInputs.validate()) {
					return;
				}

				const msg = {
					teamSeq: this.pTeamSeq,
					backNumber: this.backNumber,
					imageFile: this.imageFile,
				};
				// TODO 사진 파일이 없는 경우 수정 처리되도록 백엔드 수정하기
				await MyTeamAPI.modifyMyTeamsProfile(msg);
				this.$emit('modal-close', false);
			},
		},
	};
</script>

<style lang="scss" scoped></style>
