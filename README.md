# react-spreadsheets

A lightweight, fully customizable, feature rich spreadsheet component for React

# Installation

```sh
$ npm i react-spreadsheets
# or
$ yarn add react-spreadsheets
```

# Screenshot

![Screenshot](https://raw.githubusercontent.com/singh-pk/react-spreadsheets/main/assets/react-spreadsheets.gif)

# Features

- Straight and simple APIs
- Keyboard friendly
- Allows easy transfer of data using `drag & drop`
- `Readonly cells` are allowed
- Inbuilt `search and sort` functionalities
- Accepts `custom filters`
- Allows `custom data formators`
- Accepts `name, text and select` fields

# Usage

### Example

```js
import { SpreadSheet } from 'react-spreadsheets';
import { addCountryCode } from './utils';

const App = () => {
  const tableSchema = [
    { id: 'name', name: 'Name', searchable: true },
    { id: 'age', name: 'Age', type: 'number' },
    {
      id: 'foodPreference',
      name: 'Food Perference',
      options: [
        { value: '', label: '' },
        { value: 'vegan', label: 'Vegan' },
        { value: 'veg', label: 'Veg' },
        { value: 'non-veg', label: 'Non-Veg' }
      ]
    },
    {
      id: 'ph',
      name: 'Phone Number',
      type: 'number',
      searchable: true,
      dataFormator: data => addCountryCode(data)
    }
  ];

  return (
    <div className='App'>
      <SpreadSheet tableSchema={tableSchema} />
    </div>
  );
};
```

### Example: `Add 2 numbers`

```js
import { SpreadSheet } from 'react-spreadsheets';
import { addCountryCode } from './utils';

const App = () => {
  const tableSchema = [
    { id: 'user', name: 'User', type: 'text' },
    { id: 'num1', name: 'Number 1', type: 'number' },
    { id: 'num2', name: 'Number 2', type: 'number' },
    {
      id: 'sum',
      name: 'Sum',
      readOnly: true,
      getRow: ({ num1, num2 }) => {
        const sum = +num1 + +num2;
        if (isNaN(sum)) return '';
        return sum;
      }
    }
  ];

  return (
    <div className='App'>
      <SpreadSheet tableSchema={tableSchema} />
    </div>
  );
};
```

# SpreadSheet Props

#### `tableSchema: (type: TableSchema[]);`

This is the most important and only required prop. Defines the schema of the SpreadSheet.

```sh
  type TableSchema = {
    id: string;
    name: string;
    readOnly?: boolean;
    getRow?: (row: { [key: string]: any }) => any;
    } & (
    | {
        type?: 'text';
        dataFormator?: (data: string) => string;
        searchable?: boolean;
      }
    | {
        type: 'number';
        dataFormator?: (data: number) => number;
        searchable?: boolean;
      }
    | { type: 'select'; options: OptionHTMLAttributes<any>[] }
  ); 
```

#### `initialTableData?: (type: TableSchema[]);`

Holds the initial data for the SpreadSheet. Can be helpful in persisting the table state.

#### `getTableData?: (type: (data: TableSchema[]) => any);`

Subscribe to table data changes using getTableData. This contains the unaltered table data and doesn't get affected by sorting, searching or other custom filters.

#### `getDraftTableData?: (type: (data: TableSchema[]) => any);`

Subscribe to filtered table data changes using getDraftTableData.

#### `onFilter?: (type: (data: TableSchema[]) => TableSchema[]);`

Pass custom filters using onFilter.

#### `searchableValue?: (type: string);`

Searchable value searches the searchable columns passed through tableSchema.

#### `autoGrow?: (type: boolean; default: true);`

Decides if the SpreadSheet is allowed to automatically grow.

#### `sortable?: (type: boolean; default: false);`

If true, allows sorting the SpreadSheet by column

#### `rowNum?: (type: number; default: 1);`

Number of rows in the SpreadSheet

#### `classes?: (type: ClassNames)`

```sh
  type ClassNames = {
    table?: string;
    tableHead?: string;
    tableHeadRow?: string;
    tableHeadCell?: string;
    tableBody?: string;
    tableBodyRow?: string;
    tableBodyCell?: string;
    tableBodyCellSelect?: string;
    tableBodyCellSelected?: string;
  }
```

#### `styles?: (type: InlineStyles)`

```sh
  type InlineStyles = {
    table?: React.CSSProperties;
    tableHead?: React.CSSProperties;
    tableHeadRow?: React.CSSProperties;
    tableHeadCell?: React.CSSProperties;
    tableBody?: React.CSSProperties;
    tableBodyRow?: React.CSSProperties;
    tableBodyCell?: React.CSSProperties;
    tableBodyCellSelect?: React.CSSProperties;
    tableBodyCellSelected?: React.CSSProperties;
  }
```

# Keyboard Shortcuts

- `Ctrl + C` -> Copy
- `Ctrl + V` -> Paste
- `Backspace` / `Delete` -> Delete
- `Enter` -> Edit and move down
- `Shift + Enter` -> Edit and move up
- `Tab` -> Move right
- `Shift + Tab` -> Move left
- `ArrowUp` -> Move up
- `ArrowDown` -> Move down
- `ArrowLeft` -> Move left
- `ArrowRight` -> Move right
