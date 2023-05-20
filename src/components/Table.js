import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import {theme} from '../styles/theme'
export default function Table(props) {
  const { columns, rows, ...others } = props;
  return (
    <div style={{ width: '100%' }}>
      <DataGrid
         sx={{
          '& .MuiDataGrid-menu .MuiPaper-root': {
            background: 'red !important',
          },
          '& .MuiDataGrid-columnHeaderTitle': {
            fontWeight:500,
          },
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: theme.appThemeColors.mainColor,
            color: '#FFFFFF',
            fontFamily: 'Nunito',
            fontStyle: 'normal',
            fontWeight: 'bold',
            fontSize: '14px',
            minHeight: '40px!important',
            maxHeight: '40px!important',
            borderRadius: '0px !important',
            '& .MuiDataGrid-columnHeaderTitleContainer:hover': {
              '& .MuiSvgIcon-root, .MuiSvgIcon-root:hover': {
                color: 'white',
                opacity: 1,
              },
            },
            '& .MuiDataGrid-iconButtonContainer': {
              visibility: 'visible',
              width: '0 !important',
              '& .MuiSvgIcon-root, .MuiSvgIcon-root:hover': {
                //   color: "white",
                // opacity: 1,
              },
            },
            '& .MuiDataGrid-sortIcon, .css-zgts79-MuiDataGrid-root .MuiDataGrid-filterIcon':
              {
                color: 'white !important',
                opacity: 1,
              },
            '& .MuiDataGrid-columnHeaderCheckbox': {
              color: 'white !important',
              opacity: 1,
              '& .MuiSvgIcon-root, .MuiSvgIcon-root:hover': {
                transform: 'scale(0.8)',
                color: 'white',
              },
            },
            '& .MuiDataGrid-columnSeparator--sideRight': {
              display: 'none',
            },
          },
          '.MuiDataGrid-row:nth-child(odd)': {
            backgroundColor: theme.appThemeColors.rowBackgroundColor,
          },
          '& .MuiDataGrid-row': {
            '& .MuiSvgIcon-root': {
              transform: 'scale(0.8)',
              color: theme.appThemeColors.mainColor,
            },
            '& .Mui-disabled': {
              svg: { color: 'rgba(0, 0, 0, 0.26) !important' },
            },
            '& .MuiDataGrid-cell, .MuiDataGrid-cell--textLeft': {
              fontFamily: 'Nunito',
              fontStyle: 'normal',
              fontWeight: 'normal',
              color: theme.appThemeColors.black,
              borderBottom: '1px solid rgba(55, 139, 211, 0.12) !important',
            },
          },
          '.MuiDataGrid-row:hover': {
            backgroundColor: theme.appThemeColors.lightFooterColor,
          },
          '.MuiDataGrid-columnHeader:focus': {
            outline: 'none !important',
          },
          '.MuiDataGrid-cell:focus': {
            outline: 'none !important',
          },
          '.MuiDataGrid-columnHeader:focus-within': {
            outline: 'none !important',
          },
          '.MuiDataGrid-cell:focus-within': {
            outline: 'none !important',
          },
          '.MuiDataGrid-footerContainer': {
            height: '28px !important',
          },
          '.MuiDataGrid-selectedRowCount': {
            visibility: 'hidden !important',
          }
        }}
        autoHeight
        hideFooterPagination={true}
        hideFooter={true}
        hideFooterRowCount={true}
        hideFooterSelectedRowCount={true}
        getRowId={(row) => row?.taskname}
        columns={columns ?? []}
        rows={rows ?? []}
      />
    </div>
  );
}
