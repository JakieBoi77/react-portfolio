import React from "react";
import { HyperText, TypographySmall } from "@components";
import Link from "next/link";
import { navItems } from "../_data/portfolio";

const Header = () => {
    return (
        <div className="relative flex items-center justify-center pt-4">
            <div className="p-2 w-full flex flex-row space-between">
                <Link href="https://finlaytech.ca">
                    <HyperText
                        startOnView={true}
                        className="hidden text-lg font-semibold leading-7 tracking-normal sm:inline"
                    >
                        Jake Finlay
                    </HyperText>
                    <HyperText
                        startOnView={true}
                        animateOnHover={false}
                        className="text-lg font-semibold leading-7 tracking-normal sm:hidden"
                    >
                        JF
                    </HyperText>
                </Link>
            </div>
            <nav className="flex flex-row gap-3 p-2">
                {navItems.map((navItem, index) => {
                    return (
                        <Link
                            key={index}
                            href={navItem.link}
                            className="font-mono"
                        >
                            <TypographySmall
                                as="span"
                                className="font-mono text-xs font-bold text-white sm:text-base"
                            >
                                {navItem.name.toUpperCase()}
                            </TypographySmall>
                        </Link>
                    );
                })}
            </nav>
        </div>
    );
};

export default Header;
