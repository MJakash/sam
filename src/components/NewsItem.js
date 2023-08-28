import React, { Component } from 'react'

export class NewsItem extends Component {

  render() {
    let {title,description,imageUrl,newsUrl,author,date,source} = this.props;
    return (
      <div className='my-3'>
     <div  className="card" >
  <img src={!imageUrl?"https://media.cnn.com/api/v1/images/stellar/prod/230330144956-ohio-pro-choice-rally-220624-file.jpg?c=16x9&q=w_800,c_fill":imageUrl}  className="card-img-top" alt="..."/>
  <div  className="card-body">
    <h5  className="card-title">{title} <span className="position-absolute top-0 translate-middle badge rounded-pill bg-primary" style={{left:'90%',zIndex:'1'}}>
   {source}
    </span>
    </h5>
    <p  className="card-text">{description}...</p>
    <p className="card-text"><small className='text-success'> By {!author?"Unknown":author} on {new Date(date).toGMTString()}</small></p>
    <a href={newsUrl} rel="noreferrer" target="_blank" className="btn btn-outline-secondary">Read More</a>
  </div>
</div>
      </div>
    )
  }
}

export default NewsItem