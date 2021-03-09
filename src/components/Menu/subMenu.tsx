import React, { useContext } from 'react';
import classNames from 'classnames'
import { MenuContext } from './menu'

export interface SubMenuProps {
    index?: string;
    title: string;
    className?: string;
}