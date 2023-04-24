import axios from 'axios';

export const getBooks = async (setBooks, requestParams, setResponseInfo, setStatus) => {
    try {
        const params = {
            page: requestParams.page
        };
        requestParams.filters?.forEach((filter) => {
            params[`filter[${filter.name}]`] = filter.value;
        });
        const response = await axios.get('/books?filter[published]=true', { params });
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
        const response = await axios.get(`/books/${id}`);
        setBook(response.data.book);

        setStatus(1);
    } catch (err) {
        console.error(`Error getting book detail ${err}`);
    }
};

export const requestBookCheckout = async (id) => {
    const response = await axios.post(`/books/${id}/checkout`);
    return response;
};

export const getCheckoutHistory = async (setBooks, requestParams, setResponseInfo, setStatus) => {
    try {
        const params = {
            page: requestParams.page
        };
        const response = await axios.get('/checkouts', { params });
        setBooks(response.data.checkouts.data);

        setResponseInfo({
            total: response.data.checkouts.total
        });
        setStatus(1);
    } catch (err) {
        console.error(`Error getting checkout history ${err}`);
    }
};
