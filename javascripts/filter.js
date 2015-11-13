define(function(require) {
	var Q = require("q");

function filterBooks(totalBooklist) {
	var selected = $("[name='type']").val();
	console.log("selected", selected);
	$("#bookList").html(totalBooklist);

	if (selected !== "") {
    		var a = $(".booky[booktype='"+selected+"']");
    		console.log("a", a);
    		$("#bookList").html(a);
    }


	}
	return filterBooks;
})




