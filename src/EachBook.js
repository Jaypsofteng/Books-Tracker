import React from 'react';

class EachBook extends React.Component {

  changeIcon = (e, bookElement) => {
    let value = e.target.value;
    let parent = e.target.parentNode;
    parent.classList.forEach(element => {
      parent.classList.remove(element);        
    }); 
    parent.classList.add('book-shelf-changer');
  
    switch(true) {
      case value === 'currentlyReading' : 
        parent.classList.add('currently-reading');
        bookElement.valueOfClass = 'currentlyReading';
        break;
      case value === 'wantToRead' : 
        parent.classList.add('want-to-read');
        bookElement.valueOfClass = 'wantToRead';
        break;
      case value === 'read' :
        parent.classList.add('read');
        bookElement.valueOfClass = 'read';
        break;     
      default : 
        parent.classList.add('none');     
        bookElement.valueOfClass = 'none';          
        break;       
    }
    this.props.updateMainState(bookElement,value);   
    
  }

  render() {

    if(this.props.bookElement) {
    let book = this.props.bookElement;
    let bookId = book['industryIdentifiers'].identifier;
    let bookUrl = book.imageLinks ? book.imageLinks.smallThumbnail : 'https://i.ytimg.com/vi/f3cLOucMpD0/maxresdefault.jpg';
    let bookTitle = book.title;
    let bookAuthors = book.authors ? book.authors.join() : 'anonymus writer';
    return <li key={bookId}>
        <div className="book">
        <div className="book-top">
            <div className="book-cover" style={{width: '128px', height: '193px',backgroundImage: `url(${bookUrl})` }}></div>
            <div className={"book-shelf-changer " + book.valueOfClass}>
                <select onChange={(e) => { 
                    this.changeIcon(e, book)}} value={book.valueOfClass}>
                    <option value="move" disabled>Move to...</option>
                    <option className="currentlyReading" value="currentlyReading">
                        Currently Reading
                    </option>
                    <option className="wantToRead" value="wantToRead">
                        Want to Read
                    </option>
                    <option className="read" value="read">
                        Read
                    </option>
                    <option className="none" value="none">
                        None
                    </option>
                    
                </select>
            </div>
        </div>
        <div className="book-title">{bookTitle}</div>
        <div className="book-authors">{bookAuthors}</div>
        </div>
    </li>
    } else {
        return <span></span>
    }
  }

}

export default EachBook;

