interface InstanceRequestClientConf {
    url: string,
    method: string,
    data?: any,
    options?: any,
    headers?: any,
}

interface InstanceResponseClientConf {
    success: boolean,
    data: any,
    error?: any
}

const InstanceRequestClient = async ({
    url,
    method,
    data = {},
    options = {},
    headers = {}
}: InstanceRequestClientConf): Promise<InstanceResponseClientConf> => {
    const baseURL = '/api';
    try {
        const response = await fetch(`${baseURL}${url}`, {
            method,
            headers: {
                'Content-Type': 'application/json',
                ...headers,
                ...options
            },
            body: JSON.stringify(data),
            credentials: 'include',
        })

        return {
            success: response.ok,
            data: await response.json(),
        };
    } catch (error) {
        console.error('Error in InstanceRequestClient:', error);
        throw error; // Rethrow the error after logging it

    }
}

export {
    InstanceRequestClient
}