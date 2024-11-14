import React from 'react';
import { sitecoreApiHost, sitecoreApiKey } from 'temp/config';

type EmbedFormProps = {
  [key: string]: {
    [key: string]: {
      [key: string]: {
        [key: string]: string;
      };
    };
  };
};

export const EmbeddedForm = (props: EmbedFormProps): JSX.Element => {
  const itemID = props?.rendering?.fields?.formItemId.value as string;
  const formData = `
        <div class="container">
          <scef-form formid="${itemID}"></scef-form>
        </div>
        <script type="text/javascript"
          src="${sitecoreApiHost}/sitecore-embeddableforms.umd.js?sc_apikey=${sitecoreApiKey}">
        </script>
      `;
  return <div dangerouslySetInnerHTML={{ __html: formData }} />;
};

export default EmbeddedForm;
