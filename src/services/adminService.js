import axios from 'axios';

// USER:

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

// BOOKS:
export const getBooks = async (setBooks, requestParams, setResponseInfo, setStatus) => {
    try {
        const params = {
            page: requestParams.page
        };
        requestParams.filters?.forEach((filter) => {
            params[`filter[${filter.name}]`] = filter.value;
        });
        const response = await axios.get('/admin/books', { params });
        setBooks(response.data.books.data);

        setResponseInfo({
            total: response.data.books.total,
            availableFilters: response.data.books.filters
        });
        setStatus(1);
    } catch (err) {
        console.error(`Error getting books ${err}`);
    }
};

export const getBook = async (id, setBook, setStatus) => {
    try {
        const response = await axios.get(`/admin/books/${id}`);
        setBook(response.data.book);

        setStatus(1);
    } catch (err) {
        console.error(`Error getting user detail ${err}`);
    }
};

export const createBook = async (user) => {
    const response = await axios.post(`/admin/books`, user);
    return response;
};

export const updateBook = async (id, user) => {
    const response = await axios.put(`/admin/books/${id}`, user);
    return response;
};

export const finishBookCheckout = async (id) => {
    const response = await axios.put(`/admin/checkouts/${id}/finish`);
    return response;
};

export const getAuthorsList = async (setAuthors) => {
    try {
        const response = await axios.get('/admin/authors/list');
        const authors = [];
        for (const [key, value] of Object.entries(response.data.authors)) {
            authors.push({ id: key, label: value });
        }
        setAuthors(authors);
    } catch (err) {
        console.error(`Error getting authors  ${err}`);
    }
};

export const getGenresList = async (setAuthors) => {
    try {
        const response = await axios.get('/admin/genres/list');
        const genres = [];
        for (const [key, value] of Object.entries(response.data.genres)) {
            genres.push({ id: key, label: value });
        }
        setAuthors(genres);
    } catch (err) {
        console.error(`Error getting genres  ${err}`);
    }
};
