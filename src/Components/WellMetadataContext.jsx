import { createContext, useContext, useEffect, useState } from "react";

export const WellsMetadata = createContext([]);

export const WellsProvider = ({ children }) => {
    const [wellMetadata, setWellMetadata] = useState(() => {
        const cachedData = localStorage.getItem('wellMetadata');
        return cachedData ? JSON.parse(cachedData) : [];
    });

    useEffect(() => {
        if (wellMetadata.length === 0) {
            const controller = new AbortController();
            const signal = controller.signal;
            fetch(`http://54.206.117.183:8888/chchWater/well_metadata`,
                {
                    method: 'GET',
                    mode: 'cors',
                    signal: signal
                }
            ).then(response => response.json())
                .then(data => { setWellMetadata(data) })
                .catch(error => console.log(error));

            return () => {
                // Cancel the fetch request when the component unmounts
                controller.abort();
            };
        }
    }, [wellMetadata])

    return (
        <WellsMetadata.Provider value={[wellMetadata, setWellMetadata]}>
            {children}
        </WellsMetadata.Provider>
    )
}

