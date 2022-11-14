import { Link } from "react-router-dom";

function NavLinks({linker, linkdo}) {
  return (
    <nav className="lg:flex justify-between mt-5">
      <Link
        to="/"
        className="text-gray-600 block text-center lg:text-left mb-4 hover:text-gray-900 hover:underline transition-colors duration-300"
      >
        {linker}
      </Link>

      <Link
        to="/"
        className="text-gray-600 block text-center lg:text-left mb-4 hover:text-gray-900 hover:underline transition-colors duration-300"
      >
        {linkdo}
      </Link>
    </nav>
  )
}

export default NavLinks