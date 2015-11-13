define(["jquery"], function($) {

  // We're returning the function immediately so we can use the function like an object,
  // where songDisplay is a key.
  return {
    booksDisplay: function(getBooks) {
      // require(['hbs!../templates/books'], function (bookTpl){
        
      //   $("#bookList").html(bookTpl(books));
      // });

      require(['hbs!../templates/option'], function (optTpl){
        
        $("#bookFilter").html(optTpl(books));
      });
    }
  };
});