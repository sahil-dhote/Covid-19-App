import React, { useState, useEffect} from 'react'

function Infobox()
{
    const [countryData, setCountryData] = useState({
        cases: {
            active: "Loading",
            recovered: "Loading",
        },
        deaths: {
            total: "Loading",
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
    },[]);





    

    return (
        <div className="">
        <div className="">
            <h1> Active Cases</h1>
            Size={countryData.cases.active}
            
            
        </div>
        <div className="">
            <h1>Recovered</h1>
            Size={countryData.cases.recovered}
           
        </div>
            <div className="">
            <h1>Deaths</h1>
            Size={countryData.deaths.total}
            
            
        </div>

            </div>
            
    )
}

export default Infobox