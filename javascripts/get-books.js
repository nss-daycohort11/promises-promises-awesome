define(function(require) {
  var Q = require("q");

function getBooks() {
  var awesomeBooks = Q.defer();

  $.ajax({ url: "https://nss-book-store.firebaseio.com/books.json" })
    // XHR was successful
    .done(function(json_data) {
      // Now we can resolve the promise and send the data
      awesomeBooks.resolve(json_data);
    })

    // XHR failed for some reason
    .fail(function(xhr, status, error) {
      // Since the call failed, we have to reject the promise
      awesomeBooks.reject(error);
    });

  return awesomeBooks.promise;
}
  return getBooks;

})

