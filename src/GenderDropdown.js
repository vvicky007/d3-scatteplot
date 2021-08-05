import { Dropdown } from "react-bootstrap";
export default function GenderDropdown({ changeHandler }) {
  return (
    <Dropdown>
      <Dropdown.Toggle variant="primary" id="dropdown-basic">
        Select a gender
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={changeHandler}>Men</Dropdown.Item>
        <Dropdown.Item onClick={changeHandler}>Women</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}
