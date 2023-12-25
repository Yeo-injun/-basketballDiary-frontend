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
    
    export default {
        props : {
            pLabel : String,
            pData : String,
            pRules : Array,
        },
        data() {
            console.log( [ "FrameTextFieldInputData", this.pData ] );

            return {
                model : ValidationUtil.isNotNull( this.pData ) ? this.pData : "",
                rules: [(value) => ValidationUtil.input.checkNotEmpty(value)],
            };
        },
        methods: {
            onChangeInput( newValue ) {
                console.log( [ "FrameTextFieldInputChangeHandler", newValue ] );
                this.model = newValue;
                // TODO rules를 순회해서 검증함. rule 위반이 1건이라도 존재할 경우와 정상일 경우를 나눠 콜백을 실행  // return 타입이 string일 경우 errorMessage이므로 해당 
                // ValidationUtil.checkRules( rules, value, onCompliance, onViolation )
                for ( const rule of this.rules ) {
                    debugger;
                    const ruleResult                = rule( newValue );
                    const ruleResultType            = typeof ruleResult;
                    const hasRuleViolationMessage   = ruleResultType == "string";
                    if ( hasRuleViolationMessage ) {
                        this.$emit( 'violation', newValue );
                        return;
                    }
                }
                this.$emit( 'data', newValue );
            },
        }
    }

</script>

<style lang="scss" scoped></style>
