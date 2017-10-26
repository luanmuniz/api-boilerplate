'use strict';

const errorList = require('../config/error.json');

var errorApi = {

	list: errorList,

	errorHandler(section, code, errorResponse) {
		var returnedError = { success: false },
			message = 'Error Unknow';

		if(errorList[section][code]) {
			message = errorList[section][code];
		}

		returnedError.code = code;
		returnedError.message = message;

		if(errorResponse) {
			delete errorResponse.response;
			returnedError.errorResponse = errorResponse;
		}

		return Promise.reject(returnedError.message);
	}

}
