import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

const searchOptions = [{ name: "Herbs" }, { name: "Symptoms" }];

export default function SearchOptions({ onOptionChange }) {
  const [selected, setSelected] = useState(searchOptions[0]);

  const handleOptionChange = (option) => {
    setSelected(option);
    onOptionChange(option);
  };

  return (
    <div className="right-full absolute top-0 items-start w-32 mr-2">
      <Listbox value={selected} onChange={handleOptionChange}>
        <div className="relative">
          <Listbox.Button className="hover:cursor-pointer focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm relative w-full h-12 px-4 py-2 text-xl font-semibold text-left bg-white border rounded-lg shadow-lg cursor-pointer">
            <span className="right-4 absolute inset-y-0 flex items-center pr-2 pointer-events-none">
              <ChevronUpDownIcon
                className="text-teal-00 w-5 h-5"
                aria-hidden="true"
              />
            </span>
            <span className=" block truncate">{selected.name}</span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm absolute z-10 w-full py-1 mt-1 overflow-auto text-base text-left bg-white rounded-md shadow-lg">
              {searchOptions.map((option, optionIdx) => (
                <Listbox.Option
                  key={optionIdx}
                  className={({ active }) =>
                    `relative select-none py-2 px-4 pr-4 cursor-pointer ${
                      active ? "bg-teal-100 text-teal-900" : "text-gray-500"
                    }`
                  }
                  value={option}
                >
                  {({ selected }) => (
                    <>
                      <div className="flex items-center justify-between">
                        <span
                          className={`block truncate ${
                            selected
                              ? "font-medium text-teal-500"
                              : "font-normal"
                          }`}
                        >
                          {option.name}
                        </span>
                        {selected && (
                          <span className="flex items-center ml-2 text-teal-600">
                            <CheckIcon className="w-5 h-5" aria-hidden="true" />
                          </span>
                        )}
                      </div>
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}
