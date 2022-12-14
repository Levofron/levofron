import { TabPanel as ChakraTabPanel } from '@chakra-ui/react';
import { ForwardRefRenderFunction, forwardRef } from 'react';

import { ITabPanelProps } from './tab-panel.types';

const TabPanelComponent: ForwardRefRenderFunction<HTMLDivElement, ITabPanelProps> = (
  props,
  ref,
): JSX.Element => <ChakraTabPanel ref={ref} {...props} />;

export const TabPanel = forwardRef(TabPanelComponent);
