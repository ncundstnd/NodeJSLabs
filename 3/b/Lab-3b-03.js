const http = require('http');
const url = require('url');

function thirdJob(data) {
	return new Promise((resolve, reject) => {
		if (isNaN(data)) {
			reject(new Error("Error, data is not a number"));
		} else if (data % 2 !== 0) {
			setTimeout(() => {
				resolve("odd");
			}, 1000);
		} else {
			setTimeout(() => {
				reject(new Error("even"));
			}, 2000);
		}
	});
}

async function executeThirdJob(data) {
	try {
		const result = await thirdJob(data);
		return result;
	} catch (error) {
		return error.message;
	}
}

const server = http.createServer(async (req, res) => {
	res.writeHead(200, { 'Content-Type': 'text/plain' });

	const parsedUrl = url.parse(req.url, true);
	const pathname = parsedUrl.pathname;
	const queryData = parsedUrl.query.data;

	if (pathname === '/promise') {
		let data = parseInt(queryData);
		thirdJob(data)
			.then(result => res.end(result))
			.catch(error => {
				res.writeHead(500);
				res.end(error.message);
			});
	} else if (pathname === '/async') {
		let data = parseInt(queryData);
		const result = await executeThirdJob(data);
		res.end(result);
	} else {
		res.writeHead(404);
		res.end('Not found');
	}
});

const PORT = 5000;
server.listen(PORT, () => {
	console.log(`Сервер запущен по адресу http://localhost:${PORT}/`);
});
