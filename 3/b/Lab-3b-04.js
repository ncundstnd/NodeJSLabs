const http = require('http');
const url = require('url');
const { v4: uuidv4 } = require('uuid');

function createOrder(cardNumber) {
	return new Promise((resolve, reject) => {
		let cardStatus = validateCard(cardNumber);
		if (cardStatus === true) {
			let uuid = uuidv4();
			setTimeout(() => {
				resolve(uuid);
			}, 5000);
		} else if (cardStatus === false) {
			reject(new Error());
		}
	});
}

async function proceedToPayment(orderNumber) {
	console.log("Order number " + orderNumber);

	let x = Math.floor(Math.random() * 2) + 1;

	if (x == 1) {
		console.log("Payment successfull\n");
		return true;
	} else {
		console.log("Payment failed\n");
		return false;
	}
}

function validateCard(cardNumber) {
	console.log("Card number " + cardNumber);

	let x = Math.floor(Math.random() * 2) + 1;

	if (x == 1) {
		console.log("Card is valid");
		return true;
	} else {
		console.log("Card is not valid\n");
		return false;
	}
}

const server = http.createServer(async (req, res) => {
	res.writeHead(200, { 'Content-Type': 'text/plain' });

	const parsedUrl = url.parse(req.url, true);
	const pathname = parsedUrl.pathname;
	const queryData = parsedUrl.query.data;

	if (pathname === '/promise') {
		createOrder(queryData)
			.then(result => {
				proceedToPayment(result);
				res.end(result);
			})
			.catch(() => {
				res.writeHead(400);
				res.end("Card is not valid");
			});
	} else if (pathname === '/async') {
		try {
			const orderNumber = await createOrder(queryData);
			await proceedToPayment(orderNumber);
			res.end(orderNumber);
		} catch (error) {
			res.writeHead(400);
			res.end("Card is not valid");
		}
	} else {
		res.writeHead(404);
		res.end('Not found');
	}
});

const PORT = 3000;
server.listen(PORT, () => {
	console.log(`Сервер запущен по адресу http://localhost:${PORT}/`);
});
