
import './App.css';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";
import { Contact } from './Contact';

const client = new ApolloClient({
  uri: 'http://localhost:4000/',
  cache: new InMemoryCache()
});
function App() {
  
  return (
    <div className="App">
      <ApolloProvider client={client}>
   <Contact/>
  </ApolloProvider>
    </div>
  );
}

export default App;
