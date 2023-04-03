import React, { useEffect } from 'react';
import Link from 'next/link';
import Icons from '../icons';
import { NoDataWrapper } from './style';
import next from 'next';

const NoData = (props) => {
  const {
    message,
    showNew = false,
    opacities,
    isLink = false,
    addNewTitle,
    height,
    ...rest
  } = props;
  const checkHeight = () => {
    return window.innerHeight;
  };
  useEffect(() => {
    window.addEventListener('resize', (e) => {
      checkHeight();
    });
    return () => {
      window.removeEventListener('resize', () => {});
    };
  }, []);

  return (
    <NoDataWrapper
      style={{
        ...props.style,
        height: height || `calc(${checkHeight()}px - 180px)`
      }}
    >
      <div>
        <div
          style={{
            transform: 'translate(-50%, -50%)',
            top: '50%',
            left: '50%',
            position: 'absolute',
            textAlign: 'center'
          }}
        >
          <Icons type='noData' />
          <div
            style={{
              fontSize: '14px',
              color: '#363a3e',
              opacity: '0.51',
              paddingTop: '3px',
              fontWeight: 'bold',
              letterSpacing: '-0.36px'
            }}
          >
            {message || 'Nothing to see here !'}
          </div>
          {showNew ? (
            <div
              {...rest}
              className='lineHover'
              style={{
                fontSize: '13.5px',
                color: '#ef7db2',
                paddingTop: '3px',
                fontWeight: 'normal',
                letterSpacing: '-0.36px',
                display: 'flex',
                justifyContent: 'center',
                opacity: opacities,
                cursor: 'pointer'
              }}
            >
              <span
                style={{
                  color: '#ef7db2',
                  marginRight: '5px',
                  marginBottom: '2px'
                }}
              >
                {addNewTitle || 'Add new'}
              </span>
              <span className='pluseIconStyle'>+</span>
            </div>
          ) : null}
          {isLink ? (
            <div
              {...rest}
              style={{
                fontSize: '13.5px',
                paddingTop: '3px',
                fontWeight: 'normal',
                letterSpacing: '-0.36px',
                display: 'flex',
                justifyContent: 'center'
              }}
            >
              <Link
                style={{
                  color: '#007bff',
                  cursor: 'pointer',
                  marginRight: '15px'
                }}
                target='_blank'
                to={{ pathname: isLink }}
              >
                {addNewTitle || 'Add new'}
              </Link>{' '}
              <span
                className='plusButton'
                style={{
                  position: 'relative',
                  fontSize: '22.5px',
                  top: '-5px',
                  color: '#007bff',
                  cursor: 'default'
                }}
              >
                +
              </span>
            </div>
          ) : null}
        </div>
      </div>
    </NoDataWrapper>
  );
};

export default NoData;
