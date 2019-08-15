import React from 'react';
import Book from './Book';

class Read extends React.Component {
    
    render() {
        return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">Read</h2>
            <div className="bookshelf-books">
            <ol className="books-grid read">
                <Book bookArray={this.props.bookArray} updateMainState={this.props.updateMainState}/>
            </ol>
            </div>
        </div>
        );
    }
}

export default Read;