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
            console.log( "FrameTextFieldInput", this.pRules[0] );
            const defaultRules = [];
            if ( this.pRequired === true ) {
                defaultRules.push( (value) => ValidationUtil.input.checkNotEmpty(value) );
            }
            return {
                model : ValidationUtil.isNotNull( this.pData ) ? this.pData : "",
                rules : this.pRules.length > 0 
                        ? [ ...defaultRules, ...this.pRules ] : defaultRules,
            };
        },
        methods: {
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
