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
            pRules : Array,
            pData : String,
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
                this.$emit( 'data', newValue );
            },
        }
    }

</script>

<style lang="scss" scoped></style>
