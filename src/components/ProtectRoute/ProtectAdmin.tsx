

import { useInfoUser } from "@/hooks"
import { Navigate, Outlet } from "react-router-dom"

export function ProtectAdmin() {
  const user=useInfoUser()
  return user?.RoleName==="Admin" ? <Outlet /> : <Navigate to="/home/info-employee" replace={true} />
}
