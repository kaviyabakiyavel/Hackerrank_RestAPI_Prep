/*
=============================================================================
HackerRank Movies API Exercises
Base URL:
https://jsonmock.hackerrank.com/api/movies/

Search URL:
https://jsonmock.hackerrank.com/api/movies/search/?Title=<substr>&page=<page_number>

Example:
https://jsonmock.hackerrank.com/api/movies/search/?Title=spiderman&page=1
=============================================================================

1. Fetch all movie titles and return them sorted alphabetically.

2. Find the total number of movies matching a given title substring.

3. Find the latest released movie for a given title substring.

4. Find the oldest released movie for a given title substring.

5. Return all movie titles released after a specified year.

6. Return all movie titles released before a specified year.

7. Return all movie titles released between two given years.

8. Count the number of movies released in each year.

9. Find the year with the highest number of movies.

10. Return the first N movie titles after sorting alphabetically.

11. Return the last N movie titles after sorting alphabetically.

12. Return unique movie objects.

13. Remove duplicate movie titles and return a unique sorted list.

14. Find all movie titles whose names start with a given prefix.

15. Find all movie titles whose names end with a given suffix.

16. Find the longest movie title among all results.

17. Find the shortest movie title among all results.

18. Return movie titles sorted by year ascending.

19. Return movie titles sorted by year descending.

20. Return movie titles sorted by title length.

21. Find movies released in the same year as a given movie.

22. Search for multiple substrings and combine matching titles.

23. Fetch movie data from all pages without knowing total pages beforehand.

24. Fetch movie data from all pages in parallel.

25. Return the average release year of all movies.

26. Return the median release year of all movies.

27. Find the most common word appearing in movie titles.

28. Count how many movie titles contain a specific keyword.

29. Find titles containing more than a specified number of words.

30. Return all unique release years.

31. Find the movie title that appears most frequently.

32. Implement search with pagination support and custom page size.

33. Filter matching movies by exact year and return sorted titles.

34. Return movies along with IMDb IDs sorted by title.

35. Merge results from multiple searches and remove duplicates.

=============================================================================
*/

import React, { useEffect, useState } from 'react';

export default function MovieAPI() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
       let page = 1;
       let totalPages = 1;
       let allData = [];
       while(page <= totalPages){
          const res = await fetch(
            `https://jsonmock.hackerrank.com/api/movies?page=${page}`
          )
          const json = await res.json();
          totalPages = json.total_pages;
          allData.push(...json.data);;
          page++;
        }
        console.log("allData", allData)
        console.log("allData" , allData.length)
        setData(allData);

        // 1. All movie titles sorted alphabetically
        const movieTitles = allData
          .map((movie) => movie.Title)
          .sort((a, b) => a.localeCompare(b));
        console.log('1. movieTitles', movieTitles);

        // 2. Total movies matching title substring
        const searchText = 'Water';

        const matchedMovies = allData.filter((movie) =>
          movie.Title.toLowerCase().includes(searchText.toLowerCase())
        );

        console.log('2. Total Matching Movies', matchedMovies.length);

        // 3. Latest movie
        const latestMovie = allData.reduce((latest, movie) =>
          Number(movie.Year) > Number(latest.Year) ? movie : latest
        );

        console.log('3. Latest Movie', latestMovie);

        // 4. Oldest movie
        const oldestMovie = allData.reduce((oldest, movie) =>
          Number(movie.Year) < Number(oldest.Year) ? movie : oldest
        );

        console.log('4. Oldest Movie', oldestMovie);

        // 5. Movies after year
        const after2010 = allData.filter((movie) => Number(movie.Year) > 2010);

        console.log('5. Movies After 2010', after2010);

        // 6. Movies before year
        const before2010 = allData.filter((movie) => Number(movie.Year) < 2010);

        console.log('6. Movies Before 2010', before2010);

        // 7. Movies between years
        const betweenYears = allData.filter(
          (movie) => Number(movie.Year) >= 1995 && Number(movie.Year) <= 2006
        );

        console.log('7. Movies Between Years', betweenYears);

        // 8. Count movies per year
        const moviesPerYear = allData.reduce((acc, movie) => {
          acc[movie.Year] = (acc[movie.Year] || 0) + 1;
          return acc;
        }, {});

        console.log('8. Movies Per Year', moviesPerYear);

        // 9. Year having highest movie count
        const highestYear = Object.entries(moviesPerYear).reduce((max, val) =>
          val[1] > max[1] ? val : max
        );

        console.log('9. Highest Year', highestYear);

        // 10. First 5 movie titles
        const first5Titles = [...allData]
          .sort((a, b) => a.Title.localeCompare(b.Title))
          .slice(0, 5);

        console.log('10. First 5 Titles', first5Titles);

        // 11. Last 5 movie titles
        const last5Titles = [...allData]
          .sort((a, b) => a.Title.localeCompare(b.Title))
          .slice(-5);

        console.log('11. Last 5 Titles', last5Titles);

        // 12. Unique movie objects
        const uniqueMovies = [
          ...new Map(allData.map((movie) => [movie.Title, movie])).values(),
        ];

        console.log('12. Unique Movies', uniqueMovies);

        // 13. Remove duplicate movie titles
        const uniqueTitles = [
          ...new Set(allData.map((movie) => movie.Title)),
        ].sort((a, b) => a.localeCompare(b));

        console.log('13. Unique Titles', uniqueTitles);

        // 14. Starts with prefix
        const prefix = 'Spider';

        const startsWithPrefix = allData.filter((movie) =>
          movie.Title.toLowerCase().startsWith(prefix.toLowerCase())
        );

        console.log('14. Starts With Prefix', startsWithPrefix);

        // 15. Ends with suffix
        const suffix = 'Man';

        const endsWithSuffix = allData.filter((movie) =>
          movie.Title.toLowerCase().endsWith(suffix.toLowerCase())
        );

        console.log('15. Ends With Suffix', endsWithSuffix);

        // 16. Longest title
        const longestTitle = allData.reduce((a, b) =>
          a.Title.length > b.Title.length ? a : b
        );

        console.log('16. Longest Title', longestTitle);

        // 17. Shortest title
        const shortestTitle = allData.reduce((a, b) =>
          a.Title.length < b.Title.length ? a : b
        );

        console.log('17. Shortest Title', shortestTitle);

        // 18. Sort by year ascending
        const yearAsc = [...allData].sort(
          (a, b) => Number(a.Year) - Number(b.Year)
        );

        console.log('18. Year Ascending', yearAsc);

        // 19. Sort by year descending
        const yearDesc = [...allData].sort(
          (a, b) => Number(b.Year) - Number(a.Year)
        );

        console.log('19. Year Descending', yearDesc);

        // 20. Sort by title length
        const titleLengthSort = [...allData].sort(
          (a, b) => a.Title.length - b.Title.length
        );

        console.log('20. Title Length Sort', titleLengthSort);

        // 21. Movies released in same year as given movie
        const targetMovie = allData.find(
          (movie) => movie.Title === 'Batman Begins'
        );

        const sameYearMovies = allData.filter(
          (movie) =>
            movie.Year === targetMovie?.Year &&
            movie.Title !== targetMovie?.Title
        );

        console.log('21. Same Year Movies', sameYearMovies);

        // 22. Search multiple substrings
        const substrings = ['Spider', 'Water', 'Man'];

        const multipleSearchResults = allData.filter((movie) =>
          substrings.some((substr) =>
            movie.Title.toLowerCase().includes(substr.toLowerCase())
          )
        );

        console.log('22. Multiple Search Results', multipleSearchResults);

        // 23. Average release year
        const averageYear =
          allData.reduce((sum, movie) => sum + Number(movie.Year), 0) /
          allData.length;

        console.log('23. Average Year', averageYear);

        // 24. Median release year
        const years = allData
          .map((movie) => Number(movie.Year))
          .sort((a, b) => a - b);

        const medianYear =
          years.length % 2 === 0
            ? (years[years.length / 2 - 1] + years[years.length / 2]) / 2
            : years[Math.floor(years.length / 2)];

        console.log('24. Median Year', medianYear);

        // 25. Most common word
        const words = allData.flatMap((movie) =>
          movie.Title.toLowerCase()
            .replace(/[^\w\s]/g, '')
            .split(/\s+/)
        );

        const wordCount = words.reduce((acc, word) => {
          acc[word] = (acc[word] || 0) + 1;
          return acc;
        }, {});

        const commonWord = Object.entries(wordCount).reduce((a, b) =>
          a[1] > b[1] ? a : b
        );

        console.log('25. Most Common Word', commonWord);

        // 26. Count titles containing keyword
        const keyword = 'Man';

        const keywordMovies = allData.filter((movie) =>
          movie.Title.toLowerCase().includes(keyword.toLowerCase())
        );

        console.log('26. Keyword Count', keywordMovies.length);

        // 27. Titles having more than N words
        const wordLimit = 3;

        const moreThanNWords = allData.filter(
          (movie) => movie.Title.split(' ').length > wordLimit
        );

        console.log('27. More Than N Words', moreThanNWords);

        // 28. Unique release years
        const uniqueYears = [...new Set(allData.map((movie) => movie.Year))];

        console.log('28. Unique Years', uniqueYears);

        // 29. Most repeated title
        const titleCount = allData.reduce((acc, movie) => {
          acc[movie.Title] = (acc[movie.Title] || 0) + 1;
          return acc;
        }, {});

        const repeatedTitle = Object.entries(titleCount).reduce((a, b) =>
          a[1] > b[1] ? a : b
        );

        console.log('29. Repeated Title', repeatedTitle);

        // 30. Filter by exact year
        const exactYear = '2005';

        const moviesByYear = allData
          .filter((movie) => movie.Year === exactYear)
          .sort((a, b) => a.Title.localeCompare(b.Title));

        console.log('30. Movies By Year', moviesByYear);

        // 31. Movies with imdb id sorted
        const movieImdb = [...allData]
          .map((movie) => ({
            Title: movie.Title,
            imdbID: movie.imdbID,
          }))
          .sort((a, b) => a.Title.localeCompare(b.Title));

        console.log('31. Movie IMDb', movieImdb);

        // 32. Merge results and remove duplicates
        const mergedResults = [
          ...new Map(allData.map((movie) => [movie.imdbID, movie])).values(),
        ];

        console.log('32. Merged Unique Results', mergedResults);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Movies API Examples</h2>

    {loading ? (
        <h3>Loading...</h3>
      ) : (
        <table border="1" cellPadding="5">
          <thead>
            <tr>
              <th>Title</th>
              <th>Year</th>
              <th>IMDb ID</th>
            </tr>
          </thead>
          <tbody>
            {data.slice(0, 20).map((movie) => (
              <tr key={movie.imdbID}>
                <td>{movie.Title}</td>
                <td>{movie.Year}</td>
                <td>{movie.imdbID}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
