import * as React from "react";

import { cn } from "@/lib/utils";

type TypographyProps = React.HTMLAttributes<HTMLElement> & {
    as?: React.ElementType;
};

const typographyClassNames = {
    h1: "scroll-m-20 text-balance text-4xl font-bold leading-tight tracking-normal sm:text-5xl",
    h2: "scroll-m-20 text-balance text-3xl font-bold leading-tight tracking-normal sm:text-4xl md:text-5xl",
    h3: "scroll-m-20 text-balance text-2xl font-semibold leading-snug tracking-normal",
    h4: "scroll-m-20 text-xl font-semibold leading-snug tracking-normal",
    p: "text-base leading-7 tracking-normal",
    lead: "text-lg leading-8 tracking-normal text-white-100 sm:text-xl",
    large: "text-lg font-semibold leading-7 tracking-normal",
    small: "text-sm font-medium leading-5 tracking-normal",
    muted: "text-sm leading-6 tracking-normal text-white-200",
    list: "my-6 ml-6 list-disc space-y-2 marker:text-purple",
    listItem: "pl-1 text-sm leading-6 tracking-normal text-white-100",
    blockquote:
        "mt-6 border-l-2 border-purple/70 pl-6 text-base italic leading-7 text-white-100",
    inlineCode:
        "relative rounded bg-white/10 px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold text-white",
} as const;

function createTypographyComponent(
    displayName: string,
    defaultElement: React.ElementType,
    baseClassName: string,
) {
    const TypographyComponent = React.forwardRef<HTMLElement, TypographyProps>(
        ({ as: Component = defaultElement, className, ...props }, ref) => (
            <Component
                ref={ref}
                className={cn(baseClassName, className)}
                {...props}
            />
        ),
    );

    TypographyComponent.displayName = displayName;

    return TypographyComponent;
}

const TypographyH1 = createTypographyComponent(
    "TypographyH1",
    "h1",
    typographyClassNames.h1,
);

const TypographyH2 = createTypographyComponent(
    "TypographyH2",
    "h2",
    typographyClassNames.h2,
);

const TypographyH3 = createTypographyComponent(
    "TypographyH3",
    "h3",
    typographyClassNames.h3,
);

const TypographyH4 = createTypographyComponent(
    "TypographyH4",
    "h4",
    typographyClassNames.h4,
);

const TypographyP = createTypographyComponent(
    "TypographyP",
    "p",
    typographyClassNames.p,
);

const TypographyLead = createTypographyComponent(
    "TypographyLead",
    "p",
    typographyClassNames.lead,
);

const TypographyLarge = createTypographyComponent(
    "TypographyLarge",
    "div",
    typographyClassNames.large,
);

const TypographySmall = createTypographyComponent(
    "TypographySmall",
    "small",
    typographyClassNames.small,
);

const TypographyMuted = createTypographyComponent(
    "TypographyMuted",
    "p",
    typographyClassNames.muted,
);

const TypographyList = createTypographyComponent(
    "TypographyList",
    "ul",
    typographyClassNames.list,
);

const TypographyListItem = createTypographyComponent(
    "TypographyListItem",
    "li",
    typographyClassNames.listItem,
);

const TypographyBlockquote = createTypographyComponent(
    "TypographyBlockquote",
    "blockquote",
    typographyClassNames.blockquote,
);

const TypographyInlineCode = createTypographyComponent(
    "TypographyInlineCode",
    "code",
    typographyClassNames.inlineCode,
);

export {
    TypographyBlockquote,
    TypographyH1,
    TypographyH2,
    TypographyH3,
    TypographyH4,
    TypographyInlineCode,
    TypographyLarge,
    TypographyLead,
    TypographyList,
    TypographyListItem,
    TypographyMuted,
    TypographyP,
    TypographySmall,
    typographyClassNames,
};
