import { it, expect, describe } from 'vitest';
import { render, screen } from '@testing-library/react';
 import '@testing-library/jest-dom/vitest';
import Greet from '../../src/components/Greet';

import React from 'react';

describe('Greet component', () => {
    it('should render Hello with the name when the name is provided',()=>{
      render(<Greet name="Giro"/>)

      const heading = screen.getByRole('heading');
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveTextContent(/Giro/i);
    })
   
})