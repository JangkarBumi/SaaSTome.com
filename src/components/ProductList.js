import React, { useCallback, useEffect, useRef, useState } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { db } from '../firebase';
import Product from './Product';

const ProductList = () => {
  const [saasList, setSaasList] = useState([]);
  const [queryLimit, setQueryLimit] = useState(6);
  const [loading, setLoading] = useState(true);
  const [showFilter, setShowFilter] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [pricingFilter, setPricingFilter] = useState('All');

  // Filtering fetch
  const [priceFilter, setPriceFilter] = useState('all');

  useEffect(() => {
    filterSaaS();
  }, [priceFilter, queryLimit]);

  const filterSaaS = async () => {
    setShowFilter(false);
    let query = db.collection('saas');

    if (Array.isArray(priceFilter)) {
      query = query
        .where('pricing', '>=', priceFilter[0])
        .where('pricing', '<=', priceFilter[1]);
    } else {
      if (priceFilter === 'all') {
        query = query.limit(queryLimit);
      }

      if (priceFilter === 'Free') {
        query = query.where('pricing', '>=', 'Free').limit(queryLimit);
      }
    }

    const snapshot = await query.get();

    if (snapshot.empty) {
      console.log('No matching documents.');
      return;
    }

    const data = [];
    snapshot.forEach((doc) => {
      const { title, tagline, pricing, category } = doc.data();

      data.push({
        id: doc.id,
        title,
        tagline,
        pricing,
        category,
      });
    });

    setSaasList(data);
    setHasMore(data.length > saasList.length);
    setLoading(false);
  };

  // Initial fetch
  // useEffect(() => {
  //   const getData = async () => {
  //     try {
  //       const res = await db.collection('saas').limit(queryLimit).get();
  //       let holder = [];
  //       res.forEach((doc) => {
  //         const { title, tagline, pricing, category } = doc.data();

  //         holder.push({
  //           id: doc.id,
  //           title,
  //           tagline,
  //           pricing,
  //           category,
  //         });
  //       });

  //       setSaasList(holder);

  //       setHasMore(holder.length > saasList.length);
  //       setLoading(false);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   getData();
  // }, [queryLimit]);

  // Infinite scroll
  const observer = useRef(
    new IntersectionObserver(() => {}, { threshold: 1 }) // threshold 1 meaning the element need to be 100% visible before this event triggered
  );

  const lastSaasElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setQueryLimit((prevQueryLimit) => prevQueryLimit + 3);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  // Display Skeleton Screen while loading
  if (loading)
    return (
      <div>
        <button className="font-bold text-lg bg-white px-6 py-2 rounded border">
          Filter
        </button>
        <div className="mt-6 grid md:grid-cols-2 lg:grid-cols-3 sm:gap-x-20">
          {[...Array(3)].map((e, i) => (
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
          onClick={() => setQueryLimit((prevQueryLimit) => prevQueryLimit + 3)}
          className="focus:outline-none font-bold text-lg bg-white px-6 py-2 rounded border mt-6"
        >
          Load More
        </button>
      </div>
    );

  return (
    <div className="py-6">
      <div className={showFilter ? 'hidden' : 'block'}>
        <div
          onClick={() => setShowFilter(!showFilter)}
          className="inline-block mt-6 px-4 py-2 rounded-lg border bg-primary text-white whitespace-nowrap transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
        >
          <h1 className="font-semibold">Pricing</h1>
          {pricingFilter}
        </div>
      </div>

      <div className={showFilter ? 'block' : 'hidden'}>
        <h3 className="font-bold color-primary">Pricing</h3>
        <div className="flex">
          <input
            className="mt-1 mr-2"
            type="radio"
            value={'all'}
            checked={priceFilter === 'all'}
            onChange={(e) => {
              setPriceFilter(e.target.value);
              setPricingFilter('All');
            }}
          />
          <p>All</p>
        </div>

        <div className="flex">
          <input
            className="mt-1 mr-2"
            type="radio"
            value={'Free'}
            checked={priceFilter === 'Free'}
            onChange={(e) => {
              setPriceFilter(e.target.value);
              setPricingFilter('Free');
            }}
          />
          <p>Free</p>
        </div>

        <div className="flex">
          <input
            className="mt-1 mr-2"
            type="radio"
            value={(0, 25)}
            checked={priceFilter[1] === 25} // temporary solution because priceFilter == [0,25] is false
            onChange={() => {
              setPriceFilter([0, 25]);
              setPricingFilter('$0 - $25');
            }}
          />
          <p>$0 - $25</p>
        </div>

        <div className="flex">
          <input
            className="mt-1 mr-2"
            type="radio"
            value={[25, 50]}
            checked={priceFilter[1] === 50}
            onChange={(e) => {
              setPriceFilter([25, 50]);
              setPricingFilter('$25 - $50');
            }}
          />
          <p>$25 - $50</p>
        </div>

        <div className="flex">
          <input
            className="mt-1 mr-2"
            type="radio"
            value={[50, 1000]}
            checked={priceFilter[1] === 1000}
            onChange={() => {
              setPriceFilter([50, 1000]);
              setPricingFilter('$50+');
            }}
          />
          <p>$50+</p>
        </div>
      </div>

      <div className="grid  md:grid-cols-2 lg:grid-cols-3 sm:gap-x-20 ">
        {saasList.map((product, index) => {
          if (saasList.length === index + 1) {
            return (
              <div
                className="bg-white mt-6 px-4 py-4 rounded border transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105"
                ref={lastSaasElementRef}
                key={product.id}
              >
                <Product
                  title={product.title}
                  link={product.link}
                  tagline={product.tagline}
                  pricing={product.pricing}
                  category={product.category}
                />
              </div>
            );
          } else {
            return (
              <div
                className="bg-white mt-6 px-4 py-4 rounded border transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105"
                key={product.id}
              >
                <Product
                  title={product.title}
                  link={product.link}
                  tagline={product.tagline}
                  pricing={product.pricing}
                  category={product.category}
                />
              </div>
            );
          }
        })}
      </div>
      {hasMore ? (
        <button
          onClick={() => setQueryLimit((prevQueryLimit) => prevQueryLimit + 3)}
          className="focus:outline-none font-bold text-lg bg-white px-6 py-2 rounded border mt-6"
        >
          Load More
        </button>
      ) : null}
    </div>
  );
};

export default ProductList;
