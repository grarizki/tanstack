import { render } from '@testing-library/react';
import { ExampleAIAssistant } from '../example-AIAssistant';

describe('ExampleAIAssistant', () => {
  it('renders without crashing', () => {
    render(<ExampleAIAssistant />);
  });
});
