'use strict';

var MySQL = {

	hasAnyUpdate(result) {
		return result.affectedRows !== 0;
	},

	hasResult(result) {
		return result.length !== 0;
	}

}