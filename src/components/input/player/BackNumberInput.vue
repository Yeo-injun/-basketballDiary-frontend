<template>
    <FrameTextFieldInput pLabel="등번호"
        ref="backNumberInput"
        :pData="this.pData"
        :pRules="this.rules"
        :pRequired="this.pRequired"
        @violation="this.onViolationEvent"
	/>
</template>

<script>
    /** Backend API */
    /** Code */
    /** Utils */
    import InputRule from '@/common/input/InputRule.js';

    /** Components */
    import FrameTextFieldInput from '@/components/input/FrameTextFieldInput.vue';
    /** Emit Event */
    
    export default {
        components : {
            FrameTextFieldInput,
        },
        props : {
            pData       : String    ,   // input의 초기화 데이터
            pRequired   : Boolean   ,   // input 입력값의 필수여부 ( 입력 정책 추가 및 별도 표시용 )
        },
        data() {
            return {
                rules       : InputRule.backNumber,
            };
        },
        methods: {
            getValue() {
                return this.$refs.backNumberInput.getValue();
            },
            onViolationEvent( e ) {
                this.$emit( 'violation', e );
            },
        }
    }

</script>

<style lang="scss" scoped></style>
