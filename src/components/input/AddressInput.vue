<template>
    <v-text-field
        readonly
        :label="this.pLabel"
        v-model="this.addressInfo.address"
        :rules="this.rules"
        prepend-icon="mdi-map-marker"
        @click="searchAddress"
    />
</template>

<script>
	import ValidationUtil from '@/common/util/ValidationUtil';

    export default {
        props : {
            pLabel      : String    ,   // input의 Label명칭
            pData       : Object    ,   // input의 초기화 데이터
            pRules      : Array     ,   // input 입력값의 정책 ( 필수여부 지정은 pRequired로 지정 )
            pRequired   : Boolean   ,   // input 입력값의 필수여부 ( 입력 정책 추가 및 별도 표시용 )
        },
        data() {
            const defaultRules = [];
            if ( this.pRequired === true ) {
                defaultRules.push( (value) => ValidationUtil.input.checkNotEmpty(value) );
            }

            return {
                addressInfo : this.initAddress( this.pData ),
                rules       : ValidationUtil.isNotNull( this.pRules ) 
                              ? [ ...defaultRules, ...this.pRules ] : defaultRules,
            };
        },
		/**-------------------------------------------------
		 * Vue 인스턴스의 watch속성 : 인스턴스내 객체 데이터의 변경을 감지한다.
		 * - input의 속성이 변경될때마다 상위 컴포넌트로 데이터 전달 ( $emit 사용 )
		 **-------------------------------------------------*/
         watch: {
			pData : {
				deep: true,
				handler: function (newData) {
					this.addressInfo = this.initAddress( newData );
				},
			},
		},
        methods: {
            initAddress( addressInfo ) {
                return ValidationUtil.isNotNull( addressInfo ) 
                       ? addressInfo : { address : "", sidoCode : "", sigunguCode : "", }
            },
            searchAddress() {
                new window.daum.Postcode({
                    // 우편번호 검색결과 목록 클릭시 클릭한 주소정보를 내려줌.
					oncomplete: (data) => {
						this.addressInfo.address        = data.address;
						this.addressInfo.sidoCode       = data.sigunguCode.substr(0, 2);
						this.addressInfo.sigunguCode    = data.sigunguCode;
                        
                        // 검색 결과를 클릭하면 무조건 정상데이터만 emit됨
                        this.$emit( 'compliance', this.addressInfo );
					},
				}).open();
            },
        }
    }

</script>

<style lang="scss" scoped></style>
