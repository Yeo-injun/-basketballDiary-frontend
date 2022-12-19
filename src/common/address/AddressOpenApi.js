export default {
	open(oncompleteCallback) {
		new window.daum.Postcode({
			// https://postcode.map.daum.net/guide
			oncomplete: function (data) {
				oncompleteCallback(data);
			},
		}).open();
	},
};
