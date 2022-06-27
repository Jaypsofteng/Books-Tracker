import React from 'react'
import './css/App.css';
import SearchPage from './searchComponents/SearchPage';
import BookHeader from './bookComponents/BookHeader';
import CurrentlyReading from './bookComponents/CurrentlyReading';
import WantToRead from './bookComponents/WantToRead';
import Read from './bookComponents/Read';
import Button from './searchComponents/Button';
import { update, getAll } from './booksApi/BooksAPI';

//Main top level component which will have either a search page rendering or all the books in user's selections
class BooksApp extends React.Component {
  //Main react state
  constructor(props) {
    super(props);
    this.state = {

      showSearchPage: false,
      CurrentlyReading: [],
      WantToRead: [],
      Read: [],
      bookIds: {},
    }
    this.loadBooks() //load all books that are written to the backend previously for the current user token =localStorage.getItem('books-token')
  }

  loadBooks = () => {
    getAll().then(books => { //filter the returned books for any books that already have assigned valueOfClass : currentlyReading, wantToRead, read or none. 
      if (books) {
        if (books.length > 0) {
          let newState = this.state;
          let firstLoad = false;
          books.forEach(book => {
            if (!book.valueOfClass) {
              firstLoad = true;
              if (book.shelf === 'currentlyReading') {
                book.valueOfClass = 'currentlyReading';
                newState.CurrentlyReading.push(book);
                newState.bookIds[book.industryIdentifiers[0].identifier] = 'currentlyReading';
              } else if (book.shelf === 'wantToRead') {
                book.valueOfClass = 'wantToRead';
                newState.WantToRead.push(book);
                newState.bookIds[book.industryIdentifiers[0].identifier] = 'wantToRead';
              } else if (book.shelf === 'read') {
                book.valueOfClass = 'read';
                newState.Read.push(book);
                newState.bookIds[book.industryIdentifiers[0].identifier] = 'read';
              }

            }

          });
          if (firstLoad === true) {
            this.setState(newState);
          }
        }
      }
    });

  }
  //To delete a book element from the state, this function will be used.
  //Pass a book object and function will return a new state without the passed book object.
  deleteElement = (bookElement) => {
    let mainState = this.state;
    console.log(bookElement);
    let CurrentlyReading = [];
    mainState.CurrentlyReading.forEach((book) => {
      if (book && book.title !== bookElement.title) {
        CurrentlyReading.push(book);
      }
    });

    let WantToRead = [];
    mainState.WantToRead.forEach((book) => {
      if (book && book.title !== bookElement.title) {
        WantToRead.push(book);
      }
    });

    let Read = [];
    mainState.Read.forEach((book) => {
      if (book && book.title !== bookElement.title) {
        Read.push(book);
      }
    });
    console.log(CurrentlyReading);

    console.log(WantToRead);

    console.log(Read);

    let objId = { ...mainState.bookIds };
    let showSearchPage = this.state.showSearchPage;
    let stateValuesFiltered = {
      showSearchPage: showSearchPage,
      CurrentlyReading: CurrentlyReading,
      WantToRead: WantToRead,
      Read: Read,
      bookIds: objId,
    }

    return stateValuesFiltered;
  }

  updateMainState = (bookElement, valueSelected) => {
    if (bookElement) {
      update(bookElement, valueSelected).then(result => {
        //On the backend api call, the book status will be updated.
        let newState = this.deleteElement(bookElement);
        let value = valueSelected;
        let uniqueID = bookElement["industryIdentifiers"].identifier;

        if (valueSelected === 'currentlyReading') {
          newState.CurrentlyReading.push(bookElement);
          newState.bookIds[uniqueID] = value;
        } else if (valueSelected === 'wantToRead') {
          newState.WantToRead.push(bookElement);
          newState.bookIds[uniqueID] = value;
        } else if (valueSelected === 'read') {
          newState.Read.push(bookElement);
          newState.bookIds[uniqueID] = value;
        } else if (valueSelected === 'none') {
          newState.bookIds[uniqueID] = value;
        }

        let objId = { ...newState.bookIds };
        this.setState({
          showSearchPage: newState.showSearchPage,
          CurrentlyReading: newState.CurrentlyReading,
          WantToRead: newState.WantToRead,
          Read: newState.Read,
          bookIds: objId,
        });
      })

    }
  }

  changePage = () => {
    if (this.state.showSearchPage) {
      this.setState({ showSearchPage: false });
    } else {
      this.setState({ showSearchPage: true });
    }
  }

  render() {
    return (
      <div className="app" key="organizebooks">
        {this.state.showSearchPage ? (
          <SearchPage changePage={this.changePage} bookArray={this.state} updateMainState={this.updateMainState} key="searchYourBooks" />
        ) : (
          [<div className="list-books" key="list-of-books">
            <BookHeader key="heading" />
            <div className="list-books-content" key="list-grid">
              <div>
                <CurrentlyReading bookArray={this.state.CurrentlyReading} updateMainState={this.updateMainState} key="currentlyreading" />
                <WantToRead bookArray={this.state.WantToRead} updateMainState={this.updateMainState} key="wanttoread" />
                <Read bookArray={this.state.Read} updateMainState={this.updateMainState} key="read" />
              </div>
            </div>
            <Button changePage={this.changePage} key="changtosearch" />
          </div>
          ]
        )}
      </div>

    )
  }
}

export default BooksApp;
