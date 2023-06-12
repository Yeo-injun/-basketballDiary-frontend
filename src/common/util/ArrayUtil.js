import ValidationUtil from '@/common/util/ValidationUtil.js';

export default {
	findItemById(arr, targetItem, prop) {
		checkValidArrayType(arr);
		for (const item of arr) {
			if (isSameObjByPropComparison(targetItem, item, prop)) {
				return item;
			}
		}
		return null;
	},
	deleteItemById(arr, targetItem, prop) {
		checkValidArrayType(arr);

		return arr.filter(
			(item) => !isSameObjByPropComparison(targetItem, item, prop)
		);
	},
	hasItem(arr, targetItem, prop) {
		checkValidArrayType(arr);

		if (ValidationUtil.isNotNull(this.findItemById(arr, targetItem, prop))) {
			return true;
		}
		return false;
	},
	convertObjectToArray(srcObj) {
		const targetArr = [];
		const props = Object.keys(srcObj);
		props.forEach(function (prop) {
			targetArr.push(srcObj[prop]);
		});
		return targetArr;
	},
};

function checkValidArrayType(arr) {
	if (!Array.isArray(arr)) {
		throw new Error(`파라미터의 타입이 배열이 아닙니다.`);
	}
	return true;
}

/** 속성비교를 통해 객체 일치여부 확인 */
function isSameObjByPropComparison(trgObj, srcObj, prop) {
	if (!isTypeObject(trgObj)) {
		throw new Error(`비교할 대상은 Object 타입이어야 합니다.`);
	}

	if (!isTypeObject(srcObj)) {
		throw new Error(`비교할 원천은 Object 타입이어야 합니다.`);
	}

	return trgObj[prop] == srcObj[prop];
}

function isTypeObject(obj) {
	return typeof obj === 'object' && !Array.isArray(obj);
}
