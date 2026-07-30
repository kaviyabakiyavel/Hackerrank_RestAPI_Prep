import React, { useEffect, useState } from "react";

export function MovieAPI() {
  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        let page = 1;
        let totalPages = 1;
        let allData = [];
        while (page <= totalPages) {
          const res = await fetch(
            `https://jsonmock.hackerrank.com/api/movies/?page=${page}`,
          );
          const json = await res.json();
          totalPages = json.total_pages;
          allData.push(...json.data);
          page++;
        }
        console.log("allData", allData);
        console.log("allData.length", allData.length);
        setData(allData);
        const movieTitle = allData
          .map((movie) => movie.Title)
          .sort((a, b) => a.localeCompare(b));
        console.log("movieTitle", movieTitle);

        const searchWord = "Waterworld";
        const totalNumMovies = allData.filter((movie) =>
          movie.Title.toLowerCase().includes(searchWord.toLowerCase())
        ).length;
        console.log("totalNumMovies", totalNumMovies);

        const latestMovie  = allData.reduce((latest,movie)=> Number(movie.Year) > Number(latest.Year) ? movie : latest);
        console.log("latestMovie",latestMovie)

        const oldestMovie = allData.reduce((oldest, movie) => Number(movie.Year) < Number(oldest.Year) ? movie : oldest);
        console.log("oldestMovie", oldestMovie);

        const movietitleByYear = allData.filter((movie)=> Number(movie.Year) === 1985)
        console.log("movietitleByYear", movietitleByYear);

        const releasedAfterSpecificYear = allData.filter((movie) => Number(movie.Year) > 2000)
        console.log("releasedAfterSpecificYear", releasedAfterSpecificYear);

        const releasedBeforeSpecificYear = allData.filter((movie) => Number(movie.Year) < 2000)
        console.log("releasedBeforeSpecificYear", releasedBeforeSpecificYear);

       const bwspecificYear = allData.filter((movie)=> Number(movie.Year) >= 1995 && Number(movie.Year) <= 1998);
       console.log("bwspecificYear", bwspecificYear);

       const countNumberMovies = allData.reduce((count,movie)=> {})
       
      } catch (err) {}
    };
    fetchData();
  }, []);

  return <div></div>;
}
 