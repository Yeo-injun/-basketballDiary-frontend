<template>
	<v-card>
		<v-card-title>농구팀 검색</v-card-title>
		<v-card-subtitle>
			<v-text-field label="팀명" v-model="searchCond.teamName" />
			<v-row>
				<v-col>
					<!-- 정기운동 : 요일 -->
					<v-row>
						<v-col>
							<v-card-title> 정기운동요일 </v-card-title>
						</v-col>
						<v-col>
							<v-select
								v-model="searchCond.startDay"
								:items="daysOfTheWeek"
								item-text="text"
								item-value="value"
								label="시작요일"
							></v-select>
						</v-col>
						<v-col>
							<v-select
								v-model="searchCond.endDay"
								:items="daysOfTheWeek"
								item-text="text"
								item-value="value"
								label="끝요일"
							></v-select>
						</v-col>
					</v-row>
				</v-col>
				<v-col>
					<!-- 정기운동 : 시간 -->
					<v-row>
						<v-col>
							<v-card-title> 정기운동시간 </v-card-title>
						</v-col>
						<v-col>
							<v-select
								v-model="searchCond.startTime"
								:items="times"
								item-text="text"
								item-value="value"
								label="시작시간"
							></v-select>
						</v-col>
						<v-col>
							<v-select
								v-model="searchCond.endTime"
								:items="times"
								item-text="text"
								item-value="value"
								label="끝시간"
							></v-select>
						</v-col>
					</v-row>
				</v-col>
			</v-row>

			<v-row justify="end">
				<TeamSearchBtn @do-search="onSearchClick" />
			</v-row>
		</v-card-subtitle>
	</v-card>
</template>

<script>
	import TeamSearchBtn from '@/components/button/FrameSearchBtn.vue';
	import DateUtil from '@/common/DateUtil.js';

	export default {
		components: {
			TeamSearchBtn,
		},
		data() {
			return {
				daysOfTheWeek: DateUtil.TheWeek.getDayOptions(),
				times: DateUtil.Times.getOptions(),
				searchCond: {
					teamName: '',
					startDay: null,
					endDay: null,
					startTime: null,
					endTime: null,
				},
			};
		},
		watch: {
			searchCond: {
				handler: function (newValue, oldValue) {
					// TODO 일자와 시간 범위의 유효성 체크
					// 유효성 체크별 메세지 처리 >> 이전 값으로 되돌리기
					// if (!(this.isValidDay() && this.isValidTime())) {
					// 	return alert('입력값이 유효하지 않습니다. TODO 임시 메세지 처리');
					// }
					console.log(['newVal', newValue]);
					console.log(['oldVal', oldValue]);
					this.$emit('on-cond-change', this.searchCond);
				},
				deep: true,
			},
		},
		methods: {
			isValidDay() {
				const startDay = Number(this.startDay);
				const endDay = Number(this.endDay);
				if (isFasterStartThanEnd(startDay, endDay)) {
					return true;
				}
				alert('끝요일은 시작요일보다 빠를 수 없습니다.');
				return false;
			},
			isValidTime() {
				const startTime = Number(this.startTime.replace(':', ''));
				const endTime = Number(this.endTime.replace(':', ''));
				if (isFasterStartThanEnd(startTime, endTime)) {
					return true;
				}
				alert('끝시간은 시작시간보다 빠를 수 없습니다.');
				return false;
			},
			onSearchClick() {
				this.$emit('on-search');
			},
		},
	};

	function isFasterStartThanEnd(start, end) {
		if (start == 0) {
			return true;
		}
		if (end == 0) {
			return true;
		}
		const isFasterStart = start - end <= 0;
		if (isFasterStart) {
			return true;
		}
		return false;
	}
</script>

<style lang="scss" scoped></style>
