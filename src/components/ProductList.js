import React, { useEffect, useState } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { db } from '../firebase';
import Product from './Product';

const ProductList = () => {
  const [saasList, setSaasList] = useState([]);
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
        setSaasList(holder);
        setLoading(false);
      } catch (error) {}
    };
    getData();
  }, [queryLimit]);

  // Display Skeleton Screen while loading
  if (loading)
    return (
      <div>
        <button className="font-bold text-lg bg-white px-6 py-2 rounded border">
          Filter
        </button>
        <div className="mt-6 grid md:grid-cols-2 lg:grid-cols-3 sm:gap-x-20">
          {[...Array(6)].map((e, i) => (
            <div key={i}>
              <SkeletonTheme color="#D7D7D7">
                <Skeleton className="rounded-lg" height={220}></Skeleton>
                <Skeleton width={150} className="mt-4"></Skeleton>
                <Skeleton count={2} className="mt-4" />
              </SkeletonTheme>
            </div>
          ))}
        </div>
        <button
          onClick={() => setQueryLimit(queryLimit + 3)}
          className="px-2 py-1 rounded bg-primary text-white"
        >
          Load More
        </button>
      </div>
    );

  return (
    <div className="py-6">
      <button className="font-bold text-lg bg-white px-6 py-2 rounded border">
        Filter
      </button>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 sm:gap-x-20">
        {saasList.map((product) => {
          return (
            <Product
              key={product.title}
              title={product.title}
              link={product.link}
              tagline={product.tagline}
              pricing={product.pricing}
              category={product.category}
            />
          );
        })}
      </div>
      <button
        onClick={() => setQueryLimit(queryLimit + 3)}
        className="font-bold text-lg bg-white px-6 py-2 rounded border mt-6"
      >
        Load More
      </button>
    </div>
  );
};

export default ProductList;
