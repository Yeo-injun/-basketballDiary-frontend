<template>
    <v-text-field
        :label="this.pLabel"
        v-model="this.model"
        :rules="this.rules"
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
            return {
                model : ValidationUtil.isNotNull( this.pData ) ? this.pData : "",
                rules: [(value) => ValidationUtil.input.checkNotEmpty(value)],
            };
        }, 
        watch: {
            model: function( newModel ) {
                this.$emit( 'data', newModel );
            },
        },
    }

</script>

<style lang="scss" scoped></style>
