// Beachy Beachy Ball
// Copyright (c) 2023 Michael Kolesidis <michael.kolesidis@gmail.com>
// Licensed under the GNU Affero General Public License v3.0.
// https://www.gnu.org/licenses/gpl-3.0.html

import "./styles/style.css";
import { Suspense } from "react";
import ReactDOM from "react-dom/client";
import Loading from "./interface/Loading";
import App from "./App";

const root = ReactDOM.createRoot(document.querySelector("#root"));

root.render(
  <Suspense fallback={<Loading />}>
    <App />
  </Suspense>
);
