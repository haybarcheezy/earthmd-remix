import { PaperClipIcon } from "@heroicons/react/20/solid";

export default function HerbCard({ herb }) {
  return (
    <div className="sm:rounded-lg overflow-hidden bg-white shadow">
      {herb.scientific_name ? (
        <img
          className="max-h-64 object-cover w-full"
          src={`/herb_images/${herb.scientific_name.replace(/ /g, "_")}.jpg`}
          alt=""
          onError={(e) => {
            e.target.src = "https://placehold.co/280x198";
          }}
        />
      ) : (
        <img className="hidden" alt="" src="https://placehold.co/280x198" />
      )}

      <div className="sm:px-6 px-4 py-5">
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          {herb.name}
        </h3>
        <p className="max-w-2xl mt-1 text-sm text-gray-500">
          {herb.scientific_name}
        </p>
      </div>
      <div className="sm:p-0 px-4 py-5 border-t border-gray-200">
        <dl className="sm:divide-y sm:divide-gray-200">
          <div className="sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 py-4">
            <dt className="text-sm font-medium text-gray-500">Properties</dt>
            <dd className="sm:mt-0 sm:col-span-2 mt-1 text-sm text-gray-900">
              {herb.activities
                .split(", ")
                .slice()
                .sort()
                .map((activity, index) => (
                  <span
                    key={index}
                    className="inline-flex my-1 items-center border mx-1 px-2.5 py-0.5 rounded-md text-sm font-medium bg-gray-100 text-gray-800"
                  >
                    {activity}
                  </span>
                ))}
            </dd>
          </div>
          <div className="sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 py-4">
            <dt className="text-sm font-medium text-gray-500">
              Healing Symptoms
            </dt>
            <dd className="sm:mt-0 sm:col-span-2 mt-1 text-sm text-gray-900">
              {herb.indications
                .split(", ")
                .slice(0, 5)
                .map((indication, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center mx-1 my-1 px-2.5 py-0.5 rounded-md text-sm font-medium bg-zinc-800 text-zinc-100"
                  >
                    {indication}
                  </span>
                ))}
            </dd>
          </div>
          <div className="sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 py-4">
            <dt className="text-sm font-medium text-gray-500">Dosages</dt>
            <dd className="sm:mt-0 sm:col-span-2 mt-1 text-sm text-gray-900">
              {herb.dosages.split(", ").map((dosage, index) => (
                <span
                  key={index}
                  className="inline-flex items-center mx-1 my-1 px-2.5 py-0.5 rounded-md text-sm font-medium bg-white  text-gray-7800"
                >
                  {dosage}
                </span>
              ))}
            </dd>
          </div>
          <div className="sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 py-4">
            <dt className="text-sm font-medium text-gray-500">
              Contraindications
            </dt>
            <dd className="sm:mt-0 sm:col-span-2 mt-1 text-sm text-red-100">
              {herb.contraindications
                .split(", ")
                .map((contraindication, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center mx-1 my-1 px-2.5 py-0.5 rounded-md text-sm font-medium bg-rose-600 text-rose-50"
                  >
                    {contraindication}
                  </span>
                ))}
            </dd>
          </div>
          <div className="sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 py-4">
            <dt className="text-sm font-medium text-gray-500">About</dt>
            <dd className="sm:mt-0 sm:col-span-2 mt-1 text-sm text-gray-900">
              Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim
              incididunt cillum culpa consequat. Excepteur qui ipsum aliquip
              consequat sint. Sit id mollit nulla mollit nostrud in ea officia
              proident. Irure nostrud pariatur mollit ad adipisicing
              reprehenderit deserunt qui eu.
            </dd>
          </div>
          <div className="sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 py-4">
            <dt className="text-sm font-medium text-gray-500">Attachments</dt>
            <dd className="sm:mt-0 sm:col-span-2 mt-1 text-sm text-gray-900">
              <ul className="border border-gray-200 divide-y divide-gray-200 rounded-md">
                <li className="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
                  <div className="flex items-center flex-1 w-0">
                    <PaperClipIcon
                      className="flex-shrink-0 w-5 h-5 text-gray-400"
                      aria-hidden="true"
                    />
                    <span className="flex-1 w-0 ml-2 truncate">
                      resume_back_end_developer.pdf
                    </span>
                  </div>
                  <div className="flex-shrink-0 ml-4">
                    <a
                      href="/"
                      className="hover:text-indigo-500 font-medium text-indigo-600"
                    >
                      Download
                    </a>
                  </div>
                </li>
                <li className="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
                  <div className="flex items-center flex-1 w-0">
                    <PaperClipIcon
                      className="flex-shrink-0 w-5 h-5 text-gray-400"
                      aria-hidden="true"
                    />
                    <span className="flex-1 w-0 ml-2 truncate">
                      coverletter_back_end_developer.pdf
                    </span>
                  </div>
                  <div className="flex-shrink-0 ml-4">
                    <a
                      href="/"
                      className="hover:text-indigo-500 font-medium text-indigo-600"
                    >
                      Download
                    </a>
                  </div>
                </li>
              </ul>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
