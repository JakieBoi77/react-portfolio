import { useCallback, useEffect, useRef } from "react";
import type {
    MouseEvent as ReactMouseEvent,
    PointerEvent as ReactPointerEvent,
} from "react";

export const useCourseGraphScroll = (graphWidth: number) => {
    const scrollContainerRef = useRef<HTMLDivElement | null>(null);
    const scrollHintRef = useRef<HTMLDivElement | null>(null);
    const scrollTrackRef = useRef<HTMLDivElement | null>(null);
    const scrollThumbRef = useRef<HTMLDivElement | null>(null);
    const dragCleanupRef = useRef<(() => void) | null>(null);
    const scrollbarDragCleanupRef = useRef<(() => void) | null>(null);
    const scrollbarFrameRef = useRef(0);
    const suppressClickRef = useRef(false);
    const dragState = useRef({
        active: false,
        pointerId: -1,
        startX: 0,
        scrollLeft: 0,
        moved: false,
    });

    const updateGraphScrollbar = useCallback(() => {
        const scrollElement = scrollContainerRef.current;
        const trackElement = scrollTrackRef.current;
        const thumbElement = scrollThumbRef.current;

        if (!scrollElement || !trackElement || !thumbElement) {
            return;
        }

        const maxScrollLeft =
            scrollElement.scrollWidth - scrollElement.clientWidth;

        if (maxScrollLeft <= 0) {
            trackElement.style.display = "none";
            return;
        }

        const trackWidth = trackElement.clientWidth;
        const thumbWidth = Math.max(
            48,
            (scrollElement.clientWidth / scrollElement.scrollWidth) *
                trackWidth,
        );
        const maxThumbLeft = Math.max(0, trackWidth - thumbWidth);
        const thumbLeft =
            maxScrollLeft > 0
                ? (scrollElement.scrollLeft / maxScrollLeft) * maxThumbLeft
                : 0;

        trackElement.style.display = "block";
        thumbElement.style.width = `${thumbWidth}px`;
        thumbElement.style.transform = `translate3d(${thumbLeft}px, 0, 0)`;
    }, []);

    const scheduleGraphScrollbarUpdate = useCallback(() => {
        if (scrollbarFrameRef.current) {
            return;
        }

        scrollbarFrameRef.current = window.requestAnimationFrame(() => {
            scrollbarFrameRef.current = 0;
            updateGraphScrollbar();
        });
    }, [updateGraphScrollbar]);

    useEffect(() => {
        updateGraphScrollbar();

        const scrollElement = scrollContainerRef.current;
        const resizeObserver =
            typeof ResizeObserver !== "undefined"
                ? new ResizeObserver(updateGraphScrollbar)
                : null;

        if (scrollElement) {
            resizeObserver?.observe(scrollElement);
        }

        window.addEventListener("resize", updateGraphScrollbar);

        return () => {
            dragCleanupRef.current?.();
            scrollbarDragCleanupRef.current?.();
            if (scrollbarFrameRef.current) {
                window.cancelAnimationFrame(scrollbarFrameRef.current);
                scrollbarFrameRef.current = 0;
            }
            resizeObserver?.disconnect();
            window.removeEventListener("resize", updateGraphScrollbar);
        };
    }, [graphWidth, updateGraphScrollbar]);

    const dismissGraphScrollHint = () => {
        scrollHintRef.current?.classList.add("has-interacted");
    };

    const handleGraphPointerDown = (
        event: ReactPointerEvent<HTMLDivElement>,
    ) => {
        if (
            event.pointerType !== "mouse" ||
            event.button !== 0 ||
            !scrollContainerRef.current
        ) {
            return;
        }

        dismissGraphScrollHint();
        dragState.current = {
            active: true,
            pointerId: event.pointerId,
            startX: event.clientX,
            scrollLeft: scrollContainerRef.current.scrollLeft,
            moved: false,
        };
        dragCleanupRef.current?.();

        const handlePointerMove = (pointerEvent: PointerEvent) => {
            const state = dragState.current;
            const scrollElement = scrollContainerRef.current;

            if (
                !state.active ||
                state.pointerId !== pointerEvent.pointerId ||
                !scrollElement
            ) {
                return;
            }

            const deltaX = pointerEvent.clientX - state.startX;

            scrollElement.scrollLeft = state.scrollLeft - deltaX;
            updateGraphScrollbar();

            if (Math.abs(deltaX) > 3) {
                state.moved = true;
                pointerEvent.preventDefault();
            }
        };
        const endPointerDrag = (pointerEvent: PointerEvent) => {
            const state = dragState.current;

            if (!state.active || state.pointerId !== pointerEvent.pointerId) {
                return;
            }

            state.active = false;
            scrollContainerRef.current?.classList.remove("is-dragging");

            if (state.moved) {
                suppressClickRef.current = true;
                window.setTimeout(() => {
                    suppressClickRef.current = false;
                }, 160);
            }

            state.moved = false;
            dragCleanupRef.current?.();
            dragCleanupRef.current = null;
        };

        window.addEventListener("pointermove", handlePointerMove, {
            passive: false,
        });
        window.addEventListener("pointerup", endPointerDrag, {
            passive: false,
        });
        window.addEventListener("pointercancel", endPointerDrag, {
            passive: false,
        });
        dragCleanupRef.current = () => {
            window.removeEventListener("pointermove", handlePointerMove);
            window.removeEventListener("pointerup", endPointerDrag);
            window.removeEventListener("pointercancel", endPointerDrag);
        };
        scrollContainerRef.current.classList.add("is-dragging");
    };

    const handleScrollbarPointerDown = (
        event: ReactPointerEvent<HTMLDivElement>,
    ) => {
        const scrollElement = scrollContainerRef.current;
        const trackElement = scrollTrackRef.current;
        const thumbElement = scrollThumbRef.current;

        if (
            event.button !== 0 ||
            !scrollElement ||
            !trackElement ||
            !thumbElement
        ) {
            return;
        }

        event.preventDefault();
        event.stopPropagation();
        dismissGraphScrollHint();
        scrollbarDragCleanupRef.current?.();
        thumbElement.classList.add("is-dragging");

        const startX = event.clientX;
        const startScrollLeft = scrollElement.scrollLeft;
        const maxScrollLeft =
            scrollElement.scrollWidth - scrollElement.clientWidth;
        const maxThumbLeft = Math.max(
            1,
            trackElement.clientWidth - thumbElement.offsetWidth,
        );

        const handlePointerMove = (pointerEvent: PointerEvent) => {
            const deltaX = pointerEvent.clientX - startX;
            scrollElement.scrollLeft =
                startScrollLeft + (deltaX / maxThumbLeft) * maxScrollLeft;
            updateGraphScrollbar();
            pointerEvent.preventDefault();
        };
        const endPointerDrag = () => {
            thumbElement.classList.remove("is-dragging");
            scrollbarDragCleanupRef.current?.();
            scrollbarDragCleanupRef.current = null;
        };

        window.addEventListener("pointermove", handlePointerMove, {
            passive: false,
        });
        window.addEventListener("pointerup", endPointerDrag);
        window.addEventListener("pointercancel", endPointerDrag);
        scrollbarDragCleanupRef.current = () => {
            window.removeEventListener("pointermove", handlePointerMove);
            window.removeEventListener("pointerup", endPointerDrag);
            window.removeEventListener("pointercancel", endPointerDrag);
        };
    };

    const handleGraphClickCapture = (
        event: ReactMouseEvent<HTMLDivElement>,
    ) => {
        if (!suppressClickRef.current) {
            return;
        }

        event.preventDefault();
        event.stopPropagation();
        suppressClickRef.current = false;
    };

    const handleGraphScroll = () => {
        dismissGraphScrollHint();
        scheduleGraphScrollbarUpdate();
    };

    return {
        handleGraphClickCapture,
        handleGraphPointerDown,
        handleGraphScroll,
        handleScrollbarPointerDown,
        scrollContainerRef,
        scrollHintRef,
        scrollThumbRef,
        scrollTrackRef,
    };
};
