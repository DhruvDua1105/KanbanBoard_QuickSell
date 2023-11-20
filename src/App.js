import React, { useState, useEffect } from 'react';
import Board from './Components/Board';
import Navbar from './Components/Navbar'
import './App.css';

function App() {
  const [tickets, settickets] = useState([]);
  const [users, setusers] = useState([]);
  const [groupedTickets, setgroupedTickets] = useState([]);
  const [displayOption, setDisplayOption] = useState(localStorage.getItem("group") || 'status');
  const [sortOption, setSortOption] = useState(localStorage.getItem("sort") || null);

  const priorityText = [
    {
      "id": "1",
      "name": "Low"
    },
    {
      "id": "2",
      "name": "Medium"
    },
    {
      "id": "3",
      "name": "High"
    },
    {
      "id": "4",
      "name": "Urgent"
    },
    {
      "id": "null",
      "name": "No Priority"
    }
  ]


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.quicksell.co/v1/internal/frontend-assignment');
        const data = await response.json();
        data.tickets.map((ticket) =>
          ticket.user = data.users.find((usr) => usr.id === ticket.userId)
        )
        settickets(data.tickets);
        setusers(data.users);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const regroup = (objarr, field, defaultKey = 'null') => {
      return objarr.reduce(function (r, a) {
        r[a[field] || defaultKey] = r[a[field] || defaultKey] || [];
        r[a[field] || defaultKey].push(a);
        return r;
      }, Object.create(null));
    }

    let groupingResponse = regroup(tickets, displayOption);

    if (displayOption === "userId") {
      let userIDs = Object.keys(groupingResponse)

      userIDs.map((uid) => {
        groupingResponse[users.find((user) => user.id === uid).name] = groupingResponse[uid]
        delete groupingResponse[uid]
      })
    }

    if (displayOption === "priority") {
      let userIDs = Object.keys(groupingResponse)

      userIDs.map((uid) => {
        groupingResponse[priorityText.find((user) => user.id === uid).name] = groupingResponse[uid]
        delete groupingResponse[uid]
      })
    }

    setgroupedTickets(groupingResponse);

  }, [tickets, displayOption])

  const handleSelectDisplayOption = (option) => {
    setDisplayOption(option);
  };

  const handleSortChange = (newSortOption) => {
    setSortOption(newSortOption);
  };


  return (
    <div className="App">
      <Navbar onSelectDisplayOption={handleSelectDisplayOption} onSort={handleSortChange} />
      <Board columns={groupedTickets} sortOption={sortOption} />
    </div>
  );
}

export default App;
