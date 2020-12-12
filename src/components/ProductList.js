import React, { useEffect, useState } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { db } from '../firebase';
import Product from './Product';

const ProductList = () => {
  const [saasList, setSaasList] = useState([]);
  const [queryLimit, setQueryLimit] = useState(6);
  const [loading, setLoading] = useState(true);
  const [showFilter, setShowFilter] = useState(false);

  // Initial fetch and load more
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
          const { title, tagline, pricing, category } = doc.data();
          holder.push({ id: doc.id, title, tagline, pricing, category });
        });
        setSaasList(holder);
        setLoading(false);
      } catch (error) {}
    };
    getData();
  }, [queryLimit]);

  // Filtering fetch
  const [priceFilter, setPriceFilter] = useState('all');

  useEffect(() => {
    filterSaaS();
  }, [priceFilter]);

  const filterSaaS = async () => {
    let query = db.collection('saas');

    if (priceFilter === 'all') {
      query = db.collection('saas').limit(6);
    }

    if (priceFilter === 'free') {
      query = db.collection('saas').where('pricing', '>=', 'Free').limit(6);
    }

    if (Array.isArray(priceFilter)) {
      query = query
        .where('pricing', '>=', priceFilter[0])
        .where('pricing', '<=', priceFilter[1]);
    }

    const snapshot = await query.get();

    if (snapshot.empty) {
      console.log('No matching documents.');
      return;
    }

    const data = [];
    snapshot.forEach((doc) => {
      data.push(doc.data());
    });

    setSaasList(data);
  };

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
      <button
        onClick={() => setShowFilter(true)}
        className="font-bold text-lg bg-white px-6 py-2 rounded border"
      >
        Filter
      </button>

      <div className={showFilter ? 'block' : 'hidden'}>
        <div className="flex">
          <input
            className="mt-1 mr-2"
            type="radio"
            value={'all'}
            checked={priceFilter == 'all'}
            // onChange={onChange}
          />
          <p>All</p>
        </div>

        <button
          onClick={() => {
            setPriceFilter('all');
          }}
        >
          All
        </button>

        <button
          onClick={() => {
            setPriceFilter('free');
          }}
        >
          Free
        </button>

        <button
          onClick={() => {
            setPriceFilter([0, 25]);
          }}
        >
          $ 0 - 25
        </button>

        <button
          onClick={() => {
            setPriceFilter([25, 50]);
          }}
        >
          $ 25 - 50
        </button>

        <button
          onClick={() => {
            setPriceFilter([50, 1000]);
          }}
        >
          $ 50+
        </button>
      </div>

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
        className="focus:outline-none font-bold text-lg bg-white px-6 py-2 rounded border mt-6"
      >
        Load More
      </button>
    </div>
  );
};

export default ProductList;
