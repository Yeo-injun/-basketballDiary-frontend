<template>
	<v-container>
		<v-form ref="form" lazy-validation>
			<v-row>
				<v-col cols="2" align-self="center">
					<v-input>팀명</v-input>
				</v-col>
				<v-col cols="4">
					<v-text-field :rules="rules" v-model="teamInfo.teamName" />
				</v-col>
			</v-row>
			<v-row>
				<v-col cols="2">
					<v-input>연고지</v-input>
				</v-col>
				<v-col cols="4">
					<v-input append-icon="mdi-pencil" @click:append="hometownAPI()">
						{{ teamInfo.hometown }}
					</v-input>
				</v-col>
			</v-row>
			<v-row>
				<v-col cols="2">
					<v-input>창단일</v-input>
				</v-col>
				<v-col cols="4">
					<CustomDatePickerComp
						:p-init-value="teamInfo.foundationYmd"
						@pickup-date="setFoundationYmd"
					/>
				</v-col>
			</v-row>
			<v-row>
				<v-data-table
					:headers="headers"
					:items="teamInfo.teamRegularExercises"
					hide-default-footer
				>
					<template v-slot:top>
						<v-toolbar flat>
							<v-toolbar-title><v-input>정기운동시간</v-input></v-toolbar-title>
							<v-divider class="mx-4" inset vertical />
							<v-spacer />
							<v-btn
								@click="createExerciseTime()"
								fab
								dark
								small
								color="primary"
								><v-icon dark>mdi-plus</v-icon></v-btn
							>
						</v-toolbar>
					</template>

					<template v-slot:item="{ item, index }">
						<tr :data-id="index">
							<td>
								<v-autocomplete
									:items="days"
									dense
									v-model="item.dayOfTheWeekCode"
								/>
							</td>
							<td>
								<v-autocomplete :items="times" dense v-model="item.startTime" />
							</td>
							<td>
								<v-autocomplete :items="times" dense v-model="item.endTime" />
							</td>
							<td>
								<v-text-field disabled v-model="item.exercisePlaceAddress" />
							</td>
							<td>
								<v-btn
									@click="addressAPI(index)"
									color="secondary"
									x-small
									fab
									dark
									><v-icon>mdi-pencil</v-icon></v-btn
								>
							</td>
							<td><v-text-field v-model="item.exercisePlaceName" /></td>
							<td>
								<v-btn
									@click="deleteExerciseTime(index)"
									color="secondary"
									x-small
									dark
									fab
									><v-icon>mdi-delete</v-icon></v-btn
								>
							</td>
						</tr>
					</template>
				</v-data-table>
			</v-row>
			<v-row>
				<v-col cols="4">
					<v-file-input
						show-size
						label="팀사진"
						accept="image/*"
						@change="setImageFile"
					/>
					<MyTeamImage
						:pImageUrl="this.pTeamInfo.logoImageUrl"
						:pMaxHeight="String(200)"
						:pMaxWidth="String(200)"
					/>
				</v-col>
				<v-col cols="8">
					<v-textarea
						label="팀 소개"
						max-width="250"
						outlined
						v-model="teamInfo.introduction"
					></v-textarea>
				</v-col>
			</v-row>
		</v-form>
	</v-container>
</template>

<script>
	import MyTeamImage from '@/components/image/FrameImageComp.vue';
	import CustomDatePickerComp from '@/components/common/CustomDatePickerComp.vue';
	import DateUtil from '@/common/DateUtil.js';

	export default {
		components: {
			MyTeamImage,
			CustomDatePickerComp,
		},
		data() {
			return {
				teamInfo: {
					teamName: '',
					hometown: '',
					foundationYmd: '',
					introduction: '',
					teamLogoImage: null,
					teamRegularExercises: [{}],
				},
				rules: [
					(str) => !!str || '필수 입력사항입니다.',
					(str) => (str && str.length >= 2) || '2자 이상 입력해야합니다.',
				],
				days: DateUtil.TheWeek.getDayOptions(),
				times: DateUtil.Times.getOptions(),
				headers: [
					{
						text: '요일',
						value: 'dayOfTheWeekCode',
						sortable: false,
						width: '10%',
						align: 'start',
					},
					{
						text: '시작시간',
						value: 'startTime',
						sortable: false,
						width: '10%',
					},
					{ text: '종료시간', value: 'endTime', sortable: false, width: '10%' },
					{
						text: '주소',
						value: 'exercisePlaceAddress',
						sortable: false,
						width: '30%',
					},
					{ text: '' },
					{ text: '경기장', value: 'exercisePlaceName', sortable: false },
					{ text: '삭제', align: 'center' },
				],
			};
		},
		/** teamInfo가 변경될때마다 $emit으로 이벤트를 발생시켜서 상위 컴포넌트로 teamInfo데이터 전달
		 *  $emit으로 데이터를 전달하고자 할때는 'e-보내고자하는 데이터명'. ex. e-team-info
		 *  참고자료 : https://codingcoding.tistory.com/337
		 */
		watch: {
			teamInfo: {
				deep: true,
				handler: function (newTeamInfo) {
					// rule기반으로 유효성 체크해서 데이터가 유효할 경우에만 넘기기
					// 참고자료 : https://minu0807.tistory.com/82
					const isValid = this.$refs.form.validate();
					if (isValid) {
						this.$emit('e-team-info', newTeamInfo);
					}
				},
			},
		},
		props: {
			pTeamInfo: Object,
		},
		methods: {
			setFoundationYmd(ymd) {
				this.teamInfo.foundationYmd = DateUtil.Format.toString(ymd);
			},
			addressAPI(idx) {
				new window.daum.Postcode({
					oncomplete: (data) => {
						this.teamInfo.teamRegularExercises[idx].exercisePlaceAddress =
							data.address;
					},
				}).open();
			},
			hometownAPI() {
				new window.daum.Postcode({
					oncomplete: (data) => {
						console.log(data);
						this.teamInfo.hometown = data.address;
						this.teamInfo.sidoCode = data.sigunguCode.substr(0, 2);
						this.teamInfo.sigunguCode = data.sigunguCode;
					},
				}).open();
			},
			createExerciseTime() {
				this.teamInfo.teamRegularExercises.push({});
			},
			deleteExerciseTime(idx) {
				const isRemainOneExercise =
					this.teamInfo.teamRegularExercises.length == 1;
				if (isRemainOneExercise) {
					alert('정기 운동시간 입력란을 삭제할 수 없습니다.');
					return;
				}
				this.teamInfo.teamRegularExercises.splice(idx, 1);
			},
			setImageFile(imageFile) {
				console.log(imageFile);
				this.teamInfo.teamLogoImage = imageFile;
				this.$emit('e-team-info', this.teamInfo);
			},
		},
		mounted() {
			if (this.pTeamInfo != null) {
				this.teamInfo = this.pTeamInfo;
			}
		},
	};
</script>

<style lang="scss" scoped></style>
