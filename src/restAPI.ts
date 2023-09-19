import {IUser} from "./state/schedulerTypes";

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
    getAll() {
        return fetch(`${baseUrl}/users`)
            .then(checkStatus("users"))
            .then(parseJSON);
    }

};

const shiftsAPI = {
    // get(userId: number) {
    //     return fetch(`${baseUrl}/shifts`)
    //         .then(checkStatus("shifts"))
    //         .then(parseJSON)
    //         .catch((error: TypeError) => {
    //             // console.log('log client error ' + error);
    //             throw new Error(
    //                 'There was an error retrieving the projects. Please try again.'
    //             );
    //         });
    // },

};



export { usersAPI, shiftsAPI };