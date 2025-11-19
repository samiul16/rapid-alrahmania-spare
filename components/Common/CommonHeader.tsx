"use client";

import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href?: string;
  isActive?: boolean;
}

interface CommonHeaderProps {
  breadcrumbs: BreadcrumbItem[];
  title?: string;
  subtitle?: string;
  className?: string;
}

export default function CommonHeader({
  breadcrumbs,
  title,
  subtitle,
  className = "",
}: CommonHeaderProps) {
  return (
    <div className={`bg-white mt-24 py-4 px-4 ${className}`}>
      <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-20">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center space-x-2 text-sm">
          {breadcrumbs.map((item, index) => (
            <div key={index} className="flex items-center">
              {index > 0 && <span className="text-gray-400 mx-2">/</span>}

              {item.href && !item.isActive ? (
                <Link
                  href={item.href}
                  className="text-gray-600 hover:text-gray-900 transition-colors font-semibold text-lg"
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  className={
                    item.isActive
                      ? "text-[#E9292A] font-semibold text-lg"
                      : "text-gray-600 font-semibold text-lg"
                  }
                >
                  {item.label}
                </span>
              )}
            </div>
          ))}
        </nav>

        {/* Optional Title and Subtitle */}
        {title && (
          <div className="mt-4">
            <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
            {subtitle && <p className="text-gray-600 mt-1">{subtitle}</p>}
          </div>
        )}
      </div>
    </div>
  );
}
