import {useEffect, useState} from 'react'
import axios from "axios";
import Router from "./routes/Router"
import { BASE_URL } from "./constants/BASE_URL";
import { GlobalStyled } from './GlobalStyle';
import { GlobalContext } from './context/GlobalContext';
import Modal from './components/Modal/Modal'

function App() {

 
  const [pokemons, setPokemons] = useState([])

  
  const [pokedex, setPokedex] = useState([])

  const [isLoading, setIsLoading] = useState(false)

 
  const [detailPokemon, setDetailPokemon] = useState([])

 
  const [showModal, setShowModal] = useState(false)

  
  const [action, setAction] = useState("")

  useEffect(()=>{
    browserPokemon()
  },[])

  const browserPokemon = async ()=>{
  let i = 1  
  setIsLoading(true)
  
  
  const auxPokemon = [...new Set(pokemons)]

  
  if (pokemons.length > 0){
    return
  }else{
  
  while (i <= 20){
    try{        
        
        const response = await axios.get(`${BASE_URL}/${i}`)
        auxPokemon.push(response.data)
        setPokemons(auxPokemon)
        setDetailPokemon(auxPokemon)
        console.log(`${response.data.name} adicionado com sucesso a base!`)      
    }catch(error){
        console.log(`Erro!${error.data.name} não foi adicionado a base.`)
        console.log(error)
    }
    i++
    }
    setIsLoading(false)
    }
  }

  //function para acrescentar pokemon na Pokelista
  function addPokemonPokedex (pokemonAdd){
    setShowModal(true)
    setAction("add")
    const pokemonOnList = pokemons.filter(
      (pokemon) => pokemon.id !== pokemonAdd.id)

      const newBrowserPokedex = [...pokedex, pokemonAdd]
      setPokedex(newBrowserPokedex)
      setPokemons(pokemonOnList)
    console.log("Adicionar Pokemon", pokemonOnList)
    console.log("Pokedex", pokedex)

  }

  //function remover pokemon da Pokedex
  function removePokemonPokedex (pokemonAdd){
    setShowModal(true)
    setAction("remove")
    const pokemonOnPokedex = pokedex.filter(
      (pokemon) => pokemon.id !== pokemonAdd.id)
    
    const newBrowserPokelist = [...pokemons, pokemonAdd]
    console.log("newBrowser",newBrowserPokelist)
    setPokedex(pokemonOnPokedex) 
    setPokemons(newBrowserPokelist) 
  }

  const context = {
    pokemons,
    setPokemons,
    detailPokemon,
    setDetailPokemon,
    pokedex,
    setPokedex,
    isLoading,
    setIsLoading,
    addPokemonPokedex,
    removePokemonPokedex,
    showModal,
    setShowModal,
    action,
    setAction,
  }

  return (
    <>
    <GlobalStyled/>
    <GlobalContext.Provider value={context}>
      <Router/>
      {showModal ? <Modal action={action}/>:''}
    </GlobalContext.Provider>
    </>
  );
}

export default App;
