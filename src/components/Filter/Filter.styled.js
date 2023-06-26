import styled from 'styled-components';
import { baseInputStyles } from '../UI/Base.styled';

export const Input = styled.input`
  ${baseInputStyles} {
    display: block;
    margin-inline: auto;
    padding-inline: 1em;
    width: 300px;
    box-shadow: 0 2px 4px blue;
  }
`;
