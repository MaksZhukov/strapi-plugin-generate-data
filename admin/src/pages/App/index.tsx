/**
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AnErrorOccurred } from '@strapi/helper-plugin';
import pluginId from '../../pluginId';
import HomePage from '../HomePage';

const App: React.VoidFunctionComponent = () => {
    return (
        <div>
            <Routes>
                <Route path={`/plugins/${pluginId}`} element={<HomePage />} />
                <Route element={<AnErrorOccurred />} />
            </Routes>
        </div>
    );
};

export default App;
