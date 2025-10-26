// import { useAuth } from "@/context/AuthContext";
// import { useNavigate } from "react-router-dom";
// import { Button } from "@/components/ui/button";

// const Navbar = () => {
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     navigate("/login");
//   };

//   return (
//     <nav className="bg-white border-b border-gray-200">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-16">
//           <div className="flex items-center">
//             <h1 className="text-xl font-bold hidden sm:block">
//               Fitness Centre
//             </h1>
//           </div>

//           <div className="flex items-center gap-4 ml-auto">
//             <span className="text-sm text-gray-700 hidden sm:inline">
//               {user?.email}
//             </span>
//             <Button variant="outline" size="sm" onClick={handleLogout}>
//               Logout
//             </Button>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

import { useAuth } from "@/context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-8">
            <h1 className="text-xl font-bold">Fitness Centre</h1>

            <div className="hidden md:flex gap-1">
              <Button
                variant={isActive("/dashboard") ? "secondary" : "ghost"}
                onClick={() => navigate("/dashboard")}
              >
                Members
              </Button>
              <Button
                variant={isActive("/analytics") ? "secondary" : "ghost"}
                onClick={() => navigate("/analytics")}
              >
                Analytics
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-700 hidden sm:block">
              {user?.email}
            </span>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>

        <div className="md:hidden flex gap-1 pb-3">
          <Button
            variant={isActive("/dashboard") ? "secondary" : "ghost"}
            size="sm"
            onClick={() => navigate("/dashboard")}
          >
            Members
          </Button>
          <Button
            variant={isActive("/analytics") ? "secondary" : "ghost"}
            size="sm"
            onClick={() => navigate("/analytics")}
          >
            Analytics
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
