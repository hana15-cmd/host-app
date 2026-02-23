import { BrowserRouter } from "react-router-dom";
import { Suspense } from "react";
import AppRoutes from "./router/AppRoutes";

export default function App() {
  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <div className="text-center mt-24 text-white text-xl">
            Loading module...
          </div>
        }
      >
        <AppRoutes />
      </Suspense>
    </BrowserRouter>
  );
}