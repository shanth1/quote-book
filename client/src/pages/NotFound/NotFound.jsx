import { useNavigate } from "react-router-dom";
import Button from "../../shared/Button/Button";

export const NotFound = () => {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col items-center justify-center ">
            <p className="p-3 text-sm font-medium text-blue-500 rounded-full bg-blue-50 dark:bg-gray-800">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                    className="w-6 h-6"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                    />
                </svg>
            </p>
            <h1 className="mt-3 text-2xl font-semibold text-gray-800 dark:text-white md:text-3xl">
                Page not found
            </h1>
            <p className="text-center mt-4 text-gray-500 dark:text-gray-400">
                The page you are looking for doesn't exist. Here are some
                helpful links:
            </p>

            <div className="flex gap-3 flex-col md:flex-row md:w-3/4 lg:w-1/2 xl:w-1/3 items-center bg-slate-200  mt-6  shrink-0">
                <button
                    onClick={() => navigate(-1)}
                    className="flex w-full gap-1 px-5 py-2.5 items-center justify-center text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:border-gray-700"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        className="w-5 h-5 rtl:rotate-180"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
                        />
                    </svg>
                    <span> Go back</span>
                </button>
                <Button
                    onClick={() => {
                        navigate("/");
                    }}
                >
                    Take me home
                </Button>
            </div>
        </div>
    );
};
