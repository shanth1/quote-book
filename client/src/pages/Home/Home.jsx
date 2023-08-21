import Content from "../../shared/Content/Content";
import H1 from "../../shared/H1/H1";
import { CheckBox } from "./components/CheckBox";

import gmailIcon from "./assets/gmail.svg";
import telegramIcon from "./assets/telegram.svg";
import githubIcon from "./assets/github.svg";

import styles from "./styles.module.scss";

import {
    FcSearch,
    FcFlashOn,
    FcReading,
    FcMusic,
    FcFilmReel,
    FcCustomerSupport,
    FcFilingCabinet,
    FcDocument,
    FcAdvance,
} from "react-icons/fc";
import { VersionContainer } from "./components/VersionContainer";
import { Divider } from "../../shared/Divider/Divider";
import { Link } from "react-router-dom";
import { WithCaption } from "../../shared/WithCaption/WithCaption";
import { DefaultLink } from "../../shared/DefaultLink/DefaultLink";
import { AnimationUnderline } from "../../shared/AnimationUnderline/AnimationUnderline";

export const Home = () => {
    return (
        <Content>
            <div className="flex justify-center items-center">
                <div className="flex flex-col justify-center items-center gap-4">
                    <div className="pb-4">
                        <H1>Quote it</H1>
                    </div>
                    <div className="flex justify-center items-center gap-2 md:gap-4 lg:gap-6">
                        <WithCaption
                            sizeStyle={styles.bigIcon}
                            caption="Inspiration"
                        >
                            <div className="grid grid-cols-2 ">
                                <div className={styles.smallContainer}>
                                    <FcReading className={styles.smallIcon} />
                                </div>
                                <div className={styles.smallContainer}>
                                    <FcFilmReel className={styles.smallIcon} />
                                </div>
                                <div className={styles.smallContainer}>
                                    <FcMusic className={styles.smallIcon} />
                                </div>
                                <div className={styles.smallContainer}>
                                    <FcCustomerSupport
                                        className={styles.smallIcon}
                                    />
                                </div>
                            </div>
                        </WithCaption>
                        <FcAdvance className="w-10 h-10 lg:w-14 lg:h-14 hover:scale-90 transition-all" />
                        <WithCaption sizeStyle={styles.bigIcon} caption="Boxes">
                            <FcFilingCabinet className={styles.bigIcon} />
                        </WithCaption>
                        <FcAdvance className="w-10 h-10 lg:w-14 lg:h-14 hover:scale-90 transition-all" />
                        <WithCaption
                            sizeStyle={styles.bigIcon}
                            caption="Quotes"
                        >
                            <FcDocument className={styles.bigIcon} />
                        </WithCaption>
                    </div>
                </div>
            </div>
            <Divider />
            <div className="bg-white p-6  md:p-7 rounded-lg shadow-sm">
                <div className="flex justify-center pb-4">
                    <H1>Hello on v1.1.0!</H1>
                </div>
                <div className="px-4 grid gap-8 lg:gap-12 lg:px-8 grid-cols-1 md:grid-cols-2">
                    <div className="flex flex-col items-center group hover:scale-105 transition-all">
                        <FcSearch className="w-10 h-10 transition-all group-hover:scale-125" />
                        <AnimationUnderline>What is that?</AnimationUnderline>
                        <div className="text-center">
                            {<span className="font-bold">Completely free</span>}{" "}
                            service, where you can{" "}
                            {<span className="font-bold">save</span>} and{" "}
                            {<span className="font-bold">structure</span>}{" "}
                            quotes. {<span className="font-bold">Read</span>},{" "}
                            {<span className="font-bold">Watch</span>},{" "}
                            {<span className="font-bold">Listen</span>} and{" "}
                            {<span className="font-bold">quote all</span>} that
                            you like!
                        </div>
                    </div>
                    <div className="flex flex-col items-center group hover:scale-105 transition-all">
                        <FcFlashOn className="w-10 h-10 transition-all group-hover:scale-125" />
                        <AnimationUnderline>Getting started</AnimationUnderline>
                        <div className="text-center">
                            {
                                <Link
                                    to="/register"
                                    className="text-primary-700"
                                >
                                    Sign up
                                </Link>
                            }{" "}
                            and try it! Don't want to register? You can{" "}
                            {
                                <Link to="/login" className="text-primary-700">
                                    Log in
                                </Link>
                            }{" "}
                            with {<span className="font-bold">"test"</span>}{" "}
                            username. and{" "}
                            {<span className="font-bold">"qwe123"</span>}{" "}
                            password. This is test account
                        </div>
                    </div>
                </div>
            </div>
            <Divider />
            <div className="flex justify-center pb-2">
                <H1>What's next?</H1>
            </div>
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:gap-6">
                <VersionContainer isCurrent>
                    <AnimationUnderline>v1.x.x</AnimationUnderline>
                    <div>
                        <CheckBox checked>Database model</CheckBox>
                        <CheckBox checked>GraphQL schemas</CheckBox>
                        <CheckBox checked>Password hashing </CheckBox>
                        <CheckBox checked>JWT authorization</CheckBox>
                        <CheckBox checked>CRUD operations</CheckBox>
                        <CheckBox checked>Pages navigation</CheckBox>
                        <CheckBox checked>Input validations</CheckBox>
                        <CheckBox checked>Responsive design</CheckBox>
                        <CheckBox>HTTPS protocol</CheckBox>
                        <CheckBox>Search and filters</CheckBox>
                        <CheckBox>Keyboard shortcuts</CheckBox>
                    </div>
                </VersionContainer>
                <VersionContainer>
                    <AnimationUnderline>v2.x.x</AnimationUnderline>
                    <div>
                        <CheckBox>Advanced JWT</CheckBox>
                        <CheckBox>Language support</CheckBox>
                        <CheckBox>Color themes</CheckBox>
                        <CheckBox>Password recovery</CheckBox>
                        <CheckBox>Personal tags</CheckBox>
                        <CheckBox>Favorite feature</CheckBox>
                        <CheckBox>Profile settings</CheckBox>
                        <CheckBox>Delete account</CheckBox>
                        <CheckBox>Quote encryption</CheckBox>
                    </div>
                </VersionContainer>
                <VersionContainer>
                    <AnimationUnderline>v3.x.x</AnimationUnderline>
                    <div>
                        <CheckBox>File upload</CheckBox>
                        <CheckBox>Quotes feed</CheckBox>
                        <CheckBox>Quotes feed</CheckBox>
                        <CheckBox>Comments feature</CheckBox>
                        <CheckBox>Recommendation system</CheckBox>
                        <CheckBox>Customization options</CheckBox>
                    </div>
                </VersionContainer>
            </div>
            <Divider isVisual />
            <div className="pt-4 pb-6 flex justify-between px-6 md:justify-around md:px-0">
                <WithCaption
                    sizeStyle="w-8 h-8 md:w-12 md:h-12"
                    caption="Gmail"
                >
                    <DefaultLink href="mailto:denisberesnev59@gmail.com">
                        <img src={gmailIcon} alt="#" />
                    </DefaultLink>
                </WithCaption>
                <WithCaption
                    sizeStyle="w-8 h-8 md:w-12 md:h-12"
                    caption="GitHub"
                >
                    <DefaultLink href="https://github.com/shanth1">
                        <img src={githubIcon} alt="#" />
                    </DefaultLink>
                </WithCaption>
                <WithCaption
                    sizeStyle="w-8 h-8 md:w-12 md:h-12"
                    caption="Telegram"
                >
                    <DefaultLink href="https://telegram.me/andabura">
                        <img src={telegramIcon} alt="#" />
                    </DefaultLink>
                </WithCaption>
            </div>
        </Content>
    );
};
