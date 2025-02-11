// import React, { useState, useEffect, useRef } from "react";
// import SearchIcon from '@mui/icons-material/Search';
// import ProlinceLOgo from '../assets/Img/proliance-logo.png';
// import config from "../config";

// export default function CompanyVerification() {
//     const [searchTerm, setSearchTerm] = useState("");

//     const companies = [
//         { name: "Proliance", logo: ProlinceLOgo, link: "https://prolianceltd.com" },
//         { name: "Google", logo: "https://logo.clearbit.com/google.com", link: "https://www.google.com" },
//         { name: "Microsoft", logo: "https://logo.clearbit.com/microsoft.com", link: "https://www.microsoft.com" },
//         { name: "Amazon", logo: "https://logo.clearbit.com/amazon.com", link: "https://www.amazon.com" },
//         { name: "Facebook", logo: "https://logo.clearbit.com/facebook.com", link: "https://www.facebook.com" },
//         { name: "Apple", logo: "https://logo.clearbit.com/apple.com", link: "https://www.apple.com" },
//         { name: "Tesla", logo: "https://logo.clearbit.com/tesla.com", link: "https://www.tesla.com" },
//         { name: "Netflix", logo: "https://logo.clearbit.com/netflix.com", link: "https://www.netflix.com" },
//         { name: "Adobe", logo: "https://logo.clearbit.com/adobe.com", link: "https://www.adobe.com" },
//         { name: "IBM", logo: "https://logo.clearbit.com/ibm.com", link: "https://www.ibm.com" },
//         { name: "Intel", logo: "https://logo.clearbit.com/intel.com", link: "https://www.intel.com" },
//         { name: "Oracle", logo: "https://logo.clearbit.com/oracle.com", link: "https://www.oracle.com" },
//         { name: "Salesforce", logo: "https://logo.clearbit.com/salesforce.com", link: "https://www.salesforce.com" },
//         { name: "Samsung", logo: "https://logo.clearbit.com/samsung.com", link: "https://www.samsung.com" },
//         { name: "Sony", logo: "https://logo.clearbit.com/sony.com", link: "https://www.sony.com" },
//         { name: "LG", logo: "https://logo.clearbit.com/lg.com", link: "https://www.lg.com" }
//     ];

//     // {`${config.WEB_PAGE_BASE_URL}/verification/${organizationID}/${organizationName}/`}

//     const filteredCompanies = companies.filter(company =>
//         company.name.toLowerCase().includes(searchTerm.toLowerCase())
//     );
    
//     return (
//         <div className="Commmmp-very-Page">
//             <div className="site-container">
//                 <div className="Top-Commmmp-very-Page">
//                     <div className="Main-Top-Commmmp-very-Page">
//                         <h1 className="big-text">Verify Companies Certificates</h1>
//                         <p>Verify Before You Trust! Ensure a company's authenticity, check official records, and protect yourself from fraud.</p>
//                         <div className="copmmp-search-sec">
//                             <input 
//                                 type="text" 
//                                 placeholder="Search for a company here..." 
//                                 value={searchTerm} 
//                                 onChange={(e) => setSearchTerm(e.target.value)}
//                             />
//                             <button><SearchIcon /></button>
//                         </div>
//                     </div>
//                 </div>

//                 <div className="card-counts">
//                     <span>{filteredCompanies.length} Companies</span>
//                 </div>

//                 <div className="list-of-reg-companies">
//                     {filteredCompanies.length > 0 ? (
//                         <ul>
//                             {filteredCompanies.map((company, index) => (
//                                 <li key={index}>
//                                     <a href={company.link}  rel="noopener noreferrer">
//                                         <img src={company.logo} alt={company.name} width="40" height="40" style={{ marginRight: '10px' }} />
//                                         <span>{company.name}</span>
//                                     </a>
//                                 </li>
//                             ))}
//                         </ul>
//                     ) : (
//                         <p className="not-aviis-as">Company is not registered on CMVP.</p>
//                     )}
//                 </div>

//                 <div className="ccard-pagss">
//                 <div className="pagination">
//                     <button>«</button>
//                     <span>Page 1</span>
//                     <button>»</button>
//                 </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

import React, { useState, useEffect } from "react";
import SearchIcon from '@mui/icons-material/Search';
import config from "../config"; // if you want to use your config for links

export default function CompanyVerification() {
  const [searchTerm, setSearchTerm] = useState("");
  const [companies, setCompanies] = useState([]);
  const [count, setCount] = useState(0);
  const [next, setNext] = useState(null);
  const [previous, setPrevious] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Your API endpoint URL
  const endpointUrl =`${config.API_BASE_URL}/api/accounts/auth/organization/`;

  // Fetch data from the API endpoint
  const fetchData = async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setCompanies(data.results);



      setCount(data.count);
      setNext(data.next);
      setPrevious(data.previous);
    } catch (error) {
      console.error("Error fetching companies:", error);
    }
  };

  // Load the first page on mount
  useEffect(() => {
    fetchData(endpointUrl);
  }, []);

  // Pagination handlers
  const handleNextPage = () => {
    if (next) {
      fetchData(next);
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (previous) {
      fetchData(previous);
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  // Filter companies by search term
  const filteredCompanies = companies.filter((company) =>
    company.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

//   console.log("companies")
//   console.log(companies[0])
//   console.log("companies")

  return (
    <div className="Commmmp-very-Page">
      <div className="site-container">
        <div className="Top-Commmmp-very-Page">
          <div className="Main-Top-Commmmp-very-Page">
            <h1 className="big-text">Verify Companies Certificates</h1>
            <p>
              Verify Before You Trust! Ensure a company's authenticity, check official records, and protect yourself from fraud.
            </p>
            <div className="copmmp-search-sec">
              <input
                type="text"
                placeholder="Search for a company here..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button>
                <SearchIcon />
              </button>
            </div>
          </div>
        </div>

        <div className="card-counts">
          <span>{filteredCompanies.length} Companies</span>
        </div>

        <div className="list-of-reg-companies">
          {filteredCompanies.length > 0 ? (
            <ul>
              {filteredCompanies.map((company) => (
                <li key={company.id}>
                  {/* 
                    Update the href below as needed. For example, you might want to create a URL like:
                    `${config.WEB_PAGE_BASE_URL}/verification/${company.id}/${company.name}/`
                  */}
                  <a
                    href={`${config.WEB_PAGE_BASE_URL}/verification/${company.unique_subscriber_id}/${company.name}/`}
                    rel="noopener noreferrer"
                  >
                    {company.logo ? (
                      <img
                        src={company.logo}
                        alt={company.name}
                        width="40"
                        height="40"
                        style={{ marginRight: "10px" }}
                      />
                    ) : (
                      // Fallback for companies without a logo
                      <div
                        style={{
                          width: 40,
                          height: 40,
                          backgroundColor: "#ccc",
                          marginRight: "10px",
                        }}
                      />
                    )}
                    <span>{company.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="not-aviis-as">Loading Companies registered on CMVP.</p>
          )}
        </div>

        <div className="ccard-pagss">
          <div className="pagination">
            <button onClick={handlePreviousPage} disabled={!previous}>
              «
            </button>
            <span>Page {currentPage}</span>
            <button onClick={handleNextPage} disabled={!next}>
              »
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
