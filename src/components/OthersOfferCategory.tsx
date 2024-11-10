import React from 'react';
import { ComponentParams, ComponentRendering } from '@sitecore-jss/sitecore-jss-nextjs';
import OthersOfferCategory from 'src/internalComponents/Offer/OthersOfferCategory';

interface OthersOfferCategoryProps {
  rendering: ComponentRendering & { params: ComponentParams };
  params: ComponentParams;
}

export const Default = (props: OthersOfferCategoryProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;

  return <OthersOfferCategory />;
};
