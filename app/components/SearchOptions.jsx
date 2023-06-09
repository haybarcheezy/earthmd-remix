import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

const searchOptions = [{ name: "Herbs" }, { name: "Symptoms" }];

export default function SearchOptions() {
  const [selected, setSelected] = useState(searchOptions[0]);

  return (
    <div className="w-32 items-start absolute top-0 right-full mr-2 ">
      <Listbox value={selected} onChange={setSelected}>
        <div className="relative">
          <Listbox.Button className="h-12 relative w-full text-xl border  cursor-pointer shadow-lg  font-semibold   hover:cursor-pointer rounded-lg bg-white py-2 px-4 text-left  focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
            <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-pink-00"
                aria-hidden="true"
              />
            </span>
            <span className="block truncate ">{selected.name}</span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute text-left mt-1 z-10 shadow-lg max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {searchOptions.map((option, optionIdx) => (
                <Listbox.Option
                  key={optionIdx}
                  className={({ active }) =>
                    `relative select-none py-2 px-4 pr-4 cursor-pointer ${
                      active ? "bg-pink-100 text-pink-900" : "text-gray-500"
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
                              ? "font-medium text-pink-500"
                              : "font-normal"
                          }`}
                        >
                          {option.name}
                        </span>
                        {selected && (
                          <span className="flex items-center ml-2 text-pink-600">
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
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
