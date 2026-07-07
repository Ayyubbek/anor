import '@mantine/core/styles.css'
import '@mantine/dates/styles.css'
import "@mantine/notifications/styles.css"

import './App.css'
import {createTheme, MantineProvider} from "@mantine/core";
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import {createBrowserRouter, RouterProvider} from "react-router";
import {HomePage} from "./pages/HomePage.tsx";
import {NotFoundPage} from "./pages/NotFoundPage.tsx";

const theme = createTheme({
    primaryColor: 'red'
});

const client = new QueryClient()

const router = createBrowserRouter([
    {
        path: '/',
        element: <HomePage/>
    },
    {
        path: '*',
        element: <NotFoundPage/>
    }
])

function App() {
    return (
        <QueryClientProvider client={client}>
            <MantineProvider theme={theme}>
                <RouterProvider router={router}/>
            </MantineProvider>
        </QueryClientProvider>
    )
}

export default App
