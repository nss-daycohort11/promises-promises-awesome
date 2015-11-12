requirejs.config({
  baseUrl: './javascripts',
  paths: {
    'jquery': '../lib/bower_components/jquery/dist/jquery.min',
    'lodash': '../lib/bower_components/lodash/lodash.min',
    'hbs': '../lib/bower_components/require-handlebars-plugin/hbs',
    'bootstrap': '../lib/bower_components/bootstrap/dist/js/bootstrap.min',
    'q': '../lib/bower_components/q/q'
  },
  shim: {
    'bootstrap': ['jquery']
  }
});

requirejs(
  ["jquery", "hbs", "lodash", "bootstrap", "get-books", "get-types"], 
  function($, Handlebars, _, bootstrap, booker, types) {

    console.log("getTypes in our promises.js", types);
    var globalTypes;

    types()
    .then(function(types) {
      console.log("API call successful and responded with", types);
      globalTypes = types;
      return booker(types)
    }) //END OF FIRST THEN CALL (THE ONE FOR TYPES)
    .then(function(books) {
      /*
            This code is dependent upon two XHRs and violates
            the Single Responsibility Principle.

            I've also given you a little preview of ES6 (the newest
            version of JavaScript syntax). They are called fat arrows.
            Check out the docs at http://es6-features.org/#ExpressionBodies
          */
          globalTypes = Object.keys( globalTypes ).map(key => globalTypes[ key ]);
          books = Object.keys( books ).map(key => books[ key ]);
          console.log("globalTypes after keymap", globalTypes);
          console.log("books after keymap", books);

          /*
            I'm using the lodash `find()` method here.
              https://lodash.com/docs#find
           */
          var books = books.map(book => {
            book.type = _.find(globalTypes, { id:book.booktype }).label;
            console.log("THIS IS THE BOOK", book);
            return book;
          });

          console.log("BOOKS?", books);


      require(['hbs!../templates/books'], function(bookTpl) {
        $("#bookList").html(bookTpl({ books }));
      });

    }).fail(function(error){
      console.log("error", error);
    });

  }
);
