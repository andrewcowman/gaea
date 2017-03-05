$(document).ready(function() {
	
	$("#runQuery").click(function() {
		var dateOne = $("#dateOne").val();
		var dateTwo = $("#dateTwo").val();
		var longitude = $("#long").val();
		var latitude = $("#lat").val();
		
		retrieveImages(dateOne, dateTwo, latitude, longitude);

	});
	
	$("#getDates").click(function() {
		var longitude = $("#long").val();
		var latitude = $("#lat").val();
		
		retrieveDates(latitude, longitude);
		$("#dateList").show();
	});
	
	$("#hideDates").click(function() {
		$("#dateList").hide();
	});
	
	retrieveImages("2013-05-18", "2017-01-05", "8.981087401256054", "-79.58599090576172");
	
});

function retrieveImages(dateOne, dateTwo, latitude, longitude) {
	$.ajax("https://api.nasa.gov/planetary/earth/imagery?lon=" + longitude + "&lat=" + latitude + "&date=" + dateOne + "&cloud_score=False&api_key=yeFPB2PmkUAg0kCHrLxRlPOnWEX6MBGsFyp8X1w7", { 
		success : function(iDataArr, stat, xhr) {
			$("#imageOne").attr("src", iDataArr.url);
			$("#imageOneDate").text(iDataArr.date.substr(0,10));
		}
	});

	$.ajax("https://api.nasa.gov/planetary/earth/imagery?lon=" + longitude + "&lat=" + latitude + "&date=" + dateTwo + "&cloud_score=False&api_key=yeFPB2PmkUAg0kCHrLxRlPOnWEX6MBGsFyp8X1w7", { 
		success : function(iDataArr, stat, xhr) {
			$("#imageTwo").attr("src", iDataArr.url);
			$("#imageTwoDate").text(iDataArr.date.substr(0,10));
		}
	});
	
	$("#dateOne").val(dateOne);
	$("#dateTwo").val(dateTwo);
	$("#lat").val(latitude);
	$("#long").val(longitude);
};

function retrieveDates(latitude, longitude) {
	var dateBegin = "2010-01-01";
	var d = new Date();
	var dateEnd = d.getFullYear() + "-" + (d.getMonth()+1) + "-" + d.getDate();
	
	$.ajax("https://api.nasa.gov/planetary/earth/assets?lon=" + longitude + "&lat=" + latitude + "&begin=" + dateBegin + "&end=" + dateEnd + "&api_key=yeFPB2PmkUAg0kCHrLxRlPOnWEX6MBGsFyp8X1w7", { 
		success : function(iDataArr, stat, xhr) {
			var retStr = "";
			for(var i = 0; i < iDataArr.count; i++) {
				retStr = retStr + iDataArr.results[i].date + " | ";
			}
			$("#dateList").text(retStr);
		}
	});
};