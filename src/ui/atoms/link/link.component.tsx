import { Link as ChakraLink } from '@chakra-ui/react';
import { ForwardRefRenderFunction, forwardRef } from 'react';

import { ILinkProps } from './link.types';

const LinkComponent: ForwardRefRenderFunction<HTMLAnchorElement, ILinkProps> = (
  props,
  ref,
): JSX.Element => <ChakraLink ref={ref} {...props} />;

export const Link = forwardRef(LinkComponent);
