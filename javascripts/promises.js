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
  ["jquery", "hbs", "lodash", "bootstrap", "get-books", "get-types", "filter"], 
  function($, Handlebars, _, bootstrap, booker, types, filter) {

    console.log("getTypes in our promises.js", types);
    var globalTypes;
    var totalBooklist;

    types()
    .then(function(types) {
      console.log("API call successful and responded with", types);
      globalTypes = types;
      return booker(types)
    }) //END OF FIRST THEN CALL (THE ONE FOR TYPES)
    .then(function(books) {
      var uniqueTypes = [];

          globalTypes = Object.keys( globalTypes ).map(key => globalTypes[ key ]);
          books = Object.keys( books ).map(key => books[ key ]);
          console.log("globalTypes after keymap", globalTypes);
          console.log("books after keymap", books);

          var books = books.map(book => {
            book.type = _.find(globalTypes, { id:book.booktype }).label;
            console.log("THIS IS THE BOOK", book);
            return book;
          });

      for (var i = 0; i < books.length; i++) {
        uniqueTypes[i] = books[i].type;
      };

      console.log("uniqueTypes", uniqueTypes);

       uniqueTypes = _.uniq(uniqueTypes);

      // THIS ADDS ALL THE VALUES TO THE FILTER, EVEN DUPLICATES
      // require(['hbs!../templates/option'], function(bookfile) {
      //   $("#bookFilter").html(bookfile({ books }));
      // });

      // THIS POPULATES ONLY UNIQUE THINGS, BUT DOESN'T USE HANDLEBARS
        outputThis ="<div class='row'><div class='col-md-2 col-md-offset-1'><p>Filter by type</p><select name='type'><option></option>";
        for (i = 0; i < uniqueTypes.length; i++) {
          outputThis += "<option>"+uniqueTypes[i]+"</option>";
        };
        outputThis +="</select></div><div class='col-md-9'><h2>Awesome Bookstore</h2></div></div>";
        console.log("outputThis", outputThis);
      $("#bookFilter").html(outputThis);

      console.log("BOOKS?", books);


      require(['hbs!../templates/books'], function(bookTpl) {
        $("#bookList").html(bookTpl({ books }));
        totalBooklist = $("#bookList").html();

      });

    }).then(function(){
      $("[name='type']").on('change', function(){
        filter(totalBooklist);
      });
    })
    .fail(function(error){
      console.log("error", error);
    });


  }
);
