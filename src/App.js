
import { useEffect, useState } from 'react';
import './App.css';
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
  return (
    <div className='cryptocard'>
      <img src={props.image} alt={props.name}/>
      <h2>{props.name}/{props.symbol}</h2>
      <h3>Current price: {props.current_price}</h3>
      <h3>Highest/Lowest (24h): {props.high_24h}/{props.low_24h} </h3>
      <h3>Price Change (24h): {props.price_change_percentage_24h}%</h3>
      
    </div>
  )
}
function App() {
  const [search, setSearch] = useState('')
  const [data, setData] = useState([])
    useEffect(() => {
    setData([
      {
        id: 'bitcoin',
        symbol: 'btc',
        name: 'Bitcoin',
        image:
          'https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579',
        current_price: 37282,
        high_24h: 38849,
        low_24h: 34846,
        price_change_percentage_24h: 6.19871,
      },
      {
        id: 'ethereum',
        symbol: 'eth',
        name: 'Ethereum',
        image:
          'https://assets.coingecko.com/coins/images/279/large/ethereum.png?1595348880',
        current_price: 2520.14,
        high_24h: 2636.43,
        low_24h: 2491.85,
        price_change_percentage_24h: -0.23862,
      },
    ]);
  }, []);
  // useEffect(() => {
  //   fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=INR&order=market_cap_desc&per_page=100&page=1&sparkline=falses')    
  //   .then(res => res.json())
  //   .then(res => {setData(res.filter((crypto) => crypto.name.toLowerCase().includes(search.toLowerCase()) ||crypto.symbol.toLowerCase().includes(search.toLowerCase())))})    
  // }, [search])
  return (
    <>
      <div className="App">
        <a href={window.location.href} onClick={() => window.location.reload()}><img src={process.env.PUBLIC_URL+"/logo_transparent.png"} className='logo' alt="Logo"></img></a>
        
        <SearchBar search={search} setSearch={setSearch}/>
        <div className="cryptoBox">
          {data.map((crypto) => (
          <DisplayCrypto 
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
