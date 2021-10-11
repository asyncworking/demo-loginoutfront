import Enzyme, { shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import CompanyProfile from '../components/CompanyProfile/CompanyProfile';

Enzyme.configure({ adapter: new Adapter() });

const setUp = () =>
  // eslint-disable-next-line react/react-in-jsx-scope,implicit-arrow-linebreak
  shallow(<CompanyProfile getCompName={() => {
  }}
  />);
describe('submit without name input', () => {
  let component:Enzyme.ShallowWrapper<any, Readonly<{}>, React.Component<{}, {}, any>>;
  beforeEach(() => {
    component = setUp();
  });
  it('should focus on name textarea when no name input', () => {
    const onSubmit = component.find('.btn');
    const textarea = component.find('.inputContainer');
    expect(onSubmit.length).toBe(1);
    expect(textarea.text.length).toBe(0);
  });
});
