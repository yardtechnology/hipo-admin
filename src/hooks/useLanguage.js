import { useState, useEffect } from "react";
import { useIsMounted } from "hooks";
import { BASE_URL } from "configs";

const useLanguage = () => {
  const [languages, setLanguages] = useState(null);
  const { isMounted } = useIsMounted();
  const [realtime, setRealtime] = useState(false);
  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const response = await fetch(`${BASE_URL}/language/all-language`, {
          // method: "GET",
          // body: JSON.stringify({ ...values }),
          // headers: {
          //   "Content-Type": "application/json",
          // },
        });
        const arr = await response.json();
        const sortArr = arr?.success?.data?.sort(
          (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
        );
        isMounted.current && setLanguages(sortArr);
      } catch (error) {
        console.log(error);
      }
    };
    fetchLanguages();
  }, [isMounted, realtime]);
  return {
    languages,
    setRealtime,
  };
};

export default useLanguage;
