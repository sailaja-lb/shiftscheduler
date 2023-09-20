import {render, screen} from '@testing-library/react'
import Home from "./Home";
import userEvent from "@testing-library/user-event";
import Login from "./Login";

test('should display _Header', () => {
    const expectedHeader = 'This is Header'

    const mockHeader = () => <div>{expectedHeader}</div>


    render(<Home _Header= {mockHeader}
                 _useSelector={() => {}} />)
    expect(screen.getByText(expectedHeader)).toBeInTheDocument()

});