import React from 'react';
import Preloader from '../components/common/Preloader/Preloader';
import { connect } from 'react-redux';

// HOC


export const withSuspense = (Component) => {

    
    let SuspenseComponent = (props) => {
        return(
            <React.Suspense fallback={<Preloader />}>
                <Component {...props} />
            </React.Suspense> 
        );
    }

   
    
    
    return SuspenseComponent;
}