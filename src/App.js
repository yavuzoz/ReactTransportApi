/*
 *iki farkli state olusturdum, bir from ve bir de to icin. bu stateleri fetch API de cagirdigim yerde yerlestirdim
 *useEffect te stateleri koydum ve inputta girdigim her degere göre state güncellendi, data her state te farkli cagirim yapti. inputa girdigim her kalkis ve varis degerine göre input altina listeleme yaptim. Program calisiyor, calistirmada sorun yasarsaniz lütfen bana ulasin ,
 *ancak search tusunu aktif edemedim. Data ekrana yazdirdim.
 *tüm herseyi kendim yaptim, baska kimseden yardim almadim
 */

import React, { useState, useEffect } from "react";

function App() {
  const [data, setData] = useState({});
  const [stateFrom, setStateFrom] = useState("");
  const [stateTo, setStateTo] = useState("");
  const [stateDate, setStateDate] = useState("");

  useEffect(() => {
    getLocationsList();
  }, [stateFrom, stateTo]);

  const getLocationsList = async () => {
    try {
      const response = await fetch(
        `http://transport.opendata.ch/v1/connections?from=${stateFrom}&to=${stateTo}`
      );
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.log("error");
    }
  };

  const handleChange = (event) => {
    setStateFrom(event.target.value);
  };

  const handleToChange = (event) => {
    setStateTo(event.target.value);
  };
  const handleDateChange = (event) => {
    setStateDate(event.target.value);
  };

  const createStationList = () => {
    App(stateFrom);
    App(stateTo);
  };

  console.log(data);

  return (
    <div className="app">
      <div className="search">
        <input
          aria-label="from"
          type="text"
          className="form-control"
          id="from"
          placeholder="from"
          value={stateFrom}
          onChange={handleChange}
          aria-required="true"
        />
      </div>
      <div className="search">
        <input
          aria-label="text"
          type="text"
          className="form-control"
          id="to"
          placeholder="to"
          value={stateTo}
          onChange={handleToChange}
          aria-required="true"
        />
      </div>
      <div className="search">
        <input
          aria-label="from"
          type="date"
          className="form-control"
          id="from"
          placeholder="date choose"
          value={stateDate}
          onChange={handleDateChange}
          aria-required="true"
        />
      </div>
      <div className="button">
        <button
          type="submit"
          class="btn btn-primary"
          onClick={createStationList}
        >
          Search..
        </button>
      </div>
      <div className="container">
        <hr />
        {data.connections &&
          data.connections.map((item, index) => (
            <>
              <div key={index}>
                No: {index + 1}
                <hr />
                <p>
                  platform:
                  {item.from.platform}
                </p>
                <p>
                  Departure:
                  {item.from.departure}
                </p>
                <p>
                  Arrival:
                  {item.to.arrival}
                </p>
                <hr />
              </div>
            </>
          ))}
      </div>
    </div>
  );
}

export default App;
