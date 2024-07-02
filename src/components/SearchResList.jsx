import React from 'react'


const SearchResList = ({results}) => {
  return (
    <div id='reslist' className='reslist'>
        {results.map((result,id) =>{
            return <button className='searchRes' key={id} onClick={(e) => {
              document.getElementById('reslist').classList.toggle('listhide');
              
            }} resultname={result.name} >{result.name}, {result.country}</button>
        })}
    </div>
  )
}

export default SearchResList
