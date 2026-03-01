import { useEffect, useState } from 'react';

export function useAppInit() {
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        async function init() {
            try {
                await Promise.all([]);
            } catch (error) {
                console.error('App init error:', error);
            } finally {
                setIsReady(true);
            }
        }

        init();
    }, []);

    return { isReady };
}
