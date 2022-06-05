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
    try {
      setLimit((prev) => prev + 10);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
    }

    // setPage((prev) => prev + 1);
  };

  const getFilmFromData = async () => {
    try {
      const films = await fetchMediaList(limit, page);
      setFilms(films);
      console.log(films);
    } catch (err) {
      console.log(err);
      if (err instanceof Error) {
        setError(err.message);
        toast.error(err.message);
      }
    }
  };
  useEffect(() => {
    try {
      getFilmFromData();
      toast.success("Success in useEffect");
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      }
    }
  }, [limit]);

  return (
    <div>
      {films.map((film) => {
        return (
          <div key={film.id}>
            <div>
              <h1>
                {film.title}, {film.id}
              </h1>
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
