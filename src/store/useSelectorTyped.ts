import { useSelector } from "react-redux";

type RootState = {
    fromClient: {
        theme: number;
    };
};

export default function useSelectorTyped<T>(fn: (state: RootState) => T): T {
    return useSelector(fn);
}

