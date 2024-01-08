import React, { useEffect,useState } from 'react'
import NewsItem from './NewsItem'
import Loading from './Loading';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {

  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)


  const capitalizeAtFirst = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  const updateNews = async() => {
    props.setProgress(10)
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=924f6876ea5240858cc0330fba341095&page=${page}&pageSize=${props.pageSize}`
    setLoading(true)
    let data = await fetch(url);
    let parsedData = await data.json();
    // console.log(parsedData);
    setArticles(parsedData.articles)
    setTotalResults(parsedData.totalResults)
    setLoading(false)
    props.setProgress(100)
  }

  useEffect(() => {
    document.title = `${capitalizeAtFirst(props.category)} - Kal Tak`
    updateNews();
  },[])


  // const handlePrevClick = async () => {
  //   setPage(page - 1)
  //   updateNews();
  // }

  // const handleNextClick = async () => {
  //   setPage(page + 1)
  //   updateNews();
  // }
  const fetchMoreData = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=924f6876ea5240858cc0330fba341095&page=${page+1}&pageSize=${props.pageSize}`
    setPage(page + 1)
    let data = await fetch(url);
    let parsedData = await data.json();
    // console.log(parsedData);
    setArticles(articles.concat(parsedData.articles))
    setTotalResults(parsedData.totalResults)
  };

    return (
      <>
        <h1 className="text-center" style={{marginTop: '90px'}}>Kal Tak - Top {capitalizeAtFirst(props.category)} headlines</h1>
        {loading && <Loading />}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults} 
          loader={<Loading />}
        >
          <div className="container">

            <div className="row">
              {!loading && articles.map((element) => {
                return <div className="col md-3 my-2" key={element.url}>
                  <NewsItem title={element.title} description={element.description} imgUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} />
                </div>
              })}
            </div>
          </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between">
          <button disabled={page <= 1} type="button" class="btn btn-dark" onClick={handlePrevClick}>&larr; Previous</button>
          <button disabled={page + 1 > Math.ceil(totalResults / props.pageSize)} type="button" class="btn btn-dark" onClick={handleNextClick}>Next &rarr;</button>
        </div> */}
      </>
    )
}

News.defaultProps = {
  pageSize: 8,
  country: "in",
  category: "general"
}

News.propTypes = {
  pageSize: PropTypes.number,
  country: PropTypes.string,
  category: PropTypes.string
}

export default News