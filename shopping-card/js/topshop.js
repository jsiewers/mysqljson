var winkelmandje = [];
var url = "http://localhost:8888/mysqljson/shopping-card/webshop-json.php";

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
		showItems(objs);
}


function checkInWinkelmandje(obj) {
	objs = JSON.parse(localStorage.getItem("winkel"));
	//console.log(objs);
	for(i = 0; i < winkelmandje.length; i++) {
		if(winkelmandje[i] == obj) {
			return false;
		}
	}
	return true;
}


function showItems(objs, type) { //type is "produkten" om alle produkten weer te geven of "winkelmandje" om een e
		for (i = 0; i < objs.length; i++) {
			console.log(objs[i]);
			var col = document.createElement("div");
			col.className = "col-md-4";
			col.setAttribute("style", "height:600px;");
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
			col.appendChild(h3);
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
