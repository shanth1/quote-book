import Content from "../../shared/Content/Content";
import H1 from "../../shared/H1/H1";
import { WithCaption } from "../../shared/WithCaption/WithCaption";

import { Icon } from "./components/Icon";

export const About = () => {
    return (
        <Content>
            <div className="flex justify-center pb-6">
                <H1>What is it build on</H1>
            </div>
            <div className="px-6 gap-10 md:gap-0 lg:px-10 xl:px-28 2xl:px-32 grid grid-cols-4 md:grid-cols-8 ">
                <WithCaption caption="JavaScript">
                    <Icon name="javascript" />
                </WithCaption>
                <WithCaption caption="NodeJS">
                    <Icon name="node" />
                </WithCaption>
                <WithCaption caption="Express">
                    <Icon name="express" />
                </WithCaption>
                <WithCaption caption="MongoDB">
                    <Icon name="mongo" />
                </WithCaption>
                <WithCaption caption="GraphQL">
                    <Icon name="graphql" />
                </WithCaption>
                <WithCaption caption="React">
                    <Icon name="react" />
                </WithCaption>
                <WithCaption caption="Tailwind">
                    <Icon name="tailwind" />
                </WithCaption>
                <WithCaption caption="Docker">
                    <Icon name="docker" />
                </WithCaption>
            </div>
        </Content>
    );
};
