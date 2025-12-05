import { render } from '@testing-library/react';
import { ExampleGuitarRecommendation } from '../example-GuitarRecommendation';

describe('ExampleGuitarRecommendation', () => {
  it('renders without crashing', () => {
    render(<ExampleGuitarRecommendation />);
  });
});
