import { useState, useEffect } from "react";
import { useIsMounted } from "hooks";
import { BASE_URL } from "configs";

const useContacts = () => {
  const [contacts, setContacts] = useState(null);
  const [realtime, setRealtime] = useState(false);
  const { isMounted } = useIsMounted();
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await fetch(`${BASE_URL}/contact-us-forms/all`, {
          method: "GET",
          // body: JSON.stringify({ ...values }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("SAL")}`,
          },
        }); // response.json(); // response.json().then(data => console.log(data)); // response.json().then(data => console.log(data));
        const arr = await response.json();

        const sortArr = arr?.data?.sort(
          (a, b) => new Date(b?.createdAt) - new Date(a?.createdAt)
        );
        isMounted.current && setContacts(sortArr);
      } catch (error) {
        console.log(error);
      }
    };
    fetchContacts();
  }, [isMounted, realtime]);
  return {
    contacts,
    setRealtime,
  };
};

export default useContacts;
