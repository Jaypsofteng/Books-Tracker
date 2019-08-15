import React from 'react';
import Book from './Book';

class CurrentlyReading extends React.Component {
  render() {
    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">Currently Reading</h2>
            <div className="bookshelf-books">
            <ol className="books-grid currently-reading">
              <Book bookArray={this.props.bookArray} updateMainState={this.props.updateMainState}/>
            </ol>
          </div>
        </div>
    );
  }
}

export default CurrentlyReading;