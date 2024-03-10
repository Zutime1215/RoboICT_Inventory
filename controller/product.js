const fs = require('fs');
const products = JSON.parse(fs.readFileSync('data.json', 'utf-8'));

exports.test = (req, res) => {
  console.log(req.body[0]);
  res.status(201).json(req.body);
};

exports.createProduct = (req, res) => {
  products.push(req.body);
  res.status(201).json(req.body);
};

exports.getAllProducts = (req, res) => {
  res.json(products);
};
  
exports.getProduct = (req, res) => {
  const id = +req.params.id;
  const product = products.find((p) => p.id === id);
  res.json(product);
};

exports.replaceProduct = (req, res) => {
  const id = +req.params.id;
  const productIndex = products.findIndex((p) => p.id === id);
  products.splice(productIndex, 1, { ...req.body, id: id });
  res.status(201).json();
};

exports.updateProduct = (req, res) => {
  const id = +req.params.id;
  const productIndex = products.findIndex((p) => p.id === id);
  const product = products[productIndex];
  products[productIndex]["last_updated"] = updateTime(); 
  products.splice(productIndex, 1, { ...product, ...req.body });
  res.status(201).json();
};

exports.deleteProduct = (req, res) => {
  const id = +req.params.id;
  const productIndex = products.findIndex((p) => p.id === id);
  const product = products[productIndex];
  products.splice(productIndex, 1);
  res.status(201).json(product);
};

// Sell

exports.sellProducts = (req, res) => {
  var net = 0;
  var reqProducts = JSON.parse(req.body[0]);
  var reqProductsKeys = Object.keys(reqProducts);
  
  var customInfo = JSON.parse(req.body[1]);
  var responseProducts = { "name": customInfo["name"], "address": customInfo["address"], "number": customInfo["number"], "products": [], "net": 0 };

  for (let i = 0; i < reqProductsKeys.length; i++) {
    var id = reqProductsKeys[i];
    var quantity = reqProducts[id]["quantity"];
    var productIndex = products.findIndex((p) => p.id == id);
    var product = products[productIndex];

    if ( product["stock"]-quantity < 0 ) {
      res.status(400).json( {"msg": "insufficient product", "id": id ,"title": product["title"]} );
      return;
    }
    product["stock"] -= quantity;
    var total = quantity*product["price"];
    net += total;
    responseProducts["products"].push( {"title": product["title"], "price": product["price"], "quantity": quantity, "total": total} );
  }

  responseProducts["net"] = net;
  res.json(responseProducts);
};

exports.writeProducts = (req, res) => {
  fs.writeFile('./data.json', JSON.stringify(products), err => {
		if (err) {
			res.json( {"msg": "error"} );}
		else {
      res.json( {"msg": "saved"} );
	  }
	});
};

function updateTime() {
  const d = new Date();
  return d.getDate().toString() + '.' + d.getMonth().toString() + '.' + d.getFullYear().toString();
}