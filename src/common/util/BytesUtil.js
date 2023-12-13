export default {
    toKBs( bytes ) {
        return bytes / UNIT_BYTES;
    },
    toMBs( bytes ) {
        return this.toKBs( bytes ) / UNIT_BYTES;
    },
    toGBs( bytes ) {
        return this.toMBs( bytes ) / UNIT_BYTES;
    },
    toTBs( bytes ) {
        return this.toTBs( bytes ) / UNIT_BYTES;
    },
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
        return dataSize + unitNames[ unitIdx ]; 
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