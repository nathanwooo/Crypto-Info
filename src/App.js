
import { useEffect, useState } from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faStar,  } from '@fortawesome/free-solid-svg-icons'
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons'
library.add(faStar, farStar )



const SearchBar = ({search, setSearch}) => {
  
  const handleKeyDown = (e) => {
    if(e.key === 'Enter'){
      setSearch(e.target.value)
    }
  }
  return (
    <div className='search-bar' >
      <input id='seach-bar' className='search-input' type='text' placeholder="Search..."  onKeyDown={handleKeyDown} ></input>
    </div>
  )
}

const DisplayCrypto = (props) => {
  const [isFavourite, setIsFavourite] = useState(props.is_favourite)
  const handleClickStar = () => {
    const savedFavourites = JSON.parse(localStorage.getItem('crypto_favourites'))
    var newFavourites = 0
    if (isFavourite){
      newFavourites = savedFavourites.filter((favourite) => favourite !== props.symbol)      
    }
    else{
      if (savedFavourites){
        newFavourites = [...savedFavourites, props.symbol]      
      }
      else{
        newFavourites = [props.symbol]
      }         
    }    
    localStorage.setItem('crypto_favourites', JSON.stringify(newFavourites))
    setIsFavourite(!isFavourite)
  }
  return (
    <div className='cryptocard'>
      <img className="cryptoimage" src={props.image} alt={props.name}/>
      <h2>{props.name}/{props.symbol}</h2>
      <h3>Current price: {props.current_price}</h3>
      <h3>Highest/Lowest (24h): {props.high_24h}/{props.low_24h} </h3>
      <h3>Price Change (24h): {props.price_change_percentage_24h}%</h3>
      <FontAwesomeIcon className='starimage' icon={isFavourite? "fa-solid fa-star" : "fa-regular fa-star"} 
        style={{color: "#bfcc05",cursor: 'pointer'}} onClick={handleClickStar}/>    
    </div>
  )
}

const showFavourites = (data) => {
  return data.sort((a, b) => {
    const savedFavourites = JSON.parse(localStorage.getItem('crypto_favourites'))
    if (!savedFavourites){
      return 0
    }
    const isAFavorite = savedFavourites.includes(a.symbol);
    const isBFavorite = savedFavourites.includes(b.symbol);
    if (isAFavorite && !isBFavorite) return -1;
    if (!isAFavorite && isBFavorite) return 1;
    return 0;
  })
}
function App() {
  const [search, setSearch] = useState('')
  const [data, setData] = useState([])
  const [favourites, setFavourites] = useState([])
  useEffect(() => {
    const savedFavourites = localStorage.getItem('crypto_favourites')    
    console.log(savedFavourites)
      if (savedFavourites){
        setFavourites(JSON.parse(savedFavourites))
    }
  }, [])
  
  useEffect(() => {
    fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=INR&order=market_cap_desc&per_page=100&page=1&sparkline=falses')    
    .then(res => res.json())
    .then(res => {setData(showFavourites(res.filter((crypto) => crypto.name.toLowerCase().includes(search.toLowerCase()) ||crypto.symbol.toLowerCase().includes(search.toLowerCase()))))}) 
    .catch(error => alert(error))   
  }, [search])
  return (
    <>
      <div className="App">
        <a href={window.location.href} onClick={() => window.location.reload()}><img src={process.env.PUBLIC_URL+"/logo_transparent.png"} className='logo' alt="Logo"></img></a>
        {/* <h3 className='showSelection'>ads</h3> */}
        <SearchBar search={search} setSearch={setSearch}/>
        <div className="cryptoBox">
          {data.map((crypto) => (
          <DisplayCrypto 
            is_favourite={favourites.includes(crypto.symbol)}
            name={crypto.name} 
            image={crypto.image} 
            symbol={crypto.symbol}
            current_price={crypto.current_price} 
            high_24h={crypto.high_24h} 
            low_24h={crypto.low_24h} 
            price_change_percentage_24h={crypto.price_change_percentage_24h}   
            />
          ))}
        </div>
      </div>
    </>
  
  );
}

export default App;
