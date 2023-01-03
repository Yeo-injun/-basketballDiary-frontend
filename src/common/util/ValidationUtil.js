export default {
	/** null체크 */
	isNull(val) {
		if (val == null) {
			return true;
		}

		if (val == undefined) {
			return true;
		}

		if (typeof val == 'string' && val == '') {
			return true;
		}

		if (Array.isArray(val) && val.length == 0) {
			return true;
		}
		return false;
	},
	isNotNull(val) {
		return !this.isNull(val);
	},
};
