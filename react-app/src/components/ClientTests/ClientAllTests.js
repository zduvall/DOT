import { useClientTestsContext } from './index';

export default function ClientAllTests() {
  const {
    compTestObjs,
    setSelectedTest,
    setDatapoint,
  } = useClientTestsContext();

  return (
    <div className='site__sub-section client-tests__sub-section comp-tests'>
      <h2 className='comp-tests__title cntr-txt-sml-margin'>Completed Tests</h2>
      <ul className='comp-tests__list'>
        {compTestObjs.map((testObj) => {
          return (
            <li
              key={testObj.code}
              className='comp-tests__option'
              onClick={() => {
                setSelectedTest(testObj);
                setDatapoint(null);
              }}
            >
              {testObj.abbr}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
