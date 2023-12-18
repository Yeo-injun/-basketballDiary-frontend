<template>
    <v-textarea
        :label="this.pLabel"
        max-width="250"
        outlined
        v-model="model"
        :rules="this.rules"
	/>
</template>

<script>
    import ValidationUtil from '@/common/util/ValidationUtil.js';

    export default {

        props : {
            pLabel : String,
            pData : String,
            pRules : Array,
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
