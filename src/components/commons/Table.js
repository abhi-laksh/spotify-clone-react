import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import MUIDataTable from "mui-datatables";
import React from 'react';

function Table({
    columns,
    tableData,
    options = {},
    title = '',
    showSelectionToolbar = false,
    getSelectData = () => { },
    ...props
}) {
    const getMuiTheme = () => createMuiTheme({
        overrides: {
            body: {
                fontFamily: '"Montserrat", sans-serif',
            },
            MUIDataTableToolbarSelect: {
                root: {
                    backgroundColor: "#181b3e",
                },
                title: {
                    color: "#ddd",
                }
            },
            MUIDataTableSelectCell: {
                headerCell: {
                    backgroundColor: "#181b3e",
                }
            },
            MuiTypography: {
                h6: {
                    fontFamily: '"Oswald", sans-serif',
                    color: "#ddd",
                    fontWeight: "400",
                }
            },
            MUIDataTableViewCol: {
                title: {
                    color: "#ddd",
                },
                label: {
                    color: "#ddd",
                }
            },
            MuiSvgIcon: {
                root: {
                    color: "#fc5c65 !important",

                },
            },
            MuiInputBase: {
                root: {
                    color: "#ddd",
                },
            },
            MuiInput: {
                underline: {
                    "&:before": {
                        borderBottom: "1px solid rgb(252 92 101 / 23%)",

                    }
                }
            },
            MUIDataTableFilter: {
                root: {
                    maxHeight: "360px",
                }
            },
            MuiButton: {
                root: {
                    color: "#ddd",
                    fontFamily: '"Montserrat", sans-serif',
                    fontWeight: "600",
                    fontSize: "0.75rem",
                }
            },
            MuiPaper: {
                root: {
                    color: "#ddd",
                    backgroundColor: "#181b3e",
                },
            },
            MuiTablePagination: {
                root: {
                    color: "#ddd",
                }
            },
            MUIDataTableFilter: {
                root: {
                    backgroundColor: "#232655",
                },
                checkboxFormControlLabel: {
                    color: "#ddd",
                },
                resetLink: {
                    color: "#fc5c65 !important",
                },
                checkboxListTitle: {
                    color: "#ddd",

                },
                title: {
                    color: "#ddd",

                },
            },
            MUIDataTableHeadCell: {
                fixedHeader: {
                    backgroundColor: "#232655"
                },
                sortActive: {
                    color: "#fc5c65 !important",
                }
            },
            MuiTableSortLabel: {
                root: {
                    color: "#fc5c65 !important",

                },
                icon: {
                    color: "#fc5c65 !important",
                },
                active: {
                    color: "#fc5c65 !important",
                }
            },

            MUIDataTableBodyCell: {
                root: {
                    backgroundColor: "#000310"
                },
            },
            MuiTableCell: {
                root: {
                    borderBottom: "1px solid rgb(34 35 56)",
                    fontFamily: '"Montserrat", sans-serif',
                    fontSize: "0.75rem",
                    fontWeight: "600",
                    padding: "0.75rem 1rem",
                    maxWidth: "30vw",
                },
                head: {
                    color: "#ddd",
                    fontWeight: "600",

                },
                body: {
                    color: "#ddd"
                }
            }
        }
    })

    return (
        <MuiThemeProvider theme={getMuiTheme()}>
            <MUIDataTable
                title={title}
                data={tableData}
                columns={columns}
                options={{
                    filterType: 'checkbox',
                    print: false,
                    download: false,
                    elevation: 0,
                    selectableRows: 'none',
                    customToolbarSelect: (selectedRows, displayData, setSelectedRows) => <button className="button-secondary1 text-white rounded mr-3 px-4 py-2 text-uppercase" onClick={getSelectData(selectedRows, displayData, setSelectedRows)}>Delete</button>,

                    ...options
                }}
                {...props}
            />
        </MuiThemeProvider>
    );
}

export default Table;