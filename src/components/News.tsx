import axios from "axios";
import newsApi from '../Api/NewsApi.json'
import { useState } from "react";
import styled from "styled-components";


const News = () => {
    const [allNews, setAllNews] = useState([])

    const getnews = ()=>{
        axios.get(`${newsApi.base}`)
        .then(Response =>{
            console.log(Response.data)
            setAllNews(Response.data.articles);
        })
        .catch(error => {
            console.log(error)
        })
    }
    console.log(allNews);

    return (
        <div>
            hello world
            <button onClick={()=> {getnews()}}>Get News</button>
            {
                allNews 
                ? 
                <div>
                    {allNews.map((val, index)=>{
                        return(
                            <div key={index} style={{border:'2px solid black' , margin:"10px"}}>
                                <h5>{val.title}</h5>
                                <p>{val.content}</p>
                            </div>
                        )
                    })}
                </div>
                :
                <h3>no news available</h3>
            }
        </div>
    )
}

export default News
