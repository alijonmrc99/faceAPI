import { useRef, useState, useEffect } from "react";

export function useFetch(url, method, body = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const isCurrent = useRef(true);
  const DefaultUrl = useRef("https://quiz.firefox.uz/api");
  useEffect(() => {
    return () => {
      isCurrent.current = false;
    };
  }, []);

  useEffect(() => {
    setLoading(true);
    // get methodlarni ushlash
    // -------------------------------------
    if (method === "get") {
      fetch(`${DefaultUrl}${url}`)
        .then((response) => response.json())
        .then((data) => {
          if (isCurrent) {
            setLoading(false);
            setData(data);
          }
        });
    }

    // post methodlarni ushlash
    // -------------------------------------
    if (method === "post") {
      fetch(`${DefaultUrl}${url}`, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(body), // body data type must match "Content-Type" header
      }).then((data) => {
        if (isCurrent) {
          setData(data.json());
          setLoading(false);
          console.log(data.json()); // JSON data parsed by `data.json()` call
        }
      });
    }
  }, [url]);

  return { data, loading };
}
