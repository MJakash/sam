import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'

import PropTypes from 'prop-types'

export class News extends Component {
  static defaultProps = {
    country: 'in',
    pageSize: 8,
    category: "general"
  }

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string

  }
  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1

    }
    document.title=`${this.capitalizeFirstLetter(this.props.category)}-Samachar `
  }
  async UpdateNews() {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&category=${this.props.category}&apiKey=70eb028a59044caf834e5e65e186f8f7&page=${this.state.page}&pageSize=${this.props.pageSize}`
    this.setState({ loading: true })
    let data = await fetch(url);
    let parsedData = await data.json();

    this.setState({
      totalResults: parsedData.totalResults,
      articles: parsedData.articles,
      loading: false
    })
  }

  async componentDidMount() {
    this.UpdateNews();
  
  }
  handlePrevClick = async () => {
    
    this.setState({
      page: this.state.page - 1
    })
    this.UpdateNews();

  }
  handleNextClick = async () => {
    
    this.setState({
      page: this.state.page + 1
    })
    this.UpdateNews();
  }

  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center" style={{ margin: '40px 0px' }}>Samachar - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>
        <hr></hr>
        {this.state.loading && <Spinner />}
        {/* <div className="row">
           {!this.state.loading && this.state.articles.map((element)=>{

         return  <div className="col-md-4" key={element.url} >

    < NewsItem title={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0, 80):""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
          </div> 
        
          })}

        </div> */}
        <div className="row">
          {!this.state.loading &&
            this.state.articles.reduce((acc, element) => {
              acc.push(
                <div className="col-md-4" key={element.url}>
                  <NewsItem
                    title={element.title ? element.title.slice(0, 45) : ''}
                    description={element.description ? element.description.slice(0, 80) : ''}
                    imageUrl={element.urlToImage}
                    newsUrl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              );
              return acc;
            }, [])}
         </div>
     
        <div className="container d-flex justify-content-between">
          <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
          <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        

       
        </div>
        </div>
      




    )
  }
}

export default News

