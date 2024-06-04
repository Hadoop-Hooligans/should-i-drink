import { createContext, useEffect, useState } from "react";

export const AcceptableDeterminands = createContext([]);

export const AcceptableDeterminandsProvider = ({ children }) => {
    const [acceptableValues, setAcceptableValues] = useState(() => {
        const cachedData = localStorage.getItem('acceptableDeterminands');
        return cachedData ? JSON.parse(cachedData) : [];
    });

    useEffect(() => {
        if (acceptableValues.length === 0) {
            const controller = new AbortController();
            const signal = controller.signal;
            fetch(`http://54.206.117.183:8888/chchWater/acceptable_determinands`,
                {
                    method: 'GET',
                    mode: 'cors',
                    signal: signal
                }
            ).then(response => response.json())
                .then(data => {
                    data = data[0]
                    let accVal = []
                    Object.entries(data).forEach(([key, value]) => {
                        if (key !== 'id' && key !== 'date_recorded' && key !== 'well_id') {
                            accVal.push({ name: key, value: value })
                        }
                    })
                    setAcceptableValues(accVal)
                })
                .catch(error => console.log(error));

            return () => {
                // Cancel the fetch request when the component unmounts
                controller.abort();
            };
        }
    }, [acceptableValues])

    return (
        <AcceptableDeterminands.Provider value={[acceptableValues, setAcceptableValues]}>
            {children}
        </AcceptableDeterminands.Provider>
    )
}

