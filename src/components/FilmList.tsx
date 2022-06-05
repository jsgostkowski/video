import React, { useEffect, useState } from "react";
import { fetchMediaList, MediaList } from "../utilities/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const FilmList = () => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [films, setFilms] = useState<MediaList[]>([]);
  const [error, setError] = useState<string | null>(null);

  const loadMoreFilms = () => {
    setLimit((prev) => prev + 10);
    // setPage((prev) => prev + 1);
  };

  const getFilmFromData = async () => {
    try {
      const films = await fetchMediaList(limit, page);
      setFilms(films);
      console.log(films);
      toast.success("Success");
    } catch (err) {
      console.log(err);
      if (err instanceof Error) {
        setError(err.message);
        toast.error(err.message);
      }
    }
  };
  useEffect(() => {
    getFilmFromData();
  }, [limit]);

  if (error) {
    return (
      <div>
        {" "}
        <ToastContainer theme="light" />
      </div>
    );
  }
  return (
    <div>
      {films.map((film) => {
        return (
          <div key={film.id}>
            <div>
              <h1>{film.title}</h1>
              <p>{film.actors}</p>
              <p>{film.director}</p>
            </div>
          </div>
        );
      })}
      <button onClick={loadMoreFilms}>LoadMore</button>
      <ToastContainer theme="light" />
    </div>
  );
};
