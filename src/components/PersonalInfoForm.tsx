import React, { useEffect, useState } from 'react';
import { ComponentParams } from '@sitecore-jss/sitecore-jss-nextjs';
import { SitecoreForm } from '@sitecore-jss/sitecore-jss-forms';
import { Form } from '@sitecore-jss/sitecore-jss-react-forms';
import { sitecoreApiKey } from 'temp/config';
import { NextRouter } from 'next/router';
import { dictionaryServiceFactory } from 'lib/dictionary-service-factory';
interface FormProps {
  rendering: SitecoreForm & { params: ComponentParams };
  params: ComponentParams;
  router: NextRouter;
}

export const Default = (props: FormProps): JSX.Element => {
  //const id = props.params.RenderingIdentifier;
  console.log('ren', props);
  const fields: any = props;
  const dictionaryService = dictionaryServiceFactory.create("ARBRevamp");
  const [headingValue, setGallerydValue] = useState<string | null>(null);
  useEffect(() => {
    dictionaryService.fetchDictionaryData('en').then(data => {
      console.log("Fetched data:", data); // Log the fetched data
      if (data && data.Content) {
        setGallerydValue(data.Content);
      }
    });
  }, []);

  return (
    // <div className={`component ${props.params.styles}`} id={id ? id : undefined}>
    //   <div className="component-content">
    //     <p>Form Component</p>
    //   </div>
    // </div>
    <>
    <p>{headingValue}</p>
    <Form
      language={'en'}
      form={fields.fields}
      sitecoreApiHost={''}
      sitecoreApiKey={sitecoreApiKey}
    />

    </>
    
  );
};