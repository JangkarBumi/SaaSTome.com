import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import Navbar from './Navbar';
import Product from './Product';

const Dashboard = () => {
  const [saas, setSaas] = useState([]);
  const [queryLimit, setQueryLimit] = useState(6);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await db
          .collection('saas')
          .orderBy('timestamp', 'desc')
          .limit(queryLimit)
          .get();
        let holder = [];
        res.forEach((doc) => {
          const { title, tagline } = doc.data();
          holder.push({ id: doc.id, title, tagline });
        });
        setSaas(holder);
        setLoading(false);
      } catch (error) {}
    };
    getData();
  }, [queryLimit]);

  return (
    <div>
      <Navbar />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 sm:gap-x-20">
        {saas.map((e) => {
          return <Product key={e.id} title={e.title} tagline={e.tagline} />;
        })}
      </div>
      <button
        onClick={() => setQueryLimit(queryLimit + 3)}
        className="px-2 py-1 rounded bg-primary text-white"
      >
        Load More
      </button>
    </div>
  );
};

export default Dashboard;
