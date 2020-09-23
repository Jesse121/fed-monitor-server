"use strict";

exports.validatePageSize = query => {
	const page = parseInt(query.page, 10);
	const pageSize = parseInt(query.pageSize, 10);
	return { page, pageSize };
};
