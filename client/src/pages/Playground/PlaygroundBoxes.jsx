import { useQuery } from "@apollo/client";
import { GET_PLAYGROUND_BOXES } from "../../graphql/queries";
import Content from "../../shared/Content/Content";
import H1 from "../../shared/H1/H1";
import { Loading } from "../../shared/Loading/Loading";
import { BoxList } from "../../widgets/BoxList/BoxList";
import { Search } from "../../features/Search/Search";
import { RoundButton } from "../../shared/RoundButton/RoundButton";
import { useState } from "react";
import { BiSearch } from "react-icons/bi";

export const PlaygroundBoxes = () => {
    const { loading, error, data } = useQuery(GET_PLAYGROUND_BOXES);
    const [searchActive, setSearchActive] = useState(false);

    if (loading) return <Loading />;
    if (error) {
        return <div>{error.message}</div>;
    }

    const boxes = data?.getPlaygroundBoxes || [];

    return (
        <Content>
            <div className="flex gap-2 items-center justify-between">
                <H1>Boxes</H1>
                <RoundButton
                    onClick={() => {
                        setSearchActive(!searchActive);
                    }}
                >
                    <BiSearch size="22px" />
                </RoundButton>
            </div>
            <div>
                <Search visible={searchActive} />
                <BoxList boxes={boxes} />
            </div>
        </Content>
    );
};
