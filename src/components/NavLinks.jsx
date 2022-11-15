import { Link } from "react-router-dom";

function NavLinks({linker, linkdo, texter, textdo}) {
  return (
    <nav className="lg:flex justify-between mt-5">
      <Link
        to={linker}
        className="text-gray-600 block text-center lg:text-left mb-4 hover:text-gray-900 hover:underline transition-colors duration-300"
      >
        {texter}
      </Link>

      <Link
        to={linkdo}
        className="text-gray-600 block text-center lg:text-left mb-4 hover:text-gray-900 hover:underline transition-colors duration-300"
      >
        {textdo}
      </Link>
    </nav>
  )
}

export default NavLinks