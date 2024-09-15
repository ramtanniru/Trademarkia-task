import Image from 'next/image';
import { useEffect, useState } from 'react';
import Filters from './Filters';

const myHeaders = new Headers();
myHeaders.append("accept", "application/json, text/plain, */*");
myHeaders.append("accept-language", "en-GB,en-US;q=0.9,en;q=0.8");
myHeaders.append("content-type", "application/json");
myHeaders.append("origin", "http://localhost:3001");
myHeaders.append("priority", "u=1, i");
myHeaders.append("referer", "http://localhost:3001/");
myHeaders.append("sec-ch-ua", "\"Not/A)Brand\";v=\"8\", \"Chromium\";v=\"126\", \"Google Chrome\";v=\"126\"");
myHeaders.append("sec-ch-ua-mobile", "?0");
myHeaders.append("sec-ch-ua-platform", "\"macOS\"");
myHeaders.append("sec-fetch-dest", "empty");
myHeaders.append("sec-fetch-mode", "cors");
myHeaders.append("sec-fetch-site", "cross-site");
myHeaders.append("user-agent", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36");

export default function SearchResults({searchKey}) {
    const initialFilters = {
        "input_query": searchKey.toLowerCase() || 'check',
        "input_query_type": '',
        "sort_by": 'default',
        "status": [],
        "exact_match": false,
        "date_query": false,
        "owners": [],
        "attorneys": [],
        "law_firms": [],
        "mark_description_description": [],
        "classes": [],
        "page": 1,
        "rows": 10,
        "sort_order": 'desc',
        "states": [],
        "counties": []
    };
    const [searchStatus, setSearchStatus] = useState(''); 
    const [results, setResults] = useState([]);
    const [filteredResults,setFilteredResults] = useState([]);
    const [filterVisible, setFilterVisible] = useState(true);
    const [filters, setFilters] = useState(initialFilters);

    useEffect(() => {
        setFilters(prevFilters => ({
            ...prevFilters,
            input_query: searchKey.toLowerCase() || 'check',
        }));
    }, [searchKey]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setSearchStatus('Searching...');
                const response = await fetch("https://vit-tm-task.api.trademarkia.app/api/v3/us", {
                    method: "POST",
                    headers: myHeaders,
                    body: JSON.stringify(filters),
                    redirect: "follow",
                });
                
                if (response.ok) {
                    const data = await response.json();
                    if (data.length === 0) {
                        setSearchStatus('No Results Found');
                    } else {
                        setResults(data.body.hits.hits || []);
                        setSearchStatus('');
                    }
                } else {
                    setSearchStatus('No Results Found');
                }
            } catch (error) {
                setSearchStatus('Error Occurred');
            }
        };
        fetchData();
        setFilteredResults(results);
    }, []);

    useEffect(()=>{
        const fetchData = async () => {
            try {
                setSearchStatus('Searching...');
                const response = await fetch("https://vit-tm-task.api.trademarkia.app/api/v3/us", {
                    method: "POST",
                    headers: myHeaders,
                    body: JSON.stringify(filters),
                    redirect: "follow",
                });
                
                if (response.ok) {
                    const data = await response.json();
                    if (data.length === 0) {
                        setSearchStatus('No Results Found');
                    } else {
                        setFilteredResults(data.body.hits.hits || []);
                        setSearchStatus('');
                    }
                } else {
                    setSearchStatus('No Results Found');
                }
            } catch (error) {
                setSearchStatus('Error Occurred');
            }
        };
        fetchData();
    }, [filters]);

    const convertDate = (timestamp) => {
        const date = new Date(timestamp*1000);
        const options = { day: 'numeric', month: 'short', year: 'numeric' };
        const formattedDate = date.toLocaleDateString('en-GB', options);
        return formattedDate;
    }

    return (
        <div className="p-8 px-20 bg-gray-100 min-h-screen flex flex-col gap-5">
        <h2 className="text-2xl mb-4 text-black">
            About {results.length} Trademarks found for {`"${searchKey}"`}
        </h2>
        <hr />
        <div className="flex flex-row w-full gap-5 justify-start items-start">
            {/* Results Table */}
            <div className="w-4/5">
            <table className="min-w-full rounded-md bg-white text-left border-collapse">
                <thead>
                <tr className="bg-gray-50 rounded-t-md border-b">
                    <th className="w-1/6 pr-10 pl-10 py-3 text-sm font-semibold text-black">Mark</th>
                    <th className="w-1/6 pr-16 pl-10 py-3 text-sm font-semibold text-black">Details</th>
                    <th className="w-1/6 pr-20 pl-10 py-3 text-sm font-semibold text-black">Status</th>
                    <th className="w-3/6 pr-10 pl-10 py-3 text-sm font-semibold text-black">Class/Description</th>
                </tr>
                </thead>
                <tbody>
                {searchStatus === 'Searching...' && (
                    <div className="flex flex-row justify-center items-center gap-3 p-20 min-w-80 mx-auto">
                        <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status"></div>
                        <h1 className='text-black'>{searchStatus}</h1>
                    </div>
                )}
                {searchStatus === 'No Results Found' && (
                    <div className="flex flex-row justify-center items-center gap-3 p-20 min-w-80 mx-auto">
                        <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status"></div>
                        <h1 className='text-black'>{searchStatus}</h1>
                    </div>
                )}
                {searchStatus === 'Error Occurred' && (
                    <div className="flex flex-row justify-center items-center gap-3 p-20 min-w-80 mx-auto">
                        <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status"></div>
                        <h1 className='text-red-600'>{searchStatus}</h1>
                    </div>
                )}
                {searchStatus=='' && filteredResults.map((item) => (
                    <tr key={item['_id']} className="border-b last:border-none">
                    <td className="px-6 py-0 align-top">
                        <Image
                        src={'/images/product.svg'}
                        alt={item['_source']['attorney_name']}
                        height={120}
                        width={158}
                        className="object-cover"
                        />
                    </td>
                    <td className="px-6 py-4 align-top">
                        <div className='flex flex-col gap-5 items-start'>
                        <div className='flex flex-col gap-1 justify-center items-start'>
                            <p className="font-bold text-[#1A1A1A]">{item['_source']['mark_identification']}</p>
                            <p className="text-[#1A1A1A] text-sm font-normal">{item['_source']['current_owner']}</p>
                        </div>
                        <div className='flex flex-col justify-center items-start gap-1'>
                            <p className='text-[#1A1A1A] text-sm font-semibold'>{item['_source']['registration_number']}</p>
                            <p className='text-[#1A1A1A] text-xs font-medium'>{convertDate(item['_source']['registration_date'])}</p>
                        </div>
                        </div>
                    </td>
                    <td className="px-6 py-4 align-top">
                        <div className='flex flex-col gap-5 items-start'>
                        <div className='flex flex-col gap-1 justify-center items-start'>
                            <div>
                                {item['_source']['status_type']==='registered' &&
                                    <div className='flex flex-row gap-2 justify-center items-center'>
                                        <div className='h-2 w-2 bg-[#41B65C] rounded-full'></div>
                                        <h1 className="text-[#41B65C] font-bold text-base leading-normal">Live/Registerd</h1>
                                    </div>
                                }
                                {item['_source']['status_type']==='pending' &&
                                    <div className='flex flex-row gap-2 justify-center items-center'>
                                        <div className='h-2 w-2 bg-[#ECC53C] rounded-full'></div>
                                        <h1 className="text-[#ECC53C] font-bold text-base leading-normal">Pending</h1>
                                    </div>
                                }
                                {item['_source']['status_type']==='abandoned' &&
                                    <div className='flex flex-row gap-2 justify-center items-center'>
                                        <div className='h-2 w-2 bg-[#EC3C3C] rounded-full'></div>
                                        <h1 className="text-[#EC3C3C] font-bold text-base leading-normal">Abandoned</h1>
                                    </div>
                                }
                            </div>
                            <p className='text-[#1A1A1A] text-xs font-medium'>on {convertDate(item['_source']['status_date'])}</p>
                        </div>
                        <div className='flex flex-row gap-2 justify-center items-center'>
                            <Image src={'icons/renewal.svg'} height={24} width={24} alt='renewal'/>
                            <p className='text-[#1A1A1A] text-xs font-bold'>{convertDate(item['_source']['renewal_date'])}</p>
                        </div>
                        </div>
                    </td>
                    <td className="flex flex-col gap-5 px-6 py-4 align-top">
                        <p className="text-sm font-medium text-[#1D1C1D] line-clamp-3">{item['_source']['mark_description_description']}</p>
                        <div className='flex flex-row gap-5 justify-start items-start'>
                        {item['_source']['class_codes'].map((classCode) => (
                            <div key={classCode} className='flex flex-row gap-2 justify-center items-center'>
                            <Image src={'icons/class.svg'} height={30} width={30} alt='class'/>
                            <p className='text-xs text-[#3a3a3a] font-bold'>Class {~~classCode}</p>
                            </div>
                        ))}
                        </div>
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>
    
            {/* Filters Section */}
            <div className="flex flex-col gap-10 w-1/5 justify-center items-center">
            <div className="flex flex-row justify-center items-center gap-5">
                <button
                className={`flex flex-row justify-center items-center border border-[#C8C8C8] ${
                    filterVisible ? 'rounded-xl' : 'rounded-3xl'
                } p-2`}
                onClick={() => setFilterVisible(!filterVisible)}
                >
                <Image src={'/icons/filter.svg'} width={25} height={25} alt="filter" />
                {filterVisible && <p className="text-black">Filter</p>}
                </button>
                <button className="flex flex-row border border-[#C8C8C8] rounded-3xl p-2">
                <Image src={'/icons/share.svg'} width={25} height={25} alt="share" />
                </button>
                <button className="flex flex-row border border-[#C8C8C8] rounded-3xl p-2">
                <Image src={'/icons/sort.svg'} width={25} height={25} alt="sort" />
                </button>
            </div>
    
            {filterVisible && (
                <div className='w-full'>
                    <Filters setFilters={(value) => setFilters(value)} filters={filters} results={results}/>
                </div>
            )}
            </div>
        </div>
        </div>
    );
}     