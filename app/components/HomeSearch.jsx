import { useEffect, useState, useRef } from "react";
import { MeiliSearch } from "meilisearch";
import SearchOptions from "./SearchOptions";

const MEILI_API_KEY =
  "51ef93fd89114891c34cb2e062f39b961379598ff8830c7fd9a60924f52cd633";
const MEILI_HOST = "https://ms-ce439f23e87f-3791.sfo.meilisearch.io";

const client = new MeiliSearch({
  host: MEILI_HOST,
  apiKey: MEILI_API_KEY,
});

const INDEX = "fixws";

function Search() {
  const [herbs, setHerbs] = useState([]);
  const [search, setSearch] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const inputRef = useRef();

  const fetchResults = async () => {
    if (search !== "") {
      const { hits } = await client.index(INDEX).search(search);
      setHerbs(hits);
    }
  };

  useEffect(() => {
    fetchResults();
  }, [search]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const dropdownRef = useRef();

  const handleClickOutside = (event) => {
    // check if the click was inside the dropdown or the input
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target) &&
      inputRef.current &&
      !inputRef.current.contains(event.target)
    ) {
      setIsVisible(false);
    }
  };

  return (
    <div className="sm:px-6 lg:px-8 max-w-full px-4 py-12 mx-auto">
      <div className="max-w-md mx-auto relative items-start">
        <div className="z-10">
          <SearchOptions />
        </div>
        <div className="rounded-xl ring-gray-500/10 bg-white w-full overflow-hidden transition-all transform border divide-y divider-gray-500/10 shadow-lg">
          <div className="relative">
            <input
              className="block mx-auto w-full px-6 sm:text-sm rounded-xl focus:outline-none focus:ring-0 h-12 pr-4 text-pink-600 placeholder-gray-500 bg-transparent border-0"
              type="text"
              value={search}
              ref={inputRef}
              placeholder="Search for a herb"
              autoFocus={true}
              onChange={(e) => {
                setSearch(e.target.value);
                setIsVisible(true);
              }}
              onBlur={() => {
                setTimeout(() => {
                  setIsVisible(false);
                }, 200);
              }}
            />
          </div>
          {isVisible && (
            <ul className="max-h-72 scroll-py-2 z-50 py-2 overflow-y-auto text-sm text-gray-800">
              {herbs.map((herb) => {
                return (
                  <a key={herb.id} href={herb.url} className="group">
                    <li className="hover:bg-pink-200 flex items-center px-3 py-2 cursor-pointer text-left select-none">
                      <div className="mb-2">
                        <div className="inline-flex">
                          <p className="text-base font-semibold group-hover:text-white">
                            {herb.name}
                          </p>
                          <p className="italic text-gray-300 ml-1 text-sm self-center group-hover:text-pink-600">
                            {herb.scientific_name}
                          </p>
                        </div>
                        <div className="space-x-2 pt-1">
                          {herb.indications
                            .slice(0, 5)
                            .map((indication, index) => (
                              <span
                                className="hover:bg-pink-500 hover:text-white inline-flex items-center rounded-md bg-white px-2 py-1 text-xs font-medium text-gray-400 ring-1 ring-inset ring-gray-500/10"
                                key={index}
                              >
                                {indication}
                              </span>
                            ))}
                        </div>
                      </div>
                    </li>
                  </a>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default Search;
