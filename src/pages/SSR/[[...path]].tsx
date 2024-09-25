import { useEffect } from 'react';
import { GetServerSideProps } from 'next';
import NotFound from 'src/NotFound';
import Layout from 'src/Layout';
import {
  SitecoreContext,
  ComponentPropsContext
} from '@sitecore-jss/sitecore-jss-nextjs';
import { handleEditorFastRefresh } from '@sitecore-jss/sitecore-jss-nextjs/utils';
import { SitecorePageProps } from 'lib/page-props';
import { sitecorePagePropsFactory } from 'lib/page-props-factory';
import { componentBuilder } from 'temp/componentBuilder';
import JssNextForm from '../../components/Forms/JssNextForm'; // Adjust the import based on your file structure
import { fetchFormFields } from 'lib/form-fetch-fields/form-fetcher'; // Create this utility to fetch form fields

const SitecorePage = ({
  notFound,
  componentProps,
  layoutData,
  headLinks,
  formFields, // Newly added prop for form fields
}: SitecorePageProps & { formFields?: any }): JSX.Element => {
  useEffect(() => {
    handleEditorFastRefresh();
  }, []);

  if (notFound || !layoutData.sitecore.route) {
    return <NotFound />;
  }

  const isEditing = layoutData.sitecore.context.pageEditing;

  return (
    <ComponentPropsContext value={componentProps}>
      <SitecoreContext
        componentFactory={componentBuilder.getComponentFactory({ isEditing })}
        layoutData={layoutData}
      >
        <Layout layoutData={layoutData} headLinks={headLinks} />
        {formFields && <JssNextForm fields={formFields} />} {/* Render the form if fields are available */}
      </SitecoreContext>
    </ComponentPropsContext>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const props = await sitecorePagePropsFactory.create(context);
  const { params } = context;

  // Fetch form fields based on the path parameters
  const formFields = await fetchFormFields(params?.path);

  return {
    props: {
      ...props,
      formFields, // Pass the fetched form fields
    },
    notFound: props.notFound,
  };
};

export default SitecorePage;