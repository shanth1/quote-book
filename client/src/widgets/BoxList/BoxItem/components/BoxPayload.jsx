export const BoxPayload = ({ authors, genres, year }) => {
    return (
        <div className="leading-none">
            {!!(authors.length || genres.length || year) && (
                <div className="flex gap-2 justify-between text-sm">
                    {!!(authors.length || genres.length) && (
                        <div>
                            {authors.length
                                ? authors.join(", ")
                                : genres.join(", ")}
                        </div>
                    )}
                    <div>{year}</div>
                </div>
            )}
            {!!(authors.length && genres.length) && (
                <div className="text-xs">{genres.join(", ")}</div>
            )}
        </div>
    );
};
