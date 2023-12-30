<template>
    <v-text-field
        readonly
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
                addressInfo : ValidationUtil.isNotNull( this.pData ) 
                              ? this.pData : { address : "", sidoCode : "", sigunguCode : "", },
                rules : this.pRules.length > 0 
                        ? [ ...defaultRules, ...this.pRules ] : defaultRules,
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
                        this.$emit( 'compliance', this.addressInfo );
					},
				}).open();
            },
        }
    }

</script>

<style lang="scss" scoped></style>
