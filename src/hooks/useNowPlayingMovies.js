import { API_CONSTANTS } from '../utils/constants';
import { useDispatch ,useSelector} from 'react-redux';
import { addPlayingMovies } from '../utils/movieSlice';
import { useEffect } from 'react';


const useNowPlayingMovies =()=>{
    const dispatch=useDispatch();

    const nowPlayingMovies = useSelector(
        (store) => store.movies.nowPlayingMovies
      );
    

 const getApiData= async () =>{
  const jsonData=await fetch('https://api.themoviedb.org/3/movie/now_playing?page=1',API_CONSTANTS);
  const json=await jsonData.json();
  dispatch(addPlayingMovies(json.results))
  console.log(json)
 }

 useEffect(()=>{
  !nowPlayingMovies && getApiData();
 },[])

}

export default useNowPlayingMovies;