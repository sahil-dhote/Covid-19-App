import React, { useState, useEffect } from 'react';
import './Infobox.css';

function Infobox()
{
    const [countryData, setCountryData] = useState({
        cases: {
            active:<div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>,
            recovered: <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>,
        },
        deaths: {
            total: <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>,
        },
    });

    //This is used for Sorting the Data
    const Sort = (data,caseType="new") => {
        let sortedData = [...data];
    
        if(caseType==="country"){
            sortedData.sort((a, b) => a.country<b.country ? -1 : 1);
        }
        else if(caseType==="new"){
            sortedData.sort((a, b) => a.cases.new>b.cases.new ? -1 : 1);
        }
        else if(caseType==="active"){
            sortedData.sort((a, b) => a.cases.active>b.cases.active ? -1 : 1);
        }
        else if(caseType==="deaths"){
            sortedData.sort((a, b) => a.deaths.total>b.deaths.total ? -1 : 1);
        }
        else if(caseType==="recovered"){
            sortedData.sort((a, b) => a.cases.recovered>b.cases.recovered ? -1 : 1);
        }
        return sortedData;
      };





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
            const [worldWideData] = sortedCountriesData.filter((countryObj) => {
                return countryObj.country === "All";
            });
            console.log(worldWideData);
            setCountryData(worldWideData);
    
        };
        getAllCountries();
    }, []);
    


    
    return (
        <div className="infoBoxcontent">
         <div class="shadow p-3 mb-5 bg-body rounded">   
        <div className="infoBoxone">
            <h2 id="infotitle"> Active Cases</h2>
            <h2 className="infodata" id="active">{countryData.cases.active}</h2>
            </div>
        </div>

        <div class="shadow p-3 mb-5 bg-body rounded">
        <div className="infoBoxtwo">
            <h2 id="infotitle">Recovered Cases</h2>
            <h2 className="infodata" id="recover">{countryData.cases.recovered}</h2>
            </div>
        </div>
        <div class="shadow p-3 mb-5 bg-body rounded">
            <div className="infoBoxthree">
            <h2 id="infotitle">Death Cases</h2>
            <h2 className="infodata" id="death">{countryData.deaths.total}</h2>
                    
        </div> 
            
        </div>

        </div>
            
    )
}

export default Infobox