export default {
    toKBs( bytes ) {
        return Decimals.round( bytes / UNIT_BYTES );
    },
    toMBs( bytes ) {
        return Decimals.round( this.toKBs( bytes ) / UNIT_BYTES );
    },
    toGBs( bytes ) {
        return Decimals.round( this.toMBs( bytes ) / UNIT_BYTES );
    },
    toTBs( bytes ) {
        return Decimals.round( this.toTBs( bytes ) / UNIT_BYTES );
    },
    /**
     * Byte 사이즈를 알맞은 데이터 크기의 단위로 변환
     * cf. 변환시 소수점 1번째까지 보여줌
     */
    withUnit( bytes ) {
        const unitNames = Object.values( UnitName );
        let unitIdx = 0;
        let unitSize = UNIT_BYTES;
        let dataSize = bytes;
        while( unitSize < bytes ) {
            unitIdx++;
            dataSize = dataSize / UNIT_BYTES;
            unitSize = unitSize * UNIT_BYTES;
        }
        return Decimals.round( dataSize ) + unitNames[ unitIdx ]; 
    },
}

/**
 * 소수점 처리 객체
 */
const Decimals = {
    /**
     * TODO toFixed가 반올림인지 버림인지 확인 필요
     * @param { Number } num  소수점 처리하고자 하는 숫자 
     * @param { Number } digits 보여주고자 하는 소수점자릿수
     * @return 
     */
    round( num, digits ) {
        return Number( num ).toFixed( digits ? digits : 1 );
    },
}

const UNIT_BYTES = 1024;

// 데이터 단위
const UnitName = {
    BYTE : 'Byte',
    KB : 'KB',
    MB : 'MB',
    GB : 'GB',
    TB : 'TB',
}