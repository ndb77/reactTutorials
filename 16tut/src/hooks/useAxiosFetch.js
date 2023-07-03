import { useState, useEffect } from "react";
import axios from "axios";

const useAxiosFetch = (dataUrl) => {
  const [data, setData] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    //resets connection
    const source = axios.CancelToken.source();

    const fecthData = async (url) => {
      setIsLoading(true);
      try {
        const response = await axios.get(url, {
          cancelToken: source.token,
        });
        if (isMounted) {
          setData(response.data);
          setFetchError(null);
        }
      } catch (err) {
        if (isMounted) {
          setFetchError(err.message);
          setData([]);
        }
      } finally {
        isMounted && setIsLoading(false); // verify that isLoading is working
      }
    };
    //fetches the data using the dataUrl
    fecthData(dataUrl);

    const cleanUp = () => {
      console.log("cleanup function");
      isMounted = false;
      source.cancel();
    };
    return cleanUp;

  }, [dataUrl]);

  return { data, fetchError, isLoading };
};

export default useAxiosFetch
