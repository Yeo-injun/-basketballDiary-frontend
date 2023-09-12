<!-- TODO 삭제 예정 디렉토리 대체 -->
<template>
	<v-dialog :value="dialog" @input="dialog = $event" width="1200">
		<v-card>
			<v-card-title class="text-h5 grey lighten-2"> 프로필 수정 </v-card-title>

			<v-card-text>
				<v-container>
					<v-text-field label="등번호" v-model="backNumber" />
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
	import MyTeamProfileUpdateBtn from '@/components/button/FrameUpdateBtn.vue';
	import MyTeamApi from '@/api/MyTeamAPI';

	export default {
		components: {
			MyTeamProfileUpdateBtn,
		},
		data() {
			return {
				backNumber: '',
				image: '',
			};
		},
		props: {
			pTeamSeq: {
				type: Number,
				required: true,
			},
			// TODO isActivated로 대체 예정
			value: {
				type: Boolean,
				required: true,
			},
		},
		computed: {
			dialog: {
				get() {
					return this.value;
				},
				set(value) {
					this.$emit('input', value);
				},
			},
		},
		methods: {
			async load() {
				const { data } = await MyTeamApi.findMyTeamsProfile(this.pTeamSeq);
				this.backNumber = data.backNumber;
				this.image = data.image;
			},
			selectImage(image) {
				this.image = image;
			},
			async updateProfile() {
				const msg = {
					teamSeq: this.pTeamSeq,
					backNumber: this.backNumber,
					imageFile: this.image,
				};

				await MyTeamApi.modifyMyTeamsProfile(msg);
			},
		},
		mounted() {
			this.load();
		},
	};
</script>

<style lang="scss" scoped></style>
