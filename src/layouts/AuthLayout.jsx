import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <main className="container mx-auto md:grid md:grid-cols-2 items-center gap-20 mt-20">
      <Outlet/>
    </main>
  )
}

export default AuthLayout