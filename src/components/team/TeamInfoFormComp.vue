<template>
	<v-container>
		<v-form v-if="dataInit" ref="form">
			<v-row>
				<v-col cols="7">
					<v-row>
						<TeamNameInput pLabel="팀명"
							:pData="this.teamInfo.teamName"
							:pRequired="true"
							@compliance="onComplianceTeamName"
						/>
						<FoundationDatePickerInput pLabel="창단일"
							:pData="teamInfo.foundationYmd"
							:pRequired="true"
							@compliance="onComplianceFoundationYmd"
						/>
					</v-row>
					<v-row>
						<HomeTownAddressInput pLabel="연고지"
							:pData="{ 
								address : teamInfo.hometown,
							 	sidoCode : teamInfo.sidoCode,
								sigunguCode : teamInfo.sigunguCode,
							}"
							:pRequired="true"
							@compliance="onComplianceTeamAddressInfo"
						/>
					</v-row>
				</v-col>
				<v-col cols="5">
					<TeamLogoImage
						:pImageUrl="pTeamLogoImagePath"
						:pMaxHeight="String(250)"
						:pMaxWidth="String(250)"
					/>
					<TeamLogoImageInput pLabel="팀 로고 사진"
						@exceed-max-size="handleImageFileInputEvent"
						@clear-input="handleImageFileInputEvent"
						@select-valid-image="handleImageFileInputEvent"
					/>
				</v-col>
			</v-row>
			<v-row>
				<TeamIntroductionInput pLabel="팀 소개글을 작성해주세요."
					ref="teamIntroductionInput"
					:pData="teamInfo.introduction"
					:pRequired="true"
					@compliance="onComplianceTeamIntroduction"
				/>
			</v-row>

			<v-row>
				<TeamRegularExercisesInput
					v-model="teamRegularExercises"
					@create-row="addExerciseTime"
					@delete-row="deleteExerciseTime"
				/>
			</v-row>
		</v-form>
	</v-container>
</template>

<script>
	import TeamNameInput from '@/components/input/FrameTextFieldInput.vue';
	import HomeTownAddressInput from '@/components/input/AddressInput.vue';
	import FoundationDatePickerInput from '@/components/input/DatePickerInput.vue';

	import TeamLogoImage from '@/components/image/FrameImageComp.vue';
	import TeamLogoImageInput from '@/components/input/FrameImageInput.vue';

	import TeamIntroductionInput from '@/components/input/FrameTextAreaInput.vue';
	import TeamRegularExercisesInput from '@/components/team/TeamRegularExercisesInput.vue';

	import ValidationUtil from '@/common/util/ValidationUtil.js';

	export default {
		components: {
			TeamNameInput,
			HomeTownAddressInput,
			FoundationDatePickerInput,
			TeamLogoImage,
			TeamLogoImageInput,
			TeamIntroductionInput,
			TeamRegularExercisesInput,
		},
		mounted() {
			// 화면 초기화에 사용할 데이터를 props로 받을 경우 data에 세팅 ( 팀정보 수정인 경우에 해당 )
			if (ValidationUtil.isNull(this.pTeamInfo)) {
				this.dataInit = true;	// init할 데이터가 없어도 데이터 초기화 단계가 완료된 상태로 바꿔줘야 함.
				return;
			}
			this.teamInfo = this.pTeamInfo;
			this.teamLogoImage = this.pTeamLogoImagePath;
			if (ValidationUtil.isNotNull(this.pTeamRegularExercises)) {
				this.teamRegularExercises = this.pTeamRegularExercises;
			}
			this.dataInit = true;
		},
		data() {
			return {
				/*---------------------------
				 * 컴포넌트 데이터 init 상태 
				 *---------------------------*/
				dataInit: false,
				/*---------------------------
				 * input 데이터 속성 
				 *---------------------------*/
				teamInfo: {
					teamName: '',
					hometown: '',
					sidoCode: '',
					sigunguCode : '',
					foundationYmd: '',
					introduction: '',
				},
				teamRegularExercises: [ this.createExerciseTime() ],
				teamLogoImageFile: null,
			}
		},
		props: {
			pTeamInfo: Object,
			pTeamLogoImagePath: String,
			pTeamRegularExercises: Array,
		},
		methods: {
			/**
			 * Form내 input컴포넌트의 유효성을 체크한다.
			 * @return Boolean  
			 */
			validate() {
				return this.$refs.form.validate();
			},
			/**
			 * Form컴포넌트 내부에 존재하는 사용자 input 값을 
			 * data속성으로 관리하지 않기.
			 * 
			 * data 속성으로 관리하는 데이터는 각 input컴포넌트에서 관리하고
			 * 필요할 때 해당 input컴포넌트에서 가져와서 return하기. 
			 * 
			 * 각 input마다 refs를 달아서 직접 input의 value 값 가져오는 방식 검토...
			 */
			getForm() {
				console.log( this.$refs.teamIntroductionInput.getValue() );
				// TODO 개선방향
				// input에 존재하는 값을 직접 참조하는 방법을 활용... Vue컴포넌트에 변수로 관리하지 않기
				return {
					teamInfo: this.teamInfo,
					teamRegularExercises: this.teamRegularExercises,
					teamLogoImageFile: this.teamLogoImageFile,
				}
			},
			/** 팀정보 */
			onComplianceTeamName( e ) {
				this.teamInfo.teamName = e.data;
			},
			onComplianceTeamAddressInfo( data ) {
				this.teamInfo.hometown = data.address;
				this.teamInfo.sidoCode = data.sidoCode;
				this.teamInfo.sigunguCode = data.sigunguCode;
			},
			onComplianceFoundationYmd( e ) {
				this.teamInfo.foundationYmd = e.data;
			},
			onComplianceTeamIntroduction( e ) {
				this.teamInfo.introduction = e.data;
			},
			/** 팀로고 이미지 */
			handleImageFileInputEvent( event ) {
				this.teamLogoImageFile = event.imageFile;
			},
			/** 팀정기운동 목록 */
			createExerciseTime() {
				return {
					dayOfTheWeekCode		: "",
					startTime				: "",
					endTime					: "",
					exercisePlaceName		: "",
					exercisePlaceAddress	: "",
					sidoCode				: "",
					sigunguCode				: "",
				};
			},
			addExerciseTime() {
				this.teamRegularExercises.push( this.createExerciseTime() );
			},
			deleteExerciseTime( deleteRowIndex ) {
				console.log( ['deleteExerciseTime', deleteRowIndex ]);
				this.teamRegularExercises.splice( deleteRowIndex, 1 );
			},

		},
	};
</script>

<style lang="scss" scoped></style>
