import React, { useEffect, useState } from "react";
import { fetchMediaList, MediaList } from "../utilities/api";

export const FilmList = () => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [films, setFilms] = useState<MediaList[]>([]);

  const loadMoreFilms = () => {
    setLimit((prev) => prev + 10);
    // setPage((prev) => prev + 1);
  };

  const getFilmFromData = async () => {
    try {
      const films = await fetchMediaList(limit, page);
      setFilms(films);
      console.log(films);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getFilmFromData();
  }, [limit]);

  return (
    <div>
      {films.map((film) => {
        return (
          <div key={film.id}>
            <li>{film.title}</li>
          </div>
        );
      })}
      <button onClick={loadMoreFilms}>LoadMore</button>
    </div>
  );
};
