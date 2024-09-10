import { Form } from '@sitecore-jss/sitecore-jss-react-forms';
import React from 'react';
import { NextRouter, withRouter } from 'next/router';
import { sitecoreApiKey } from 'temp/config';

const JssNextForm = ({ fields, router }: { fields: any; router: NextRouter }) => {
  return (
    <section>
      <Form
      language={router.locale}
      form={fields}
      sitecoreApiHost={''}
      sitecoreApiKey={sitecoreApiKey}
      onRedirect={(url) => router.push(url)}
    />
    </section>
    
  );
};

export default withRouter(JssNextForm);