import React, { useEffect, useState } from 'react';
import { db } from '../firebase';

const Dashboard = () => {
  const [saas, setSaas] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await db
          .collection('saas')
          .orderBy('timestamp', 'desc')
          .get();
        let holder = [];
        res.forEach((doc) => {
          const { title } = doc.data();
          holder.push({ title, id: doc.id });
        });
        setSaas(holder);
      } catch (error) {}
    };
    getData();
  }, []);

  return (
    <div>
      {saas.map((e) => {
        return <h1 key={e.id}>{e.title}</h1>;
      })}
    </div>
  );
};

export default Dashboard;
