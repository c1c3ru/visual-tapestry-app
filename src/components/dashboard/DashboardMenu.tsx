import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card } from "@/components/ui/card";
import { useDashboardStore } from '@/stores/useDashboardStore';

export const DashboardMenu = ({ menuItems }: { menuItems: { title: string; route: string }[] }) => {
  return (
    <nav>
      <ul>
        {menuItems.map((item, index) => (
          <li key={index}>
            <a href={item.route}>{item.title}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
};