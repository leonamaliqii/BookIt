import { useEffect, useState } from "react";
import axios from "axios";

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!url) return; // ⬅ Skip fetch if URL is null or undefined**

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await axios.get(url);
            
            setData(res.data);
        } catch (err) {
            setError(err);
        }
        setLoading(false)
    };
    fetchData();
    }, [url]);

const reFetch = async () => {
    if (!url) return; // ⬅ Skip if URL is null or undefined**

        setLoading(true);
        try {
            const res = await axios.get(url);
            setData(res.data);
        } catch (err) {
            setError(err);
        }
        setLoading(false)
    };

    return { data, loading, error, reFetch };
};

export default useFetch;