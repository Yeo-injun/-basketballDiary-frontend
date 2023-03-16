<template>
	<v-menu transition="scale-transition" offset-y min-width="auto">
		<!-- TODO 위치 잡기 -->
		<!-- 제어 영역 -->
		<template v-slot:activator="{ on, attrs }">
			<v-text-field
				v-on="on"
				v-bind="attrs"
				v-model="selectedDate"
				:label="pLabelName"
				width="290px"
				prepend-icon="mdi-calendar"
				readonly
			/>
			<!-- Vue HTML속성에 js변수에 담긴 값 할당하는 방법 : directive사용!! 
                https://medium.com/@hozacho/%EB%A7%A8%EB%95%85%EC%97%90-vuejs-003-vuejs-directive-v-bind-a4844574e6ae -->
		</template>

		<!-- 활성화영역 -->
		<v-date-picker v-model="selectedDate" no-title scrollable locale="ko-kr" />
	</v-menu>
</template>

<script>
	import ValidationUtil from '@/common/util/ValidationUtil.js';
	import DateUtil from '@/common/DateUtil.js';

	/** 사용방법
	 * 1. 상위 컴포넌트에 CustomDatePicker컴포넌트를 import시키고, 상위 컴포넌트의 vue인스턴스에 컨포넌트로 등록한다.
	 * 2. 상위 컴포넌트의 HTML작성영역에 CustomDatePicker컴포넌트를 작성한다.
	 * 3. CustomDatePicker에서 선택한 날짜를 상위 컴포넌트에서 받을 수 있도록 v-on을 이용해서 CustomDatePicker컴포넌트에서 발생한 이벤트를 매핑시켜준다.
	 * 4. CustomDatePicker의 라벨(label)이름을 상위컴포넌트에서 제어할 수 있도록 v-bind속성을 활용하여 props로 데이터를 내려준다.
	 */
	export default {
		data() {
			return {
				selectedDate: this.setInitDateValue(this.pInitValue),
			};
		},
		watch: {
			selectedDate: function (newDate) {
				this.closeDatePicker(newDate);
			},
		},
		props: {
			pLabelName: String,
			pInitValue: String,
		},
		methods: {
			closeDatePicker(pickupedDate) {
				this.$emit('pickup-date', DateUtil.Format.toString(pickupedDate));
			},
			setInitDateValue(initValue) {
				if (ValidationUtil.isNull(initValue)) {
					return '';
				}
				// TODO Date타입일 경우에도 처리해줘야 함.
				return DateUtil.Format.toYmd(initValue);
			},
		},
	};
</script>

<style lang="scss" scoped></style>
