import styled from "styled-components";
import {useState , useEffect} from "react";
import axios from "axios";
import WeahterApi from '../Api/WeatherApi.json'

const H1 = styled.h1`
    color:red;
    border:2px solid red;
`
const Defalutbutton = styled.button`
    color:green    
`

const WeatherWidget = () => {
    const [lat, setLat] = useState<number>(0);
    const [long, setLong] = useState<number>(0);

    let [apiKeys, setApiKeys] = useState<{key:string, base:string}>({
        key: " ",
        base: " "
    })

    useEffect(()=>{
        setApiKeys({key: WeahterApi.key, base:WeahterApi.base})
    },[])

    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<string | null>(null);
    const knowWeather = () => {
        // Check if geolocation is available in the browser
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    console.log('latitude is ', position.coords.latitude)
                    setLat(position.coords.latitude)
                    console.log('longitude is ', position.coords.longitude)
                    setLong(position.coords.longitude)
                setError('not any error');
                console.log(typeof(lat), typeof(long))
                getWeather(lat,long)
                },
                (err) => {
                setError(err.message);
                // console.error(err.message)
                console.log(err.message)
                }
            );
            } else {
            setError("Geolocation is not available in your browser.");
            }
        }

    const getWeather = (lat:number, lon:number)=>{
        axios.get(`${apiKeys.base}weather?lat=${lat}&lon=${lon}&units=metric&APPID=${apiKeys.key}`)
        .then(Response => {
            setData(Response.data);
            console.log(Response.data)
        })  
        .catch(error => {
            console.log(error)
        })
    }
            // this.setState({
            // lat: lat,
            // lon: lon,
            // city: data.name,
            // temperatureC: Math.round(data.main.temp),
            // temperatureF: Math.round(data.main.temp * 1.8 + 32),
            // humidity: data.main.humidity,
            // main: data.weather[0].main,
            // country: data.sys.country,
            // });
    

    return(
        <div>
            <H1>User Weahter Information</H1>
            {
                lat === 0 ? "This is defalut Weather information": "This is user's Weahter information"
            }
            <br />
            <Defalutbutton as='button' onClick={()=> knowWeather()}>check Weather Info</Defalutbutton>
            <h4>Error -- {error}</h4>
            {
                data?
                <div>
                <p>Temperature{data.main.temp}</p>
                <p>fels_like {data.main.feels_like}</p>
                <p>area name {data.name}</p>
                
            </div>
                : 
                'data not available'
            }
            
        </div>
    )
}

export default WeatherWidget
