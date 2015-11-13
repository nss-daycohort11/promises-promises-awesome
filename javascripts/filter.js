define(function(require) {
	var Q = require("q");

function filterBooks(totalBooklist) {
	var selected = $("[name='type']").val();
	console.log("selected", selected);
	$("#bookList").html(totalBooklist);

	if (selected !== "") {

    		var filtered = $(".booky[booktype='"+selected+"']");
    		console.log("filtered", filtered);
    		$("#bookList").html(filtered);

    }


	}
	return filterBooks;
})




