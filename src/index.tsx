import React from "react";
import ReactDOM from "react-dom/client";
import {
  MutationCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { BrowserRouter as Router } from "react-router-dom";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

import { App } from "./app";
import { HttpError, ValidationError } from "./@utils/createError";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
      retry: 0,
    },
  },
  mutationCache: new MutationCache({
    onError: error => {
      if (error instanceof ValidationError) {
        return toast.error(error.message);
      }

      if (error instanceof AxiosError && error.response) {
        return toast.error(new HttpError(error).message, {
          theme: "colored",
        });
      }

      return toast.error("An error occurred. Please try again.", {
        theme: "colored",
      });
    },
  }),
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Router>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </Router>
  </React.StrictMode>,
);
