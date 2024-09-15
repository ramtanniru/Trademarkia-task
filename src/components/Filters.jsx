import { useEffect, useState } from 'react';
import {Tabs, Tab} from "@nextui-org/react"; 

const statusOptions = [
  { name: 'All', value: '', color: 'ffffff' },
  { name: 'Registered', value: 'registered', color: '#52b649' },
  { name: 'Pending', value: 'pending', color: '#ECC53C' },
  { name: 'Abandoned', value: 'abandoned', color: '#EC3C3C' },
  { name: 'Others', value: 'others', color: '#4380EC' }
];

export default function Filters({ setFilters, filters, results }) {

  const [ownerOptions,setOwnerOptions] = useState([]);
  const [lawFirmOptions,setLawFirmOptions] = useState([]);
  const [attorneyOptions,setAttorneyoptions] = useState([]);

  useEffect(()=>{
    const filterList = results.map((item)=>{
      return item['_source']['search_bar']
    });
    const ownersTemp = [];
    const lawFirmsTemp = [];
    const attorneyTemp = [];
    filterList.map((category) => {
      ownersTemp.push(category["owner"]);
      lawFirmsTemp.push(category["law_firm"]);
      attorneyTemp.push(category['attorneys']);
    })
    setAttorneyoptions([...new Set(attorneyTemp)]);
    setLawFirmOptions([...new Set(lawFirmsTemp)]);
    setOwnerOptions([...new Set(ownersTemp)]);
  },[results]);

  const handleStatusChange = (statusValue) => {
    setFilters((prevFilter) => {
      const isStatusPresent = prevFilter['status'].includes(statusValue);
      return {
        ...prevFilter,
        status: isStatusPresent
          ? prevFilter['status'].filter((status) => status !== statusValue)
          : [...prevFilter['status'], statusValue]
      };
    });
  };

  const handleFilterChange = (type, item) => {
    setFilters((prevFilter) => {
      const isItemPresent = prevFilter[type].includes(item);
      return {
        ...prevFilter,
        [type]: isItemPresent
          ? prevFilter[type].filter((ele) => ele !== item)
          : [...prevFilter[type], item]
      };
    });
  };

  const cleanData = (str) => {
    return str.toLowerCase().replace(/[^a-z\s]/g, '');
  }

  return (
    <div className='flex flex-col gap-10 justify-center items-center'>
      <div className="flex flex-col gap-3 justify-center items-start w-full bg-white p-5 rounded-2xl">
        {/* Status Filter */}
        <h1 className="text-lg font-semibold text-black">Status</h1>
        <div className="flex flex-wrap gap-3">
          {statusOptions.map((item) => {
            const isActive = filters.status.includes(item.value);
            return (
              <div
                key={item.name}
                className={`flex flex-row gap-2 items-center py-2 px-3 rounded-lg border cursor-pointer text-black ${
                  isActive ? `bg-[#EEF4FF] text-[#4380EC] border-[#4380EC]` : 'bg-white'
                }`}
                onClick={() => handleStatusChange(item.value)}
              >
                <div className={`${item.value==='' && 'hidden'} h-2 w-2 rounded-full bg-[${item.color}]`}></div>
                <p>{item.name}</p>
              </div>
            );
          })}
        </div>
        </div>

        {/* Other Filters */}
        <div className="flex flex-col gap-5 justify-center items-center w-full bg-white p-5 rounded-2xl">
          <div className="flex flex-col w-full gap-4">
            <Tabs key={'underlined'} variant={'underlined'} aria-label="Tabs variants" color='primary'>
              <Tab key="owners" title="Owners">
                <div className="flex flex-col gap-2">
                  {ownerOptions.map((owner) => {
                    const isActive = filters['owners'].includes(owner);
                    return (
                      <div key={owner} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={filters.owners.includes(cleanData(owner))}
                          onClick={() => handleFilterChange('owners',cleanData(owner))}
                          className="form-checkbox h-5 w-5"
                        />
                        <label className={isActive ? 'text-blue-500' : 'text-black'}>{owner}</label>
                      </div>
                    );
                  })}
                </div>
              </Tab>
              <Tab key="law_firms" title="Law Firms">
                <div className="flex flex-col gap-2">
                  {lawFirmOptions.map((firm) => {
                    const isActive = filters['law_firms'].includes(firm);
                    return (
                      <div key={firm} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={filters.law_firms.includes(cleanData(firm))}
                          onClick={() => handleFilterChange('law_firms',cleanData(firm))}
                          className="form-checkbox h-5 w-5"
                        />
                        <label className={isActive ? 'text-blue-500' : 'text-black'}>{firm}</label>
                      </div>
                    );
                  })}
                </div>
              </Tab>
              <Tab key="attorneys" title="Attorneys">
                <div className="flex flex-col gap-2">
                  {attorneyOptions.map((attorney) => {
                    const isActive = filters['attorneys'].includes(attorney);
                    return (
                      <div key={attorney} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={filters.attorneys.includes(cleanData(attorney))}
                          onClick={() => handleFilterChange('attorneys',cleanData(attorney))}
                          className="form-checkbox h-5 w-5"
                        />
                        <label className={isActive ? 'text-blue-500' : 'text-black'}>{attorney}</label>
                      </div>
                    );
                  })}
                </div>
              </Tab>
            </Tabs>
          </div>
        </div>
    </div>
  );
}
