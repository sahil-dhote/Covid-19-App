import "./App.css";
import'./components/InfoTable.css'
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
            

            <div className="InfoboxWrapper">
                <Infobox/>
            </div>


            <div className="allbtn">
            <h3 id="sorttitle"> Sort By:- </h3>
            <div className="btn">
                
                <button type="button" id="btnone" class="btn btn-info" onClick={handleSort} value="country">Country Name</button>
                <button type="button" id="btnone" class="btn btn-info" onClick={handleSort} value="new">New Cases</button>
                <button type="button" id="btnone" class="btn btn-info" onClick={handleSort} value="recovered">Recovered Cases</button>
                <button type="button" id="btnfour" class="btn btn-info" onClick={handleSort} value="active">Active Cases</button>
                <button type="button" id="btnfive" class="btn btn-info" onClick={handleSort} value="deaths">Total Deaths</button>
                </div>
                </div>

            <div className="tableData">
                <table className="table">
               
                <tr>
                    <td >S.No</td>
                    <td>Country</td>
                    <td>New Cases</td>
                    <td>Recovered Cases</td>
                    <td>Active Cases</td>
                    <td>Total Deaths</td>
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
                </table>
            </div>
            
        </div>
    );
}

export default App;