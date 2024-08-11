import React from "react";
import PropTypes from "prop-types";

export default function Card(props) {
  const { title, description, imageUrl, url, author, time, source } = props;
  const date = new Date(time);

  return (
    <div className="my-3">
      <div className="card">
        <span
          className="badge rounded-pill bg-danger"
          style={{
            display: "flex",
            justifyContent: "flex-end",
            position: "absolute",
            right: "0",
          }}
        >
          {source}
          <span className="visually-hidden">unread messages</span>
        </span>
        {/* <img src={imageUrl} className="card-img-top" alt={title} /> */}
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
          <p className="card-text">
            <small className="text-body-secondary">
              By {author || "Unknown"} on {date.toLocaleDateString()} at {date.toLocaleTimeString()}
            </small>
          </p>
          <a href={url} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-dark">
            View news
          </a>
        </div>
      </div>
    </div>
  );
}

Card.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  imageUrl: PropTypes.string,
  url: PropTypes.string.isRequired,
  author: PropTypes.string,
  time: PropTypes.string.isRequired,
  source: PropTypes.string,
};

Card.defaultProps = {
  title: "No Title Available",
  description: "No Description Available",
  imageUrl: "https://via.placeholder.com/150", // Placeholder image in case of no image URL
  author: "Unknown",
  source: "Unknown",
};
