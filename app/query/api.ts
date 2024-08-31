const API_BASE_URL = process.env.NODE_ENV.includes('dev') ? 'http://localhost:4000/dev' : 'https://hgqcgarw0d.execute-api.eu-north-1.amazonaws.com/dev'; // Adjust this based on your Serverless configuration

export async function submitGuess(username: string, guess: string) {
    const response = await fetch(`${API_BASE_URL}/guess`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, guess }),
    });

    const data = await response.json();
    console.log(data.message);
    return data;
}

export async function resolveGuess(username: string) {
    const response = await fetch(`${API_BASE_URL}/resolve`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username }),
    });

    const data = await response.json();
    console.log(data.message);
    return data;
}

export async function fetchStatus(username: string) {
    const response = await fetch(`${API_BASE_URL}/get-score/${username}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const data = await response.json();
    console.log(data.message);
    return data;
}