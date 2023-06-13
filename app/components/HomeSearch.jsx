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
  const [index, setIndex] = useState("fixws");

  const handleOptionChange = (option) => {
    setIndex(option.name === "Herbs" ? "fixws" : "symptoms");
  };

  const fetchResults = async () => {
    if (search !== "") {
      const { hits } = await client.index(index).search(search);
      setHerbs(hits);
    }
  };

  useEffect(() => {
    fetchResults();
  }, [search, index]);

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
      <div className="relative items-start max-w-md mx-auto">
        <div className="z-10">
          <SearchOptions onOptionChange={handleOptionChange} />
        </div>
        <div className="rounded-xl ring-gray-500/10 divider-gray-500/10 w-full overflow-hidden transition-all transform bg-white border divide-y shadow-lg">
          <div className="relative">
            <input
              className="sm:text-sm rounded-xl focus:outline-none focus:ring-0 block w-full h-12 px-6 pr-4 mx-auto text-teal-600 placeholder-gray-500 bg-transparent border-0"
              type="text"
              value={search}
              ref={inputRef}
              placeholder={
                index === "fixws" ? "Search for a herb" : "Search for a symptom"
              }
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
            <ul className="max-h-72 scroll-py-2 divide-zinc-200 border-zinc-200 z-50 py-2 overflow-y-auto text-sm text-gray-800 border divide-y-2">
              {herbs.map((item) => {
                return (
                  <a key={item.id} href={item.url} className="group">
                    <li className="hover:bg-zinc-50 flex items-center px-3 py-2 text-left cursor-pointer select-none">
                      <div className="mb-2">
                        <div className="inline-flex">
                          <p className="group-hover:text-black text-base font-semibold">
                            {index === "fixws" ? item.name : item.symptom_name}
                          </p>
                          {index === "fixws" && (
                            <p className="group-hover:text-teal-600 self-center ml-1 text-sm italic text-gray-300">
                              {item.scientific_name}
                            </p>
                          )}
                        </div>
                        <div className="pt-1 space-x-2">
                          {index === "fixws" &&
                            item.indications
                              .slice(0, 5)
                              .map((indication, index) => (
                                <span
                                  className="bg-zinc-800 ring-1 ring-inset ring-gray-500/10 text-zinc-100 inline-flex items-center px-2 py-1 text-xs font-medium rounded-md"
                                  key={index}
                                >
                                  {indication}
                                </span>
                              ))}
                          {index === "symptoms" && (
                            <>
                              <p>{item.description}</p>
                              {item.herbs.map((herb, index) => (
                                <span
                                  className="bg-zinc-800 ring-1 ring-inset ring-gray-500/10 text-zinc-100 inline-flex items-center px-2 py-1 text-xs font-medium rounded-md"
                                  key={index}
                                >
                                  {herb}
                                </span>
                              ))}
                            </>
                          )}
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
