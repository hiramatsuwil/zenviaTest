import axios from 'axios';

const filePath = 'https://www.breakingbadapi.com/api';

export const getCharacters = () => axios.get(`${filePath}/characters`)

export const getCharacterById = (id) => axios.get(`${filePath}/characters/${id}`)

export const getCharacterQuote = (char) => axios.get(`${filePath}/quote/random?author=${char}`)

