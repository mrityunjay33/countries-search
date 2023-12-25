import './App.css';
import { useEffect, useState } from 'react';

function App() {

  const [flags, setFlags] = useState([]);
  const [flagsAllData, setFlagsAllData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [timerId, setTimerId] = useState(null);

  useEffect(()=>{
    fetchData();
  }, []);

  const fetchData = async () => {
    try{
      const res = await fetch('https://restcountries.com/v3.1/all');
      const data = await res.json();
      setFlags(data);
      setFlagsAllData(data);
    }
    catch(err){
      console.log(err);
      return [];
    }
  }

  const handleSearch = (e) => {
    const searchText = e.target.value;
    setSearchText(searchText);
    if(timerId) clearTimeout(timerId);

    const timer = setTimeout(()=>{
      const filterFlags  = flagsAllData.filter((data) => {
        return data.region.toLowerCase().includes(searchText.toLowerCase());
      })
      setFlags(filterFlags);
    },0);

    setTimerId(timer);
  }

  return (
    <>
      <input type='text' placeholder='Search for countries...' value={searchText} onChange={handleSearch}/>
    <div className='container'>
      {flags.map((data, idx) => <div key={idx}>
        <div className='card'>
          <img className='image' src={data.flags.png} alt={`Flag of ${data.name.common}`} />
          <div className='country-name'>{data.region}</div>
        </div>
        </div>)}
    </div>
    </>
  );
}

export default App;