import React from 'react';
import { ComponentParams, ComponentRendering } from '@sitecore-jss/sitecore-jss-nextjs';
import OfferCategory from 'src/internalComponents/Offer/OfferCategory';

interface OfferCategoryProps {
  rendering: ComponentRendering & { params: ComponentParams };
  params: ComponentParams;
}

export const Default = (props: OfferCategoryProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;

  return <OfferCategory />;
};
