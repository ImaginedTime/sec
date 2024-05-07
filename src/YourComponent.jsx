import React, { useState, useEffect } from 'react';
import TimeSeriesPlot from './TimeSeriesPlot';
import axios from 'axios';

const YourComponent = ({ ticker, concept }) => {
    const [concept10K, setConcept10K] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const headers = { 'User-Agent': 'udishj@gmail.com'};
                const companyTickers = await axios.get("https://www.sec.gov/files/company_tickers.json", { headers });
                const companyData = companyTickers.data;
                // find by ticker symbol in the companyData object
                // "0": {
                //     "cik_str": 789019,
                //     "ticker": "MSFT",
                //     "title": "MICROSOFT CORP"
                // },
                // "1": {
                //     "cik_str": 320193,
                //     "ticker": "AAPL",
                //     "title": "Apple Inc."
                // },

                const cikObj = Object.keys(companyData).find(key => companyData[key].ticker === ticker);
                const cik = companyData[cikObj].cik_str.toString().padStart(10, '0');

                const companyConcept = await axios.get(`https://data.sec.gov/api/xbrl/companyconcept/CIK${cik}/us-gaap/${concept}.json`, { headers });
                const key = Object.keys(companyConcept.data.units)[0];
                const conceptData = companyConcept.data.units[key];
                const concept10Kdata = conceptData.filter(item => item.form === '10-K').map(item => ({
                    end: new Date(item.end),
                    val: item.val
                }));

                setConcept10K(concept10Kdata);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [ticker, concept]);

    return (
        <div className=''>
            {concept10K && <TimeSeriesPlot data={concept10K} concept={concept} />}
        </div>
    );
};

export default YourComponent;
