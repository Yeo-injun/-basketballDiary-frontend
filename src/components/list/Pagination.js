const defaultPager = {
	pageNo			: 1,
	rowCount		: 5,
	totalPageCount	: 1,
	totalCount		: 0,
};

export default {
	// 최초 페이징 정보 세팅
	// cf. 호출위치 : Vue 컴포넌트의 data 속성 초기화시
	init( rowCount ) {
		if ( 0 < rowCount ) {
			defaultPager.rowCount = rowCount;
			return defaultPager;
		}
		return defaultPager;
	},
	// 검색 등 페이징 정보 변경시 해당 메소드로 페이징 정보 세팅 
	of( pagination ) {
		if ( pagination.totalCount < 1 ) {
			return defaultPager;
		}
		return {
			pageNo 			: pagination.pageNo,
			rowCount 		: pagination.rowCount,
			totalCount		: pagination.totalCount,
			totalPageCount	: pagination.totalPageCount,
		}
	},
	getPageNo( pageNo ) {
		return pageNo > 0 ? pageNo : 1;
	},

};
