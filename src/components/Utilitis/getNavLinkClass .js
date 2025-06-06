export const getNavLinkClass = ({ isActive }) =>
    `block px-4 py-2 rounded font-semibold transition duration-200 ${isActive
        ? 'bg-blue-600 text-white shadow'
        : 'text-gray-700 hover:bg-gray-100 hover:text-blue-600'
    }`;
