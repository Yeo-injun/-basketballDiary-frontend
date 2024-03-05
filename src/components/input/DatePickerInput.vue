<template>
	<!-- return-value.sync속성은 Modal 취소시 v-text-field의 값을 원상복구시킴 -->
	<v-dialog
		ref="dialog"
        v-model="activePicker"
        :return-value.sync="model" 
        persistent
        width="290px"
    >
        <template v-slot:activator="{ on }">
			<v-text-field
				readonly
				prepend-icon="mdi-calendar"
				v-on="on"
				:label="pLabel"
				:rules="rules"
				v-model="model"
          	/>
        </template>
        <v-date-picker locale="ko" v-model="model">
			<v-spacer/>
			<v-btn color="primary" outlined @click="activePicker = false">취소</v-btn>
			<v-btn color="primary" @click="onPickupDate">선택</v-btn>
        </v-date-picker>
    </v-dialog>
</template>

<script>
	import ValidationUtil from '@/common/util/ValidationUtil.js';
	import DateUtil from '@/common/DateUtil.js';
	import InputRuleChecker from '@/common/input/InputRuleChecker';

	export default {
		props: {
			pLabel		: String	,
			pData		: String	,
			pRequired   : Boolean   ,   // input 입력값의 필수여부 ( 입력 정책 추가 및 별도 표시용 )
		},
		data() {
			return {
				activePicker : false,
				model : ValidationUtil.isNull( this.pData ) ? '' : DateUtil.Format.toYmd( this.pData ),
				rules : this.pRequired === true ? [ (value) => ValidationUtil.input.checkNotEmpty(value) ] : [],
			};
		},
		methods: {
            // input컴포넌트의 value를 refs를 사용해서 직접 가져오기
            getValue() {
                return DateUtil.Format.toString( this.model );
            },
            // input컴포넌트의 value를 refs를 사용해서 검증하기
            checkValue() {
                return InputRuleChecker.check( this.model, this.rules );
            },
            // TODO 걷어내기 검토
            // 값이 변경될때마다 상위 컴포넌트로 event emit시키는 구조 걷어내기
            // 상위 컴포넌트에서 refs를 활용하여 input컴포넌트의 메소드를 직접 참조 
			onPickupDate() {
				this.$refs.dialog.save( this.model );	// datePicker에서 선택한 값이 최종 반영됨
				const unformattedDate = DateUtil.Format.toString( this.model );
				// 반영된 값을 상위컴포넌트로 전달하기 위해 event emit
				const ruleResult 	= InputRuleChecker.check( unformattedDate, this.rules );
                if ( ruleResult.isValid ) {
                    this.$emit( 'compliance', {
                        data 	: unformattedDate,
                        message : "정상 입력값입니다.", 
                    } );
                    return;
                }

                this.$emit( 'violation', {
                    data 	: unformattedDate,
                    message : ruleResult.message,
                } );
			},
		},
	};
</script>

<style lang="scss" scoped></style>
