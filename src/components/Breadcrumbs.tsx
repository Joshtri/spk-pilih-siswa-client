import React from 'react';

interface BreadcrumbItem {
  label: string;
  href?: string; // Optional for the current page
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  return (
    <nav className="text-sm text-gray-600">
      <ul className="flex items-center space-x-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {item.href ? (
              <a href={item.href} className="text-blue-500 hover:underline">
                {item.label}
              </a>
            ) : (
              <span>{item.label}</span>
            )}
            {index < items.length - 1 && <span className="mx-2">/</span>}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Breadcrumbs;
