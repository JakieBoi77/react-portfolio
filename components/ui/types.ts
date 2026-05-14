import type { CSSProperties } from "react";

export type CSSVariableStyle = CSSProperties & {
    [key: `--${string}`]: string | number | undefined;
};
