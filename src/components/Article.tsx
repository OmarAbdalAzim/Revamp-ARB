import React from 'react';
import { Text, RichText, NextImage as JssImage } from '@sitecore-jss/sitecore-jss-nextjs';
import styles from '../assets/custom-style'; // Adjust the path if needed

const Article = (props: any) => {
  let url;
  // Check if `window` is defined before using it
  if (typeof window !== 'undefined') {
    url = new URL(window.location.toString());
    url.searchParams.set('id', props?.sitecoreContext?.itemId); // Assuming datasource is what you want to set
    window.history.pushState({}, '', url);
  }
  return (
    <>
      <div style={styles.DetailsContainer}>
        <span style={styles.DetailsLabelStyle}>
          {props.fields.ArticleCategoryTags.map((tag: any) => tag.fields?.Title?.value).join(', ')}
        </span>
        <Text tag="h1" className="contentTitle" field={props?.fields?.PublishedDate} />
        <Text tag="h1" className="contentTitle" field={props?.fields?.Title} />
        <JssImage field={props?.fields?.CardImage} />
        <RichText className="contentDescription" field={props?.fields?.Content} />
      </div>
    </>
  );
};
export default Article;
