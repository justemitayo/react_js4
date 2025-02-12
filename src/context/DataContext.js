import { createContext, useState, useEffect } from "react";
import useAxiosFetch from '../hooks/useAxiosFetch';

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
    const [posts, setPosts]= useState([]);
    const [search, setSearch]= useState('');
    const [searchResults, setSearchResults] = useState([]);

  
    const {data, fetchError, isLoading} = useAxiosFetch('http://localhost:3500/posts');
  
    useEffect(() => {
      setPosts(data);
    }, [data])
    console.log(data)
    // useEffect(() => {
    //   const fetchPost = async () => {
    //     try{
    //       const response = await api.get('/posts');
    //       setPosts(response.data);
    //     }catch (err) {
    //       if (err.response) {
    //         console.log(err.response.data);
    //         console.log(err.response.status);
    //         console.log(err.response.headers);
    //       } else {
    //         console.log(`Error:${err.message}`);
    //       } 
    //     }
    //   }
    //   fetchPost();
    // },[])
  
    useEffect(() => {
      const filteredEffect = posts.filter(item => ((item.body).toLowerCase()).includes(search.toLowerCase())
      || ((item.title).toLowerCase()).includes(search.toLowerCase()));
      
      setSearchResults(filteredEffect.reverse());
    },[posts, search]);

    return(
        <DataContext.Provider value={{ 
            search, setSearch, setPosts,
            searchResults, fetchError, isLoading,
            posts
        }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContext;