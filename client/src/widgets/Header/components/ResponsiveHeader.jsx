import { BurgerMenu } from "../../../shared/BurgerMenu/BurgerMenu";
import { useState } from "react";

export const ResponsiveHeader = ({ children }) => {
    const [menuActive, setMenuActive] = useState(false);

    const Logo = children[0];
    const Menu = children[1];
    const Auth = children[2];

    return (
        <div className="w-full h-full flex justify-between items-center lg:grid lg:grid-cols-[200px_1fr_200px]">
            <div>{Logo}</div>
            <div className="hidden lg:block">{Menu}</div>
            <div className="hidden lg:block">{Auth}</div>
            <div className="lg:hidden">
                <BurgerMenu active={menuActive} setActive={setMenuActive}>
                    <div className="flex flex-col gap-4">
                        {Menu}
                        {Auth}
                    </div>
                </BurgerMenu>
            </div>
        </div>
    );
};
