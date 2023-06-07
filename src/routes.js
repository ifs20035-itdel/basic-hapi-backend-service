const {addNotesHandle, displayNotesHandle, getNoteByIdHandler, editNoteHandler, deleteNoteHandle} = require('./handler');

const routes=[
    {
        method: 'POST',
        path: '/notes',
        handler: addNotesHandle,
        options: {
            cors: {
                origin: ['*'],
            },
        },
    },
    {
        method: 'GET',
        path: '/notes',
        handler: displayNotesHandle,
    },
    {
        method: 'GET',
        path: '/notes/{id}',
        handler: getNoteByIdHandler,
    },
    {
        method: 'PUT',
        path: '/notes/{id}',
        handler: editNoteHandler,
    },
    {
        method: 'DELETE',
        path: '/notes/{id}',
        handler: deleteNoteHandle,
    }
];

module.exports = routes;