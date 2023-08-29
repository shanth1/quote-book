import { useNavigate } from "react-router-dom";
import { RoundButton } from "../RoundButton/RoundButton";

export const GoBack = () => {
    const navigate = useNavigate();

    return (
        <RoundButton onClick={() => navigate(-1)}>
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
        </RoundButton>
    );
};
