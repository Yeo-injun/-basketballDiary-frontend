<template>
    <v-text-field
        :label="this.pLabel"
        v-model="this.addressInfo.address"
        :rules="this.rule"
        prepend-icon="mdi-map-marker"
        @click="searchAddress"
    />
</template>

<script>
	import ValidationUtil from '@/common/util/ValidationUtil';
    
    export default {
        props : {
            pLabel  : String,
            pData   : Object,
            pRules  : Array,
        },
        data() {
            return {
                addressInfo : ValidationUtil.isNotNull( this.pData ) 
                              ? this.pData : { address : "", sidoCode : "", sigunguCode : "", },
                rule: [(value) => ValidationUtil.input.checkNotEmpty(value)],
            };
        }, 
        methods: {
            searchAddress() {
                new window.daum.Postcode({
					oncomplete: (data) => {
						console.log(data);
						this.addressInfo.address = data.address;
						this.addressInfo.sidoCode = data.sigunguCode.substr(0, 2);
						this.addressInfo.sigunguCode = data.sigunguCode;
                        // TODO Rules 결과에 따라 emitEvent 분기 처리
                        this.$emit( 'data', this.addressInfo );
					},
				}).open();
            },
        }
    }

</script>

<style lang="scss" scoped></style>
