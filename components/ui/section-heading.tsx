import * as React from "react";

import { cn } from "@/lib/utils";

type SectionHeadingProps = {
    title: React.ReactNode;
    description?: React.ReactNode;
    children?: React.ReactNode;
    className?: string;
    descriptionClassName?: string;
};

const SectionHeading = ({
    title,
    description,
    children,
    className,
    descriptionClassName,
}: SectionHeadingProps) => {
    return (
        <div className={cn("mx-auto mb-7 max-w-4xl text-left", className)}>
            <h2 className="text-2xl font-bold leading-tight tracking-normal text-white sm:text-3xl">
                {title}
            </h2>
            {description ? (
                <p
                    className={cn(
                        "mt-2 max-w-xl text-sm leading-6 tracking-normal text-white-100",
                        descriptionClassName,
                    )}
                >
                    {description}
                </p>
            ) : null}
            {children}
        </div>
    );
};

export { SectionHeading };
