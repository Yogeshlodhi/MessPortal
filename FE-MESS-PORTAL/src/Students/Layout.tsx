import { Outlet, NavLink } from "react-router-dom";

const StudentsLayout = () => {
  return (
    <div className="flex">
      <aside className="w-64 bg-gray-100 p-4">
        <nav className="space-y-2">
          <NavLink to="dashboard">Dashboard</NavLink>
          <NavLink to="meals">Meals</NavLink>
          <NavLink to="payments">Payments</NavLink>
        </nav>
      </aside>
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}

export default StudentsLayout;