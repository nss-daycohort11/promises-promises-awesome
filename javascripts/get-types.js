define(function(require) {
	var Q = require("q");

function getTypes() {
  var awesome = Q.defer();

  $.ajax({ url: "https://nss-book-store.firebaseio.com/booktypes.json" })
    // XHR was successful
    .done(function(json_data) {
      // Now we can resolve the promise and send the data
      awesome.resolve(json_data);
    })

    // XHR failed for some reason
    .fail(function(xhr, status, error) {
      // Since the call failed, we have to reject the promise
      awesome.reject(error);
    });

  return awesome.promise;
}
	return getTypes;
})