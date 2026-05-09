import * as React from "react";

import { cn } from "@/lib/utils";

type IconButtonProps = Omit<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    "children"
> & {
    icon: string;
    label: string;
    iconClassName?: string;
};

const glassyIconStyle = {
    "--glass-bg": "rgba(17, 25, 40, 0.5)",
    "--glass-bg-strong": "rgba(17, 25, 40, 0.66)",
    "--glass-noise": "0.2",
    "--glass-shadow":
        "inset 0 1px 0 rgba(255, 255, 255, 0.065), 0 1px 3px rgba(0, 0, 0, 0.16), 0 10px 26px rgba(0, 0, 0, 0.3)",
} as React.CSSProperties;

const IconButton = React.forwardRef<HTMLAnchorElement, IconButtonProps>(
    (
        {
            icon,
            label,
            className,
            iconClassName,
            rel,
            style,
            target = "_blank",
            ...props
        },
        ref,
    ) => (
        <a
            ref={ref}
            target={target}
            rel={rel ?? (target === "_blank" ? "noopener noreferrer" : undefined)}
            aria-label={label}
            title={label}
            className={cn(
                "glassy flex size-10 cursor-pointer items-center justify-center rounded-lg transition-transform duration-200 hover:scale-110 sm:size-11",
                className,
            )}
            style={{ ...glassyIconStyle, ...style }}
            {...props}
        >
            <img
                src={icon}
                alt=""
                aria-hidden="true"
                className={cn("size-[55%]", iconClassName)}
            />
        </a>
    ),
);

IconButton.displayName = "IconButton";

export { IconButton };
