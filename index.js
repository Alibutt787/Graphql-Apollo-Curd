const { ApolloServer, gql } = require('apollo-server');

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
    title: String
    author: String
  }
  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    books: [Book]
  }

  type Mutation {
    addBook(title: String!, author: String!): Book!
    delBook(title: String!): Book!
    updateBook(index:Int! , title: String,author: String): Book!ssss

  }
`;
const books = [
    {
      title: 'The Awakening',
      author: 'Kate Chopin',
    },
    {
      title: 'City of Glass',
      author: 'Paul Auster',
    },
  ];
// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
    Query: {
      books: () => books,
    },
Mutation:{
  addBook(parent, args, context, info){
  books.push({title:args.title, author:args.author})
  return books
  },
  delBook(parent, args, context, info){
     books.forEach((value, index)=>{ 
        if(value.title ==  args.title || value.author== args.author){
         books.splice(index, 1)
      }
   });
       return books
  },
  updateBook(parent, args, context, info){
     books.forEach((value, index)=>{
       var hy = args.index; 
     
                        
            books[hy].title=args.title;
            books[hy].author=args.author;
      
  });
      return books
   }
  }
};
// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers });
// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
    //http://localhost:4000/