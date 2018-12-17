console.log('We here');
const PORT = process.env.PORT || 5000;

let express = require('express');

let app = express();

server = app.listen(PORT, listening);

function listening() {
	console.log('listening ....');
}

app.use(express.static('public'));