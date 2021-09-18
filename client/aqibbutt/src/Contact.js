import React from 'react'
import { gql, useQuery, useMutation } from '@apollo/client';
const get = gql`
query Query {
    books {
      title
      author
}}`;
const remove = gql`
mutation Mutation($index: Int!) {
  delBook(index: $index) {
    title
    author
}}`;
const add = gql`
mutation AddBookMutation($title: String!, $author: String!) {
  addBook(title: $title, author: $author) {
    title
    author
 }}`;

export const Contact = () => {
     const { loading, error, data } = useQuery(get);
    const [delBook] = useMutation(remove);
    const [addBook] = useMutation(add);
  
        if (loading) return 'Submitting...';
    if (error) return `Submission error! ${error.message}`;
  
  return (
        <div>
   <i>  Books Data Using GraphQl </i>
             {data.books.map((val,ind)=>{return <div key={ind} style={{marginBottom:'20px'}}>
         <p>The Name of the Book <b> {val.title}</b> and its Author <b>{val.author}</b> </p>
         <button 
            onClick={()=> delBook({ variables: { index: ind } })}
            >Add DATA into table</button>
         </div>}
         
         )} 
           <br/>
        <br/>
      <form onSubmit={(e)=>{e.preventDefault(); addBook({ variables: { title:"ali",author:"butt" } }); console.log(e)}}>
        <lable> <i>Title</i>
        <input type="text" value="title" />
      </lable>  <br/>
        <br/>
        <lable> <i>Author</i>
        <input type="text" value="author" />
      </lable>
        <br/>
        <br/>
      <input type="submit" value="Add" />
      </form>
    
        </div>
    )
}
