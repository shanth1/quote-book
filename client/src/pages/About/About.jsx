import Content from "../../shared/Content/Content";
import { DefaultLink } from "../../shared/DefaultLink/DefaultLink";
import { Divider } from "../../shared/Divider/Divider";
import H1 from "../../shared/H1/H1";
import { WithCaption } from "../../shared/WithCaption/WithCaption";
import qr from "./assets/qrpay.webp";

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
            <Divider />
            <div className="flex justify-center pb-3 md:pb-4">
                <H1>Server support donation</H1>
            </div>
            <div className="flex flex-col items-center gap-5 md:gap-6 lg:gap-8">
                <img
                    className="w-64 md:w-72 lg:w-80 transition-all hover:scale-110"
                    srcSet={qr}
                    alt=""
                />
                <WithCaption caption="Payment link">
                    <DefaultLink href="https://www.tinkoff.ru/rm/beresnev.denis1/riPwv581">
                        <img
                            className="w-36"
                            src="https://acdn.tinkoff.ru/static/documents/ff59e890-eb57-4b28-971f-cfdda8b10a7a.svg"
                            alt=""
                        />
                    </DefaultLink>
                </WithCaption>
            </div>
        </Content>
    );
};
