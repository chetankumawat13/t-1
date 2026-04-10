import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Login from "../features/auth/pages/Login";
import Register from "../features/auth/pages/Register";
import ProtectedRoute from "./ProtectedRoute";

import Archive from "../features/items/pages/Archive";
import AllSaves from "../features/items/pages/AllSaves";
import RecentlyDeleted from "../features/items/pages/RecentlyDeleted";
import GraphPage from "../features/items/pages/GraphPage"; 

const AppRoutes = () => {
  return (
    <Routes>

     
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      >
        
        <Route index element={<AllSaves />} />
        <Route path="saves" element={<AllSaves />} />
        <Route path="deleted" element={<RecentlyDeleted />} />
        <Route path="archive" element={<Archive />} />
        <Route path="graph" element={<GraphPage />} /> 
      </Route>

      {/* PUBLIC */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

    </Routes>
  );
};

export default AppRoutes;