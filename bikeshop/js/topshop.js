var winkelmandje = [];
var produkten = [];
var totaalPrijs = 0;
var totaalNode="";
var url = "http://localhost:8888/mysqljson/shopping-card/webshop-json.php";
var form = document.getElementById("bestelformulier");
var container = document.getElementById("produkten");
var p;
var arr = [];

function init() {
	if(localStorage) {
		localStorage.clear();
	}
	loadJSON(url, function(response) {
		localStorage.winkel = response;
		objs = getWinkelItems();
		showItems(objs);
	});

}

function addToCart(obj) {
	//item = this;
	item = obj.srcElement.Obj;
	if(checkInWinkelmandje(item)) {
			winkelmandje.push(item);
	}
	localStorage.winkelmandje = JSON.stringify(winkelmandje);
	console.log(winkelmandje);
	//showWinkelmandje();
}

function showWinkelmandje() {
		objs = getWinkelMandjeItems();
		showWinkelmandjeItems(objs);
}


function checkInWinkelmandje(obj) {
	objs = JSON.parse(localStorage.getItem("winkel"));
	//console.log(objs);
	for(bestelling = 0; bestelling < winkelmandje.length; bestelling++) {
		if(winkelmandje[i] == obj) {
			return false;
		}
	}
	return true;
}

function showWinkelmandjeItems() {
	if(produkten.length == 0) {
		produkten = JSON.parse(localStorage.getItem("winkelmandje"));
  }
	//console.log(produkten);
	for (i = 0; i < produkten.length; i++) {
		winkelmandje.push({idbestelling:i, aantal:1, produkt:objs[i]});
	}
	for (i = 0; i < winkelmandje.length; i++) {
		bestelling = winkelmandje[i];
		drawBestelling(bestelling);
	}
	drawTotaalPrijs();
}

function drawBestelling(bestelling) {
	console.log("in drawbestelling");
	var row = document.createElement("div");
	row.className = "row";
	var col1 = document.createElement("div");
	col1.className = "col-md-2";
	var img = document.createElement("img");

	console.log(bestelling.produkt.idprodukt);
	img.src = "img/" + bestelling.produkt.idprodukt + ".jpg";
	img.style = "width:100%;"
	col1.appendChild(img);
	row.appendChild(col1);

	var col2 = document.createElement("div");
	col2.className = "col-md-2";

	var col3 = document.createElement("div");
	col3.className = "col-md-2";
	var p = document.createElement("p");
	p.id = bestelling.produkt.idprodukt;
	var prijs = "" + bestelling.produkt.prijs * bestelling.aantal;
	var prijsNode = document.createTextNode(prijs);
	p.appendChild(prijsNode);
	col3.appendChild(p);
	var selectbox = document.createElement("select");
	selectbox.name = "aantal_" + bestelling.idbestelling;

	for(x=1;x<=5;x++) {
		var option = document.createElement("option");
		option.text = "" + x;
		selectbox.add(option);
	}

	selectbox.addEventListener("change", function(){
			bestelling.aantal = this.value;
			prijsNode.nodeValue = "" + bestelling.aantal * bestelling.produkt.prijs;
			totaalNode.nodeValue = calculeerTotaalPrijs();
	}, false);

	col2.appendChild(selectbox);
	row.appendChild(col2);
	row.appendChild(col3);
	container.appendChild(row);
}

function calculeerTotaalPrijs() {
  totaal = 0;
	for(i=0;i<winkelmandje.length;i++) {
		bestelling = winkelmandje[i];
		totaal += bestelling.produkt.prijs * bestelling.aantal;
	}
	return totaal;
}

function drawTotaalPrijs() {
	var row = document.createElement("div");
	row.className = "row";
	var col1 = document.createElement("div");
	col1.className = "col-md-12";
	totaal = calculeerTotaalPrijs();
	totaalNode = document.createTextNode(totaal);
	col1.appendChild(totaalNode);
	row.appendChild(col1);
	container.appendChild(row);
}
function showItems(objs, type) { //type is "produkten" om alle produkten weer te geven of "winkelmandje" om een e
		for (i = 0; i < objs.length; i++) {
			console.log(objs[i]);
			var col = document.createElement("div");
			col.className = "col-md-4";
			var img = document.createElement("img");
			buttontekst = document.createTextNode("Winkelwagen");
			var button = document.createElement("button");
			button.appendChild(buttontekst);
			button.className = "btn btn-primary";
			button.Id = objs[i].idprodukt;
			button.Obj = objs[i];
			button.addEventListener("click", addToCart);
			img.src = "img/" + objs[i].idprodukt + ".jpg";
			var h3 = document.createElement("h3");
			var merk = document.createTextNode(objs[i].merk);
			h3.appendChild(merk);
			var p = document.createElement("p");
			var type = document.createTextNode(objs[i].type);
			p.appendChild(type);
			col.appendChild(h3);
			col.appendChild(p);
			col.appendChild(img);
			col.appendChild(button);
			var element = document.getElementById("produkten");
			element.appendChild(col);
	}
}

function getWinkelItems() {
	return JSON.parse(localStorage.getItem("winkel"));
}

function getWinkelMandjeItems() {
	return JSON.parse(localStorage.getItem("winkelmandje"));
}

function berekenFormulier() {
	alert("sdfsdfs");
}
