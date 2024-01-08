import React from 'react'

const NewsItem = (props) => {
        let {title, description, imgUrl, newsUrl, author, date} = props;
        return (
            <div>
                <div className="card" style={{width: "18rem"}}>
                    <img src={imgUrl} className="card-img-top" alt="No Pic"/>
                        <div className="card-body">
                            <h5 className="card-title">{title}</h5>
                            <p className="card-text">{description}</p>
                            <p className="card-text"><small className="text-muted">By {!author?"Unknown":author} on {new Date(date).toGMTString()}</small></p>
                            <a rel="noreferrer" href={newsUrl} target='_blank' className="btn btn-sm btn-dark">Read More</a>
                        </div>
                </div>
            </div>
        )
}

export default NewsItem