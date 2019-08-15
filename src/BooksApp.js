import React from 'react'
import './App.css';
import SearchPage from './SearchPage';
import BookHeader from './BookHeader';
import CurrentlyReading from './CurrentlyReading';
import WantToRead from './WantToRead';
import Read from './Read';
import Button from './Button';
import {update} from './BooksAPI';

class BooksApp extends React.Component {
  state = {
    showSearchPage: false,
    CurrentlyReading: [],
    WantToRead: [],
    Read: [],
    bookIds: {},
  }

  deleteElement = (bookElement) => {
    let mainState = this.state;

    let CurrentlyReading = mainState.CurrentlyReading.map((book) => {
      if(book && book.industryIdentifiers.identifier !== bookElement.industryIdentifiers.identifier) {
        return book;
      } 
    });
    
    let WantToRead = mainState.WantToRead.map((book) => {
      if(book && book.industryIdentifiers.identifier !== bookElement.industryIdentifiers.identifier) {
        return book;
      } 
    });
    
    let Read = mainState.Read.map((book) => {
      if(book && book.industryIdentifiers.identifier !== bookElement.industryIdentifiers.identifier) {
        return book;
      } 
    });
  
    let objId = { ...mainState.bookIds};
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
    if(bookElement) {
      update(bookElement, bookElement);
      let newState = this.deleteElement(bookElement);
      let value = valueSelected;
      let uniqueID = bookElement["industryIdentifiers"].identifier;
   
      if(valueSelected === 'currentlyReading') {
        newState.CurrentlyReading.push(bookElement);
        newState.bookIds[uniqueID] = value;
      } else if(valueSelected === 'wantToRead') {
        newState.WantToRead.push(bookElement);
        newState.bookIds[uniqueID] = value;
      } else if(valueSelected === 'read') {
        newState.Read.push(bookElement);      
        newState.bookIds[uniqueID] = value;
      } else if(valueSelected === 'none') {
        newState.bookIds[uniqueID] = value;  
      }
  
      let objId = { ...newState.bookIds};
      this.setState({
        showSearchPage: newState.showSearchPage,
        CurrentlyReading: newState.CurrentlyReading,
        WantToRead: newState.WantToRead,
        Read: newState.Read,
        bookIds: objId,
      });
    }
  }

  changePage = () => {
    if(this.state.showSearchPage) {
      this.setState({ showSearchPage: false });
    } else {
      this.setState({ showSearchPage: true });
    }
  }

  render() {
    return (
      <div className="app" key="organizebooks">
         {this.state.showSearchPage ? (
          <SearchPage changePage={this.changePage} bookArray={this.state} updateMainState={this.updateMainState} key="searchYourBooks"/>
        ) : (
          [ <div className="list-books" key="list-of-books">
              <BookHeader key="heading"/>
              <div className="list-books-content" key="list-grid">
                <div>
                  <CurrentlyReading bookArray={this.state.CurrentlyReading} updateMainState={this.updateMainState} key="currentlyreading"/>
                  <WantToRead bookArray={this.state.WantToRead} updateMainState={this.updateMainState} key="wanttoread"/>
                  <Read bookArray={this.state.Read} updateMainState={this.updateMainState} key="read"/>
                </div>
              </div>
              <Button changePage={this.changePage} key="changtosearch"/>
            </div>
          ]
        ) } 
      </div>

    )
  }
}

export default BooksApp;
