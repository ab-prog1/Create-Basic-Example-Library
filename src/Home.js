
import { useState, useEffect } from 'react';
import View from './components/View';

const getDataFromLs = () => {
  const data = localStorage.getItem('books');
  if(data){
    return JSON.parse(data)
  }else{
    return [];
  }
}


const Home =()=> {

  const [books, setBooks] = useState(getDataFromLs());
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [number, setNumber] = useState("");
  
  const handleSubmit = (e) => {
    e.preventDefault();
    let book ={
      title,
      author,
      number
    }
    setBooks([...books,book])
  }


  const deleteBook = (number) => {
    const filterBooks = books.filter((element,index)=> {
      return element.number !== number;
    })

    setBooks(filterBooks)
  }

  useEffect(()=>{
    localStorage.setItem('books', JSON.stringify(books))
  }, [books])
  

  return (
    <div className="wrapper">
      <h1>List of books</h1>
      <p>Add your new book to the library.</p>
      <div className="main">
        <div className="form-container">
          <form autoComplete="off" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="">Title</label>
              <input 
                type="text"
                className="form-control"
                required
                onChange={(e)=> setTitle(e.target.value)}
                />
            </div>
            <div className="form-group mt-4">
              <label htmlFor="">author</label>
              <input 
              type="text" 
              className="form-control" 
              required
              onChange={(e)=> setAuthor(e.target.value)}
              />
            </div>
            <div className="form-group mt-4">
              <label htmlFor="">number #</label>
              <input 
              type="text" 
              className="form-control" 
              required
              onChange={(e)=> setNumber(e.target.value)}
              />
            </div>
            <div className="form-grou mt-4">
              <button type="submit" className="btn btn-success btn-md">Add</button>
            </div>
          </form>
        </div>
        <div className="view-container">
          {
            books.length > 0 && 
            <>
                <div className="table-responsive w-100">
            <table className="table">
               <thead>
                  <tr>
                    <th>number#</th>
                    <th>Title</th>
                    <th>author</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  <View books={books} deleteBook={deleteBook} />
                </tbody>
            </table>
          </div>
          <button className='btn btn-danger btn-md' onClick={()=> setBooks([])}>Delete all </button>
            </>
          }

          {
            books.length < 1 && <div>We don't have any books in the library</div>
          }
        </div>
      </div>
    </div>
  );
}

export default Home;
