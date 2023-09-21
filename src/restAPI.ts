import {IShift, ITimeoff, IUser} from "./state/schedulerTypes";

const baseUrl = 'http://localhost:4000';

function translateStatusToErrorMessage(status: number, page='shifts') {
    switch (status) {
        case 401:
            return 'Please login again.';
        case 403:
            return `You do not have permission to view the ${page}.`;
        default:
            return `There was an error retrieving the ${page}. Please try again.`;
    }
}

function checkStatus(page = "shifts") {
    return function (response: any) {
        if (response.ok) {
            return response;
        } else {
            const httpErrorInfo = {
                status: response.status,
                statusText: response.statusText,
                url: response.url,
            };
            console.log(`log server http error: ${JSON.stringify(httpErrorInfo)}`);

            let errorMessage = translateStatusToErrorMessage(httpErrorInfo.status, page);
            throw new Error(errorMessage);
        }
    }
}

function parseJSON(response: Response) {
    return response.json();
}

const usersAPI = {
    // Login, Find user to authenticate
    find(username: string, password:string) {
        return fetch(`${baseUrl}/users?username=${username}&password=${password}`)
            .then(checkStatus("users"))
            .then(parseJSON)
            .then((user) => {
                if (user.length > 0) {
                    return user[0];
                } else {
                    throw new Error("User not found. Please try again");
                }
            });
    },
    // Create User
    post(user: IUser) {
        return fetch(`${baseUrl}/users`, {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(checkStatus("users"))
            .then(parseJSON)
            .catch((error: TypeError) => {
                throw new Error(
                    'There was an error creating the user. Please try again.'
                );
            });
    },
    // For Admin, get all users
    getAll() {
        return fetch(`${baseUrl}/users`)
            .then(checkStatus("users"))
            .then(parseJSON);
    }

};

const shiftsAPI = {
    // For Admin, Create Shift
    post(shift: IShift) {
        return fetch(`${baseUrl}/shifts`, {
            method: 'POST',
            body: JSON.stringify(shift),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(checkStatus("shifts"))
            .then(parseJSON)
            .catch((error: TypeError) => {
                throw new Error(
                    'There was an error creating the shift. Please try again.'
                );
            });
    },
    // For user, accept timeoff
    put(shift: IShift) {
        return fetch(`${baseUrl}/shifts/${shift.id}`, {
            method: 'PUT',
            body: JSON.stringify(shift),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(checkStatus("shifts"))
            .then(parseJSON)
            .catch((error: TypeError) => {
                throw new Error(
                    'There was an error creating the shift. Please try again.'
                );
            });
    },
    // For Admin, view all users shifts
    getAll() {
        return fetch(`${baseUrl}/shifts`)
            .then(checkStatus("shifts"))
            .then(parseJSON)
            .catch((error: TypeError) => {
                throw new Error(
                    'There was an error retrieving the shifts. Please try again.'
                );
            });
    },
    // For user, view his shifts and available shifts (userId=0)
    getUserShifts(userId: number) {
        return fetch(`${baseUrl}/shifts?userId=${userId}&userId=0`)
            .then(checkStatus("shifts"))
            .then(parseJSON)
            .catch((error: TypeError) => {
                throw new Error(
                    'There was an error retrieving the shifts. Please try again.'
                );
            });
    }

};

const timeoffAPI = {
    // Submitting request timeoff
    post(timeoff: ITimeoff) {
        return fetch(`${baseUrl}/timeoff`, {
            method: 'POST',
            body: JSON.stringify(timeoff),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(checkStatus("timeoff"))
            .then(parseJSON)
            .catch((error: TypeError) => {
                throw new Error(
                    'There was an error requesting timeoff. Please try again.'
                );
            });
    },
    // Updating timeoff
    put(timeoff: ITimeoff) {
        return fetch(`${baseUrl}/timeoff/${timeoff.id}`, {
            method: 'PUT',
            body: JSON.stringify(timeoff),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(checkStatus("timeoff"))
            .then(parseJSON)
            .catch((error: TypeError) => {
                throw new Error(
                    'There was an error requesting timeoff. Please try again.'
                );
            });
    },
    // For Admin, get all users timeoff
    getAll() {
        return fetch(`${baseUrl}/timeoff`)
            .then(checkStatus("timeoff"))
            .then(parseJSON)
            .catch((error: TypeError) => {
                throw new Error(
                    'There was an error retrieving the timeoffs. Please try again.'
                );
            });
    },
    // For user login, get his timeoffs
    getUserTimeoffs(userId: number) {
        return fetch(`${baseUrl}/timeoff?userId=${userId}`)
            .then(checkStatus("timeoff"))
            .then(parseJSON)
            .catch((error: TypeError) => {
                throw new Error(
                    'There was an error retrieving the timeoffs. Please try again.'
                );
            });
    },
    requestTimeoffs(userId: number) {
        return fetch(`${baseUrl}/timeoff?userId=${userId}`)
            .then(checkStatus("timeoff"))
            .then(parseJSON)
            .catch((error: TypeError) => {
                throw new Error(
                    'There was an error requesting the timeoffs. Please try again.'
                );
            });
    }

};

export { usersAPI, shiftsAPI, timeoffAPI };