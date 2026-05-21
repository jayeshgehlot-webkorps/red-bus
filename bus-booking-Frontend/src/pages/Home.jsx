import React, { useEffect } from 'react'
import Search from '../components/Search'
import Allbuses from '../components/Allbuses'
import { useDispatch } from 'react-redux'
import { setBuses } from '../redux/slices/busSlice'
import axios from "axios"
const Home = () => {
  const dispatch = useDispatch();

  async function busesFetch() {
    try {

      const bus = await axios.get("http://localhost:3000/api/bus/buses")
      if (bus.data) {
        dispatch(setBuses(bus.data.allbus));
      }
    } catch (er) {
      console.log("error occur");
    }
  }
  busesFetch();

  return (
    <div>
      <Search />
      <Allbuses />
    </div>
  )
}

export default Home