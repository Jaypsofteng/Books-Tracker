import React from 'react';
import { search } from './BooksAPI';
import Book from './Book'

class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      searchQuery: '',
    }
  }

  getBooks = (bookName) => {
    search(bookName)
    .then(books => {
        if(books) {
          if(books.length > 0) {
            let allBooksIds = this.props.bookArray.bookIds; 
            let arrayOfBooks = books.map((book) => {
              book.industryIdentifiers = book.industryIdentifiers[0];
              if(allBooksIds && Object.keys(allBooksIds).includes(book.industryIdentifiers.identifier)) {
                book.valueOfClass = allBooksIds[book.industryIdentifiers.identifier];
              } else { 
                book.valueOfClass = 'none';
              }
              
              return book;
              });               
            this.setState({
              books: arrayOfBooks,
              searchQuery: bookName
            });
            } else {
              this.setState({
                books: [],
                searchQuery: "",
              });
            }
        }
    });
  }

  render() {
    return (
        <div className="search-books" key="searchPage">
            <div className="search-books-bar">
            <button className="close-search" onClick={this.props.changePage}>Close</button>
            <div className="search-books-input-wrapper">
                <input type="text" onChange={(e) => {
                    this.getBooks(e.target.value.trim())}} placeholder="Search by title or author"/>
            </div>
            </div>
            <div className="search-books-results">
            <ol className="books-grid">
                <Book bookArray={this.state.books} key="booksArr" updateMainState={this.props.updateMainState}/>
            </ol>
            </div>
        </div>
    );
  }

}

export default SearchPage;