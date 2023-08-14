export const BoxImage = ({ image }) => {
    return (
        <div className="w-full h-full object-cover rounded-lg overflow-hidden">
            <img
                className="group-hover:scale-110 transition-all duration-300 object-cover w-full h-full"
                src={image}
                alt=""
            />
        </div>
    );
};
