/*
=============================================================================
HackerRank Events API Interview Questions
API:
https://jsonmock.hackerrank.com/api/events

Fields:
id
name
genres
ticket_prices
capacity_left
people_registered
duration
date
country
organized_by
type

=============================================================================
QUESTIONS
=============================================================================

1. Fetch all events from all pages.

2. Get all event names.

3. Get all event names sorted alphabetically.

4. Count total events.

5. Find latest event.

6. Find oldest event.

7. Filter all virtual events.

8. Filter all indoor events.

9. Filter all outdoor events.

10. Filter events by organizer.

11. Filter events by country.

12. Filter events by genre.

13. Find first virtual event.

14. Check if any event contains "Reggae" genre.

15. Check if all events are virtual.

16. Find event with highest registrations.

17. Find event with lowest registrations.

18. Find event with highest capacity left.

19. Find longest duration event.

20. Find shortest duration event.

21. Calculate average duration.

22. Sort events by duration ascending.

23. Sort events by duration descending.

24. Sort events by date ascending.

25. Sort events by date descending.

26. Find events after a given date.

27. Find events before a given date.

28. Get unique countries.

29. Get unique organizers.

30. Get unique genres.

31. Count events by country.

32. Count events by organizer.

33. Count events by type.

34. Count genres.

35. Find most common genre.

36. Find highest ticket price.

37. Find lowest ticket price.

38. Find average ticket price.

39. Find top 5 registered events.

40. Find longest event name.

41. Find shortest event name.

42. Find organizer with most events.

=============================================================================
REACT CODE
=============================================================================
*/

import React, { useEffect, useState } from "react";

export default function EventAPIPractice() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        let page = 1;
        let totalPages = 1;
        let allEvents = [];

        while (page <= totalPages) {
          const response = await fetch(
            `https://jsonmock.hackerrank.com/api/events?page=${page}`
          );

          const json = await response.json();

          totalPages = json.total_pages;

          allEvents.push(...json.data);

          page++;
        }

        setEvents(allEvents);

        // 2. Event Names
        const eventNames = allEvents.map(
          (event) => event.name
        );

        // 3. Event Names Sorted
        const sortedNames = [...eventNames].sort(
          (a, b) => a.localeCompare(b)
        );

        // 4. Total Events
        const totalEvents = allEvents.length;

        // 5. Latest Event
        const latestEvent = allEvents.reduce((a, b) =>
          new Date(a.date) > new Date(b.date) ? a : b
        );

        // 6. Oldest Event
        const oldestEvent = allEvents.reduce((a, b) =>
          new Date(a.date) < new Date(b.date) ? a : b
        );

        // 7. Virtual Events
        const virtualEvents = allEvents.filter(
          (event) => event.type === "virtual"
        );

        // 10. Filter By Organizer
        const organizerEvents = allEvents.filter(
          (event) =>
            event.organized_by ===
            "empower integrated markets"
        );

        // 11. Filter By Country
        const argentinaEvents = allEvents.filter(
          (event) => event.country === "Argentina"
        );

        // 12. Filter By Genre
        const reggaeEvents = allEvents.filter(
          (event) =>
            event.genres.includes("Reggae")
        );

        // 13. First Virtual Event
        const firstVirtual = allEvents.find(
          (event) => event.type === "virtual"
        );

        // 14. Some
        const hasReggae = allEvents.some(
          (event) =>
            event.genres.includes("Reggae")
        );

        // 15. Every
        const allVirtual = allEvents.every(
          (event) => event.type === "virtual"
        );

        // 16. Highest Registration
        const highestRegistration =
          allEvents.reduce((a, b) =>
            a.people_registered >
            b.people_registered
              ? a
              : b
          );

        // 17. Lowest Registration
        const lowestRegistration =
          allEvents.reduce((a, b) =>
            a.people_registered <
            b.people_registered
              ? a
              : b
          );

        // 18. Highest Capacity
        const highestCapacity =
          allEvents.reduce((a, b) =>
            a.capacity_left > b.capacity_left
              ? a
              : b
          );

        // 19. Longest Duration
        const longestDuration =
          allEvents.reduce((a, b) =>
            a.duration > b.duration ? a : b
          );

        // 20. Shortest Duration
        const shortestDuration =
          allEvents.reduce((a, b) =>
            a.duration < b.duration ? a : b
          );

        // 21. Average Duration
        const averageDuration =
          allEvents.reduce(
            (sum, event) =>
              sum + event.duration,
            0
          ) / allEvents.length;

        // 22. Duration Asc
        const durationAsc = [...allEvents].sort(
          (a, b) => a.duration - b.duration
        );

        // 23. Duration Desc
        const durationDesc = [...allEvents].sort(
          (a, b) => b.duration - a.duration
        );

        // 24. Date Asc
        const dateAsc = [...allEvents].sort(
          (a, b) =>
            new Date(a.date) - new Date(b.date)
        );

        // 25. Date Desc
        const dateDesc = [...allEvents].sort(
          (a, b) =>
            new Date(b.date) - new Date(a.date)
        );

        // 26. After Date
        const afterDate = allEvents.filter(
          (event) =>
            new Date(event.date) >
            new Date("2025-01-01")
        );

        // 27. Before Date
        const beforeDate = allEvents.filter(
          (event) =>
            new Date(event.date) <
            new Date("2025-01-01")
        );

        // 28. Unique Countries
        const uniqueCountries = [
          ...new Set(
            allEvents.map(
              (event) => event.country
            )
          ),
        ];

        // 29. Unique Organizers
        const uniqueOrganizers = [
          ...new Set(
            allEvents.map(
              (event) => event.organized_by
            )
          ),
        ];

        // 30. Unique Genres
        const uniqueGenres = [
          ...new Set(
            allEvents.flatMap(
              (event) => event.genres
            )
          ),
        ];

        // 31. Count By Country
        const countryCount = allEvents.reduce(
          (acc, event) => {
            acc[event.country] =
              (acc[event.country] || 0) + 1;
            return acc;
          },
          {}
        );

        // 32. Count By Organizer
        const organizerCount =
          allEvents.reduce((acc, event) => {
            acc[event.organized_by] =
              (acc[event.organized_by] || 0) + 1;

            return acc;
          }, {});

        // 33. Count By Type
        const typeCount = allEvents.reduce(
          (acc, event) => {
            acc[event.type] =
              (acc[event.type] || 0) + 1;
            return acc;
          },
          {}
        );

        // 34. Genre Count
        const genreCount = allEvents
          .flatMap((event) => event.genres)
          .reduce((acc, genre) => {
            acc[genre] =
              (acc[genre] || 0) + 1;
            return acc;
          }, {});

        // 35. Most Common Genre
        const mostCommonGenre =
          Object.entries(genreCount).reduce(
            (a, b) =>
              a[1] > b[1] ? a : b
          );

        // 36. Highest Ticket Price
        const highestPrice = Math.max(
          ...allEvents.flatMap(
            (event) => event.ticket_prices
          )
        );

        // 37. Lowest Ticket Price
        const lowestPrice = Math.min(
          ...allEvents.flatMap(
            (event) => event.ticket_prices
          )
        );

        // 38. Average Ticket Price
        const prices = allEvents.flatMap(
          (event) => event.ticket_prices
        );

        const averagePrice =
          prices.reduce((a, b) => a + b, 0) /
          prices.length;

        // 39. Top 5 Registrations
        const top5Events = [...allEvents]
          .sort(
            (a, b) =>
              b.people_registered -
              a.people_registered
          )
          .slice(0, 5);

        // 40. Longest Event Name
        const longestName =
          allEvents.reduce((a, b) =>
            a.name.length > b.name.length
              ? a
              : b
          );

        // 41. Shortest Event Name
        const shortestName =
          allEvents.reduce((a, b) =>
            a.name.length < b.name.length
              ? a
              : b
          );

        // 42. Organizer With Most Events
        const topOrganizer =
          Object.entries(
            organizerCount
          ).reduce((a, b) =>
            a[1] > b[1] ? a : b
          );

        console.log({
          sortedNames,
          totalEvents,
          latestEvent,
          oldestEvent,
          virtualEvents,
          organizerEvents,
          argentinaEvents,
          reggaeEvents,
          firstVirtual,
          hasReggae,
          allVirtual,
          highestRegistration,
          lowestRegistration,
          highestCapacity,
          longestDuration,
          shortestDuration,
          averageDuration,
          uniqueCountries,
          uniqueOrganizers,
          uniqueGenres,
          mostCommonGenre,
          highestPrice,
          lowestPrice,
          averagePrice,
          top5Events,
          longestName,
          shortestName,
          topOrganizer,
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Events API Practice</h2>

      <table border="1" cellPadding="5">
        <thead>
          <tr>
            <th>Name</th>
            <th>Country</th>
            <th>Type</th>
            <th>Organizer</th>
          </tr>
        </thead>

        <tbody>
          {events.slice(0, 20).map((event) => (
            <tr key={event.id}>
              <td>{event.name}</td>
              <td>{event.country}</td>
              <td>{event.type}</td>
              <td>{event.organized_by}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}