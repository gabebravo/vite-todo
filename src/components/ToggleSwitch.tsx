import { css } from '@emotion/react';
import '../css/toggle.css';
import { useThemeState } from '../state';
import React from 'react';
import { changeTheme } from '../css/theme';

const rootStyleCss = css`
  position: absolute;
  top: 50px;
  right: 50px;
`;

export const ToggleSwitch = () => {
  const { theme, toggleTheme } = useThemeState();

  React.useEffect(() => {
    changeTheme(theme);
  }, [theme]);

  return (
    <div css={rootStyleCss}>
      <label className="switch">
        <input type="checkbox" onClick={() => toggleTheme()} />
        <span className="slider round"></span>
      </label>
    </div>
  );
};
