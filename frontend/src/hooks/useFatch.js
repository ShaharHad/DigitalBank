import { useState, useEffect} from 'react';
import axiosInstance from '../api/axiosInstance';

const useFetch = (url) => {
    const [data , setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(()  => {
        const fetchData = async () => {
            try {
                const res = await axiosInstance.get(url);
                if (!res.ok) {
                  throw new Error(`HTTP error! status: ${res.status}`);
                }
                setData(res.data);
                setError(null);
              } catch (err) {
                setError(err.message || "Server error");
                setData(null);
              } finally{
                setLoading(false);
              }
        };

        fetchData();
    }, [url]);

    return {data, loading, error};

}

export default useFetch;