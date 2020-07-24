import { addDecorator, addParameters } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import { DocsPage, DocsContainer } from '@storybook/addon-docs/blocks';

import { sortStoriesWithExperiences } from './utils';

addDecorator(withKnobs);
addDecorator(withA11y);
addParameters({
  options: {
    docs: {
      container: DocsContainer,
      page: DocsPage,
    },
    showRoots: true,
    storySort: sortStoriesWithExperiences,
  },
});
