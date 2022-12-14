import { Button as ChakraButton } from '@chakra-ui/react';
import { ForwardRefRenderFunction, forwardRef } from 'react';

import { variantToStylesMapper } from './button.defaults';
import { IButtonProps } from './button.types';

const ButtonComponent: ForwardRefRenderFunction<HTMLButtonElement, IButtonProps> = (
  { mode = 'dark', ...restProps },
  ref,
): JSX.Element => (
  <ChakraButton
    ref={ref}
    borderRadius={0}
    borderWidth="2px"
    {...variantToStylesMapper[mode]}
    {...restProps}
  />
);

export const Button = forwardRef(ButtonComponent);
