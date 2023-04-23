import { BrowserRouter } from 'react-router-dom';
import Routes from './routes';
import axios from 'axios';
import { useSnackbar } from 'notistack';

function App() {
    //  GLOBAL SNACKBAR DISPLAY ON ERRORS.
    const { enqueueSnackbar } = useSnackbar();

    axios.defaults.baseURL = process.env.REACT_APP_SERVER;
    axios.defaults.headers.common.authorization = `Bearer ${localStorage.getItem('token')}`;
    axios.interceptors.response.use(
        (r) => r,
        (error) => {
            let errorMessage = '';
            if (error.response.data.errors && Object.keys(error.response.data.errors > 0)) {
                errorMessage = `Errors: ${Object.keys(error.response.data.errors)
                    .map((err) => error.response.data.errors[err][0])
                    .join(' , ')}`;
            } else {
                errorMessage = error.response.data.message;
            }
            enqueueSnackbar(errorMessage, { variant: 'error', autoHideDuration: 2500 });

            throw error;
        }
    );

    return (
        <BrowserRouter>
            <Routes />
        </BrowserRouter>
    );
}

export default App;
