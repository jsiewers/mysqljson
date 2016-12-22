
function loadJSON(url, callback) {
  var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
 			if( typeof callback === 'function' ) {
      	callback(xmlhttp.responseText);
      }		
    }
	}
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
}

