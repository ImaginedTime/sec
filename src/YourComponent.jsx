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
                const cik = companyData[ticker].cik_str.padStart(10, '0');
                console.log('CIK:', cik);

                const companyConcept = await axios.get(`https://data.sec.gov/api/xbrl/companyconcept/CIK${cik}/us-gaap/${concept}.json`, { headers });
                const key = Object.keys(companyConcept.data.units)[0];
                const conceptData = companyConcept.data.units[key];
                const concept10K = conceptData.filter(item => item.form === '10-Q').map(item => ({
                    end: new Date(item.end),
                    val: item.value
                }));
                setConcept10K(concept10K);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [ticker, concept]);

    return (
        <div>
            {concept10K && <TimeSeriesPlot data={concept10K} concept={concept} />}
        </div>
    );
};

export default YourComponent;
