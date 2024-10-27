import React from 'react';
import { Text, RichText, NextImage as JssImage } from '@sitecore-jss/sitecore-jss-nextjs';


const Article = (props: { fields: { data: { datasource: any } } }) => {
  let url;
 // Check if `window` is defined before using it
 if (typeof window !== 'undefined') {
  url = new URL(window.location);
  debugger;
  url.searchParams.set('id', props?.sitecoreContext?.itemId ); // Assuming datasource is what you want to set
  window.history.pushState({}, '', url);
  console.log(props.fields.ArticleCategoryTags[0].fields?.Title.value);
} 
 
  
  const styles = {
    container: {
      maxWidth: '1000px',
      margin: 'auto',
      background: 'white',
      borderRadius: '8px',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
      padding: '20px',
    },
    image: {
      width: '100%',
      borderRadius: '8px',
    },
    title: {
      marginTop: '20px',
      fontSize: '2em',
      color: '#333',
    },
    description: {
      color: '#666',
      lineHeight: 1.6,
    },
  };
  const labelStyle={
    backgroundColor: 'lightblue',
    borderRadius: '20px', // Adjust for more or less curvature
    padding: '4px 8px', // Optional: add some padding
    
  };
  return (
    <>
      <div style={styles.container}>
        <span style={labelStyle}>
          {props.fields.ArticleCategoryTags.map((tag) => tag.fields?.Title.value).join(', ')}
        </span>
        <Text tag="h1" className="contentTitle" field={props?.fields?.PublishedDate} />
        <Text tag="h1" className="contentTitle" field={props?.fields?.Title} />
        <JssImage field={props?.fields?.CardImage} />
        <RichText className="contentDescription" field={props.fields.Content} />
      </div>
    </>
  );
};
export default Article;
