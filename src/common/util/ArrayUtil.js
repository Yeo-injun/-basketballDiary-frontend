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
	deleteItemById( arr, deleteItem, idPropName ) {
		checkValidArrayType(arr);

		return arr.filter(
			(item) => !isSameObjByPropComparison( deleteItem, item, idPropName )
		);
	},
	/**
	 * 객체 배열내에서 속성값이 일치하는 것을 삭제하는 메소드 
	 * @param {*} arr 
	 * @param {String} propName 삭제할때 비교할 속성명
	 * @param {String} propValue 삭제될 값
	 */
	deleteItem( arr, propName, propValue ) {
		checkValidArrayType(arr);
		return arr.filter(
			( item ) => item[ propName ] != propValue
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
