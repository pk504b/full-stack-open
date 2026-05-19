import { useEffect, useState } from "react";

export const useRepositories = () => {
  const [repositories, setRepositories] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchRepositories = async () => {
    setLoading(true);

    const response = await fetch('http://172.18.139.126:5000/api/repositories');
    const data = await response.json();

    setRepositories(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchRepositories();
  }, [])

  return { repositories, loading, refetch: fetchRepositories };
};