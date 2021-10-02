import React from 'react'
import Popular from './Popular/Popular';
import CoinHeader from './CoinHeader/CoinHeader';
import './Header.scss';

export default function Header() {
    return (
        <div className="header">
            <Popular />
            <CoinHeader />
        </div>
    )
}
