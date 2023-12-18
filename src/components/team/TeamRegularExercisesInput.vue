<template>
    <v-data-table
        :headers="headers"
        :items="teamRegularExercises"
        hide-default-footer
    >
        <template v-slot:top>
            <v-toolbar flat>
                <v-toolbar-title>정기운동시간</v-toolbar-title>
                <v-divider class="mx-4" inset vertical />
                <v-btn
                    @click="createExerciseTime()"
                    small
                    color="primary"
                    ><v-icon>mdi-plus</v-icon></v-btn
                >
            </v-toolbar>
        </template>

        <template v-slot:item="{ item, index }">
            <tr :data-id="index">
                <td><v-autocomplete :items="days" v-model="item.dayOfTheWeekCode" /></td>
                <td><v-autocomplete :items="times" v-model="item.startTime" /></td>
                <td><v-autocomplete :items="times" v-model="item.endTime" /></td>
                <td><v-text-field v-model="item.exercisePlaceAddress" /></td>
                <td><TeamExercisePlaceAddressInput v-model="item.exercisePlaceName" /></td>
                <td>
                    <v-btn
                        @click="deleteExerciseTime(index)"
                        color="red"
                        outlined
                        small
                        ><v-icon>mdi-minus</v-icon></v-btn
                    >
                </td>
            </tr>
        </template>
    </v-data-table>
</template>

<script>
import TeamExercisePlaceAddressInput from '@/components/input/AddressInput.vue';

	import DateUtil from '@/common/DateUtil.js';


	export default {
		components: {
            TeamExercisePlaceAddressInput,
		},
		props: {
			pData: Array,
		},
		data() {
			const hasPropsData = this.pData.length > 0;
			return {
				teamRegularExercises: hasPropsData ? this.pData : [{}],
				/*---------------------------
				 * 컴포넌트 메타 데이터 
				 *---------------------------*/
				days: DateUtil.TheWeek.getDayOptions(),
				times: DateUtil.Times.getOptions(),
				headers: [
					{ text: '요일'    , value: 'dayOfTheWeekCode'     , width: '10%',   },
					{ text: '시작시간', value: 'startTime'            , sorted : false , width: '10%',    },
					{ text: '종료시간', value: 'endTime'              , sorted : false , width: '10%' },
					{ text: '경기장'  , value: 'exercisePlaceName'    , sorted : false , },
					{ text: '주소'    , value: 'exercisePlaceAddress' , sorted : false , width: '30%', },
                    { text: '삭제'    , align: 'center' },
				],
			};
		},
		/**-------------------------------------------------
		 * Vue 인스턴스의 watch속성 : 인스턴스내 객체 데이터의 변경을 감지한다.
		 * - input의 속성이 변경될때마다 상위 컴포넌트로 데이터 전달 ( $emit 사용 )
		 **-------------------------------------------------*/
		watch: {
			teamRegularExercises: {
				deep: true,
				handler: function (newData) {
					this.$emit('data', newData);
				},
			},
		},
		methods: {
			addressAPI(idx) {
				new window.daum.Postcode({
					oncomplete: (data) => {
						this.teamRegularExercises[idx].exercisePlaceAddress = data.address;
					},
				}).open();
			},
			createExerciseTime() {
				this.teamRegularExercises.push({});
			},
			deleteExerciseTime(idx) {
				const isRemainOneExercise = this.teamRegularExercises.length == 1;
				if (isRemainOneExercise) {
					alert('삭제할 수 있는 정기 운동시간이 없습니다.');
					return;
				}
				this.teamRegularExercises.splice(idx, 1);
			},
		},
	};
</script>

<style lang="scss" scoped></style>
