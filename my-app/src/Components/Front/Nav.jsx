import { NavLink } from "react-router-dom";

function FrontNav() {
  return (
    <>
      <div className="container header">
        <div className="row">
          <div className="col-12">
            <nav className="nav">
              <NavLink
                to="/story/"
                className="nav-link"
                style={({ isActive }) =>
                  isActive
                    ? {
                        color: "#10984d",
                      }
                    : null
                }
              >
                Add New Story
              </NavLink>
              <NavLink
                to="/"
                className="nav-link"
                style={({ isActive }) =>
                  isActive
                    ? {
                        color: "#10984d",
                      }
                    : null
                }
              >
                Main Page
              </NavLink>

              <NavLink
                to="/admin/"
                className="nav-link"
                style={({ isActive }) =>
                  isActive
                    ? {
                        color: "#10984d",
                      }
                    : null
                }
              >
                Admin
              </NavLink>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}

export default FrontNav;
