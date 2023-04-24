import axios from 'axios';

export const getUsers = async (setUsers, requestParams, setResponseInfo, setStatus) => {
    try {
        const params = {
            page: requestParams.page
        };
        requestParams.filters?.forEach((filter) => {
            params[`filter[${filter.name}]`] = filter.value;
        });
        const response = await axios.get('/admin/users', { params });
        setUsers(response.data.users.data);

        setResponseInfo({
            total: response.data.users.total,
            availableFilters: response.data.users.filters
        });
        setStatus(1);
    } catch (err) {
        console.error(`Error getting users ${err}`);
    }
};

export const getUser = async (id, setUser, setStatus) => {
    try {
        const response = await axios.get(`/admin/users/${id}`);
        setUser(response.data.user);

        setStatus(1);
    } catch (err) {
        console.error(`Error getting user detail ${err}`);
    }
};

export const createUser = async (user) => {
    const response = await axios.post(`/admin/users`, user);
    return response;
};

export const updateUser = async (id, user) => {
    const response = await axios.put(`/admin/users/${id}`, user);
    return response;
};

export const finishBookCheckout = async (id) => {
    const response = await axios.put(`/admin/checkouts/${id}/finish`);
    return response;
};
