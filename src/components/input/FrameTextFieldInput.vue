<template>
    <v-text-field
        :label="this.pLabel"
        :rules="this.rules"
        :value="this.model"
        @input="onChangeInput"
	/>
</template>

<script>
	import ValidationUtil from '@/common/util/ValidationUtil';
    import InputRuleChecker from '@/common/input/InputRuleChecker';
    
    export default {
        props : {
            pLabel      : String    ,   // input의 Label명칭
            pData       : String    ,   // input의 초기화 데이터
            pRules      : Array     ,   // input 입력값의 정책 ( 필수여부 지정은 pRequired로 지정 )
            pRequired   : Boolean   ,   // input 입력값의 필수여부 ( 입력 정책 추가 및 별도 표시용 )
        },
        data() {
            const defaultRules = [];
            if ( this.pRequired === true ) {
                defaultRules.push( (value) => ValidationUtil.input.checkNotEmpty(value) );
            }
            return {
                model : ValidationUtil.isNotNull( this.pData ) ? this.pData : "",
                rules : ValidationUtil.isNotNull( this.pRules ) 
                        ? [ ...defaultRules, ...this.pRules ] : defaultRules,
            };
        },
        methods: {
            // input컴포넌트의 value를 refs를 사용해서 직접 가져오기
            getValue() {
                return this.model;
            },
            // input컴포넌트의 value를 refs를 사용해서 검증하기
            checkValue() {
                return InputRuleChecker.check( this.model, this.rules );
            },
            // TODO 걷어내기
            // 값이 변경될때마다 상위 컴포넌트로 event emit시키는 구조 걷어내기
            // 상위 컴포넌트에서 refs를 활용하여 input컴포넌트의 메소드를 직접 참조 
            onChangeInput( newValue ) {
                this.model = newValue;
                const ruleResult = InputRuleChecker.check( newValue, this.rules );
                
                if ( ruleResult.isValid ) {
                    this.$emit( 'compliance', {
                        data : newValue,
                        message : "정상 입력값입니다.", 
                    } );
                    return;
                }

                this.$emit( 'violation', {
                    data : newValue,
                    message : ruleResult.message,
                } );
            },
        }
    }

</script>

<style lang="scss" scoped></style>
