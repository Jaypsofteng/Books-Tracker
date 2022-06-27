import React from 'react';
import { search } from '../booksApi/BooksAPI';
import Book from '../bookComponents/Book'

class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      searchQuery: '',
    }
  }

  getBooks = (bookName) => {
    search(bookName) //returns list of books matching book name
      .then(books => { //filter the returned books for any books that already have assigned valueOfClass : currentlyReading, wantToRead, read or none. 
        if (books) {
          if (books.length > 0) {
            let allBooksIds = this.props.bookArray.bookIds; //main state book ids
            let arrayOfBooks = books.map((book) => {
              book.industryIdentifiers = book.industryIdentifiers[0];
              if (allBooksIds && Object.keys(allBooksIds).includes(book.industryIdentifiers.identifier)) {
                book.valueOfClass = allBooksIds[book.industryIdentifiers.identifier];
              } else {
                book.valueOfClass = 'none';
              }

              return book;
            });
            //update the current state of the component 
            this.setState({
              books: arrayOfBooks,
              searchQuery: bookName
            });
          } else {
            //incase the serch param did not returned any books, then set the current state of the component to empty.
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
              this.getBooks(e.target.value.trim()) //get books and filter it for already assigned status
            }} placeholder="Search by title or author" />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            <Book bookArray={this.state.books} key="booksArr" updateMainState={this.props.updateMainState} />
          </ol>
        </div>
      </div>
    );
  }

}

export default SearchPage;