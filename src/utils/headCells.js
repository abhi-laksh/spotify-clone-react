import React from 'react';
import piano from '../assets/images/piano.jpg';
import { BACKEND } from "../backend/api";
import { formatDateTime } from "./date";

export const artistsHeadCells = [

    {
        name: "id",
        label: "Id",
        options: {
            display: false,
            viewColumns: false,
            filter: false
        }
    },
    {
        name: "name",
        label: "Name",
    },
    {
        name: "description",
        label: "Description",

        options: {
            filter: false
        },

    },
    {
        name: "timestamp",
        label: "Created At",
        options: {
            customBodyRender: (value, tableMeta, updateValue) => formatDateTime(value)
        }
    },
    {
        name: "action",
        label: "Action",
        options: {
            searchable: false,
            filter: false,
            viewColumns: false,
            sort: false,
            print: false,
            draggable: false,
        }
    },
];

export const genresHeadCells = [

    {
        name: "id",
        label: "Id",
        options: {
            display: false,
            viewColumns: false,
            filter: false
        }
    },
    {
        name: "name",
        label: "Name",
    },
    {
        name: "description",
        label: "Description",

        options: {
            filter: false,
        },

    },
    {
        name: "timestamp",
        label: "Created At",
        options: {
            customBodyRender: (value, tableMeta, updateValue) => formatDateTime(value)
        }
    },
    {
        name: "action",
        label: "Action",
        options: {
            searchable: false,
            filter: false,
            viewColumns: false,
            sort: false,
            print: false,
            draggable: false,
        }
    },
];

export const moodsHeadCells = [

    {
        name: "id",
        label: "Id",
        options: {
            display: false,
            viewColumns: false,
            filter: false
        }
    },
    {
        name: "name",
        label: "Name",
    },
    {
        name: "description",
        label: "Description",

        options: {
            filter: false,
        },

    },
    {
        name: "timestamp",
        label: "Created At",
        options: {
            customBodyRender: (value, tableMeta, updateValue) => formatDateTime(value)
        }
    },
    {
        name: "action",
        label: "Action",
        options: {
            searchable: false,
            filter: false,
            viewColumns: false,
            sort: false,
            print: false,
            draggable: false,
        }
    },
];


export const songsHeadcells = [
    {
        name: "thumbnail",
        label: "thumbnail",
        options: {
            customBodyRender: (value) => <img
                src={value ? `${BACKEND}/${value}` : piano}
                className={"avatar"}
            />,

            searchable: false,
            filter: false,
            viewColumns: false,
            sort: false,
            print: false,
            draggable: false,
        }
    },
    {
        name: "song_name",
        label: "song name",
        options: {

        }
    },
    {
        name: "song_description",
        label: "song description",
        options: {

            viewColumns: false,
            filter:false,
        }
    },
    {
        name: "artist_name",
        label: "artist",
        options: {

        }
    },
    {
        name: "genre_name",
        label: "genre",
        options: {

        }
    },
    {
        name: "mood_name",
        label: "mood",
        options: {

        }
    },
    {
        name: "length",
        label: "Length",
        options: {

        }
    },
    {
        name: "id",
        label: "id",
        options: {
            display: false,

            searchable: false,
            filter: false,
            viewColumns: false,
            sort: false,
            print: false,
            draggable: false,
        }
    },
    {
        name: "mood_description",
        label: "mood_description",
        options: {
            display: false,

            searchable: false,
            filter: false,
            viewColumns: false,
            sort: false,
            print: false,
            draggable: false,
        }
    },
    {
        name: "mood_id",
        label: "mood_id",
        options: {
            display: false,

            searchable: false,
            filter: false,
            viewColumns: false,
            sort: false,
            print: false,
            draggable: false,
        }
    },
    {
        name: "genre_description",
        label: "genre_description",
        options: {
            display: false,
            searchable: false,
            filter: false,
            viewColumns: false,
            sort: false,
            print: false,
            draggable: false,
        }
    },
    {
        name: "genre_id",
        label: "genre_id",
        options: {

            searchable: false,
            filter: false,
            viewColumns: false,
            sort: false,
            print: false,
            draggable: false,
            display: false,
        }
    },
    {
        name: "artist_description",
        label: "artist_description",
        options: {
            display: false,

            searchable: false,
            filter: false,
            viewColumns: false,
            sort: false,
            print: false,
            draggable: false,
        }
    },
    {
        name: "artist_id",
        label: "artist id",
        options: {
            display: false,
            searchable: false,
            filter: false,
            viewColumns: false,
            sort: false,
            print: false,
            draggable: false,
        }
    },
    {
        name: "action",
        label: "Action",
        options: {
            searchable: false,
            filter: false,
            viewColumns: false,
            sort: false,
            print: false,
            draggable: false,
        }
    },
]