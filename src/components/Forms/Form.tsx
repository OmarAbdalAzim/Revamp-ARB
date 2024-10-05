import{ Form } from '@sitecore-jss/sitecore-jss-react-forms';
import React from 'react';
import{ withRouter } from 'next/router';
import{ sitecoreApiHost, sitecoreApiKey } from '../../temp/config';
const JssNextForm = ({ fields, router }: any)=>{
return(
   <Form
      form={fields}
      sitecoreApiHost={''}
      sitecoreApiKey={sitecoreApiKey}
      onRedirect={(url)=> router.push(url)}>
           
      </Form>
)
};
export default withRouter(JssNextForm);