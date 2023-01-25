export default {
	/** null체크 */
	isNull(val) {
		if (
			val == null ||
			val == undefined ||
			(typeof val == 'string' && val == '') ||
			(Array.isArray(val) && val.length == 0)
		) {
			return true;
		}
		return false;
	},
	isNotNull(val) {
		return !this.isNull(val);
	},
	ifNullToEmptyString(val) {
		if (this.isNull(val)) {
			return '';
		}
		return val;
	},
};
