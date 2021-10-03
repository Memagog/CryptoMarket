import React from 'react';
import { FormControl, InputGroup } from 'react-bootstrap';

export default function CoinBagForm(props) {
  return (
    <InputGroup className="mb-3">
      <InputGroup.Text>Value</InputGroup.Text>
      <FormControl onChange={props.onChangeValue} aria-label="Coin name" />
    </InputGroup>
  );
}
