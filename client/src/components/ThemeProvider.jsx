import React from 'react';
import { useSelector } from 'react-redux';

 const ThemeProvider = ({ children }) => {
     const { theme } = useSelector((state) => state.theme);
     
   React.useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [theme]);
     
    return (
        <div className={theme}>
            <div className='bg-white text-gray-700 dark:text-gray-200 dark:bg-gray-950'>
                {children}  
            </div>
        </div>
    ) 
}

export default ThemeProvider;