import React from 'react';
import Card from './Card'; 

export default function Business(props) {
  return (
    <div className="container my-3">
      <h1 className="my-3 text-center">News Headlines on {props.category}</h1>
      <div className="row my-3">
        {props.articles.length === 0 ? (
          <p>Loading...</p>
        ) : (
          props.articles.map((element) => {
            return (
              <div className="col-sm-4" key={element.url}>
                <Card
                  url={element.url}
                  title={element.title}
                  description={element.description || 'No description available.'}
                  // imageUrl={element.urlToImage || 'https://via.placeholder.com/150'} // Placeholder for missing images
                  author={element.author}
                  time={element.publishedAt}
                  source={element.source.name}
                />
              </div>
            );
          })
        )}
      </div>
      <div className="container d-flex justify-content-between">
        <button
          disabled={props.page <= 1}
          type="button"
          className="btn btn-dark"
          onClick={props.prevClick}
        >
          &larr; Previous
        </button>
        <button
          disabled={Math.ceil(props.total / 5) === props.page}
          type="button"
          className="btn btn-dark"
          onClick={props.nextClick}
          id="myBtn"
        >
          Next &rarr;
        </button>
      </div>
    </div>
  );
}
