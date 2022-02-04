import { Helmet } from 'react-helmet';
import React from 'react';

const Meta = ({ title, description, keywords }) => {
  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name='description' content={description}></meta>
        <meta name='keywords' content={keywords}></meta>
      </Helmet>
    </>
  );
};

Meta.defaultProps = {
  title: "Mercury's ShopStop ",
  description: 'Best Prices In Town',
  keywords: 'electronics,buy electronics',
};

export default Meta;
