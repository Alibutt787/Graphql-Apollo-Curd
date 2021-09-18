const { ApolloServer, gql } = require('apollo-server');

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  type Book {
    title: String
    author: String
  }
  type Query {
    books: [Book]
  }
  type Mutation {
    addBook(title: String!,author: String!): Book!
    delBook(index:Int!): Book!
    updateBook(index:Int! , title: String!,author: String!): Book!

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

const resolvers = {
    Query: {
      books: () => books,
    },
Mutation:{
  addBook(e,{title,author}){
  books.push({title:title, author:author})
  return{
    title: title,
    author: author,
    }
  },
   delBook(parent, args, context, info){
      
  var tit =books[args.index].title;
  var auth =books[args.index].author;
   books.splice(args.index,1);
   return{    title:tit, author:auth}
      
  },
  updateBook(parent, args, context, info){
     books.forEach((value, index)=>{
       var hy = args.index; 
            books[hy].title=args.title;
            books[hy].author=args.author;
  });
  return{
    title: args.title,
    author: args.author,
    }
   }
  }
};
const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
  