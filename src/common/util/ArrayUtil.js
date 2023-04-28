import ValidationUtil from '@/common/util/ValidationUtil.js';

export default {
	findItemById(arr, popertyName, propertyVal) {
		checkValidArrayType(arr);
		for (const item of arr) {
			if (isSameObjItem(item, popertyName, propertyVal)) {
				return item;
			}
		}
		return null;
	},
	deleteItemById(arr, targetItem, propertyName) {
		checkValidArrayType(arr);

		return arr.filter(
			(item) => !(item[propertyName] === targetItem[propertyName])
		);
	},
	hasItem(targetArr, popertyName, propertyVal) {
		if (
			ValidationUtil.isNotNull(
				this.findItemById(targetArr, popertyName, propertyVal)
			)
		) {
			return true;
		}
		return false;
	},
};

function checkValidArrayType(arr) {
	if (!Array.isArray(arr)) {
		throw new Error(`파라미터의 타입이 배열이 아닙니다.`);
	}
	return true;
}

function isSameObjItem(targetObj, popertyName, propertyVal) {
	if (typeof targetObj === 'object' && !Array.isArray(targetObj)) {
		return targetObj[popertyName] == propertyVal;
	}
	throw new Error(`비교할 대상이 Object가 아닙니다.`);
}
