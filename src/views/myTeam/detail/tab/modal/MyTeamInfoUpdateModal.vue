<template>
	<v-dialog v-model="isActivate" width="1200">
		<v-card>
			<v-card-title class="text-h5 grey lighten-2"> 팀정보 </v-card-title>

			<v-card-text>
				<TeamInfoFormComp
					ref="teamInfoUpdateForm"
					v-if="this.dataInit"
					:pTeamInfo="teamInfo"
					:pTeamLogoImagePath="this.teamLogoImagePath"
					:pTeamRegularExercises="this.teamRegularExercises"
					@change-team-info="setTeamInfo"
					@change-team-exercises="setTeamExercises"
					@change-team-logo-image="setTeamLogoImageFile"
				/>
			</v-card-text>

			<TeamInfoUpdateBtn @do-update="modifyTeamInfo" pBtnName="수정" />
			<TeamInfoUpdateModalCloseBtn
				@do-close="isActivate = false"
				pBtnName="닫기"
			/>
		</v-card>
	</v-dialog>
</template>

<script>
	import TeamInfoFormComp from '@/components/team/TeamInfoFormComp.vue';
	import TeamInfoUpdateBtn from '@/components/button/FrameUpdateBtn.vue';
	import TeamInfoUpdateModalCloseBtn from '@/components/button/FrameCloseBtn.vue';
	import MyTeamAPI from '@/api/MyTeamAPI';

	export default {
		components: {
			TeamInfoFormComp,
			TeamInfoUpdateBtn,
			TeamInfoUpdateModalCloseBtn,
		},
		props: {
			value: {
				type: Boolean,
				required: true,
			},
			pTeamSeq: {
				type: Number,
				required: true,
			},
		},
		computed: {
			isActivate: {
				get() {
					return this.value;
				},
				set(value) {
					this.$emit('input', value);
				},
			},
		},
		data() {
			return {
				/*-----------------------
				 * 데이터 초기화 완료여부
				 *-----------------------*/
				dataInit: false,
				/*-----------------------
				 * API 메세지 데이터
				 *-----------------------*/
				teamInfo: {},
				teamRegularExercises: [],
				teamLogoImageFile: null,
				teamLogoImagePath: '',
			};
		},
		methods: {
			setTeamInfo( emitData ) {
				this.teamInfo = emitData.data;
			},
			setTeamExercises(teamExercises) {
				this.teamRegularExercises = teamExercises;
			},
			setTeamLogoImageFile( emitData ) {
				this.teamLogoImageFile 		= emitData.data;
			},
			async getTeamInfo() {
				const data = await MyTeamAPI.getTeamInfo(this.pTeamSeq);
				this.teamInfo = {
					teamSeq: data.teamSeq,
					teamName: data.teamName,
					foundationYmd: data.foundationYmd,
					hometown: data.hometown,
					sidoCode: data.sidoCode,
					sigunguCode: data.sigunguCode,
					introduction: data.introduction,
				};
				this.teamLogoImagePath = data.teamLogoImagePath;
				this.teamRegularExercises = data.regularExercises;
			},
			async modifyTeamInfo() {
				if ( !this.$refs.teamInfoUpdateForm.validate() ) {
					return;
				}

				await MyTeamAPI.modifyMyTeamInfo(
					this.pTeamSeq,
					{
						teamName: this.teamInfo.teamName,
						hometown: this.teamInfo.hometown,
						introduction: this.teamInfo.introduction,
						foundationYmd: this.teamInfo.foundationYmd,
						sidoCode: this.teamInfo.sidoCode,
						sigunguCode: this.teamInfo.sigunguCode,
						teamRegularExercises: this.teamRegularExercises,
					},
					this.teamLogoImageFile
				);
				this.isActivate = false;
			},
		},
		watch: {
			/**
			 * Modal 활성화시 API를 동기처리하여 dataInit 상태를 제어
			 * 이를 통해 하위 컴포넌트가 create되지 않도록 제어
			 * cf. 해당 컴포넌트가 다른 컴포넌트의 자식컴포넌트가 되면 mounted는 한번만 호출됨.
			 *      Modal을 활성화할때마다 데이터를 새로 받아오기 위해서는 mounted가 아니라 Modal의 활성화상태를 감지하여 API통신해야 함.
			 **/
			isActivate: async function (isDialogOpend) {
				if (isDialogOpend) {
					await this.getTeamInfo();
					this.dataInit = true;
					return;
				}
				this.dataInit = false;
			},
		},
	};
</script>

<style lang="scss" scoped></style>
