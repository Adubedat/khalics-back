'use strict';

module.exports.hello = async (event, context) => {
	let msg = 'Go Serverless v1.0! Your function executed successfully!';
	let query = event.queryStringParameters;
	if (query && query.name) {
		msg = 'hello + ' + query.name;
	}
	return {
		statusCode: 200,
		body: JSON.stringify({
			message: msg
			// input: event,
		})
	};

	// Use this code if you don't use the http event with the LAMBDA-PROXY integration
	// return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};

module.exports.imageResize = async (event, context) => {
	// let json = JSON.parse(event.body);

	return {
		statusCode: 200,
		body: JSON.stringify({
			message: 'resized your image !',
			envTest: 'env:' + process.env.TEST_API_KEY + ' - ' + process.env.GOOGLE_MAPS_API_KEY
			// input: event,
			// object: json
		})
	};
	// Use this code if you don't use the http event with the LAMBDA-PROXY integration
	// return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
