
import { Link } from 'react-router-dom';

export interface CategoryCardProps {
  title: string;
  icon: React.ReactNode;
  color: string;
  count: number;
  href: string;
}

export function CategoryCard({ title, icon, color, count, href }: CategoryCardProps) {
  return (
    <Link to={href} className="block">
      <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-5 text-center card-hover">
        <div
          className={`w-14 h-14 mx-auto rounded-full flex items-center justify-center mb-3 ${color}`}
        >
          {icon}
        </div>
        <h3 className="font-semibold mb-1">{title}</h3>
        <p className="text-sm text-gray-500">{count} events</p>
      </div>
    </Link>
  );
}
