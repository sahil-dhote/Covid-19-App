import "./App.css";
import { useState, useEffect } from "react";
import Infobox from "./components/Infobox";
import Infotable from "./components/InfoTable";
import {Sort} from "./components/Sort";
import Navbar from "./components/Navbar"


function App() {
    const [countriesData, setCountriesData] = useState([]);

    useEffect(() => {
        const getAllCountries = async () => {
            const countriesList = await fetch(
                "https://covid-193.p.rapidapi.com/statistics",
                {
                    method: "GET",
                    headers: {
                        "x-rapidapi-host": "covid-193.p.rapidapi.com",
                        "x-rapidapi-key":
                            "34880edaa3mshe862cfb3a401212p1d7722jsn58fd9ac0425a",
                    },
                }
            )
                .then((response) => {
                    return response.json();
                })
                .then((data) => data.response)
                .catch((err) => {
                    console.error(err);
                });
            for(let country of countriesList){
                if(country.cases.new == null){
                    country.cases.new = "+0";
                }
                country.cases.new = parseInt(country.cases.new.slice(1))
            }

            const sortedCountriesData = Sort(countriesList);
            setCountriesData(sortedCountriesData);
           
        };
        getAllCountries();
    },[]);


    const handleSort = function(e){
        const sortedList = Sort(countriesData,e.target.value)
        setCountriesData(sortedList);
    }

    return (
        <div className="App">
           
            <Navbar />
            

            <div className="caseBoxWrapper">
                <Infobox/>
            </div>

            <div className="tableData">
               
                <tr>
                    <td><button onClick={handleSort} value="country">Country Name</button></td>
                    <td><button onClick={handleSort} value="new">New Cases</button></td>
                   

                    <td><button onClick={handleSort} value="active">Active Cases</button></td>
                    <td><button onClick={handleSort} value="recovered">Recovered Cases</button></td>
                    <td><button onClick={handleSort} value="deaths">Total Deaths</button></td>
                </tr>

                {countriesData.map((country, index) => {
                    return (
                        <Infotable
                            SNo={index + 1}
                            country={country.country}
                            newCases={country.cases.new != null ? country.cases.new : "+0"}
                            active={country.cases.active}
                            recovered={country.cases.recovered}
                            deaths={country.deaths.total}
                        />
                    );
                })}
            </div>
            
        </div>
    );
}

export default App;