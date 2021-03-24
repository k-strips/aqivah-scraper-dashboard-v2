import DashboardLayout from '@components/DashboardLayout';
import Head from 'next/head';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <DashboardLayout hideBackButton>
      index page
    </DashboardLayout>
  );
}
