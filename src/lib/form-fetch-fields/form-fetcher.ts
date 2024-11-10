export const fetchFormFields = async (path: string | string[] | undefined) => {

  if (!path) {
    throw new Error('Path is required to fetch form fields');
  }

  // Example logic for different paths
  if (Array.isArray(path)) {
    path = path[0]; // Handle array case if necessary
  }
    // Implement your logic to fetch form fields based on the path
    // This could be an API call or fetching from a local source.
    return {
      title: 'Dynamic Form',
      fields: [
        {
          id: 'name',
          type: 'text',
          label: 'Name',
          required: true,
        },
        // Add more fields as needed
      ],
    };
  };