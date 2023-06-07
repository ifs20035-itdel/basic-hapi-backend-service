const {nanoid} = require('nanoid');
const notes = require('./notes');

const addNotesHandle = (request, h)=>{
    const {title, tags, body} = request.payload;

    const id = nanoid(16);
    const createAt = new Date().toISOString();
    const updatedAt = createAt;
    
    const newNote = {
        id, title, createAt, updatedAt, tags, body
    };
    
    notes.push(newNote);
    
    const isSuccess = notes.filter((note) => note.id === id).length>0;
    
    if(isSuccess){
        const response = h.response({
            status: 'success',
            message: 'Catatan berhasil ditambahkan',
            data: {
                noteId: id,
            }
        });
        response.code(201);
        return response;
    }
    const response = h.response({
        status:'fail',
        message: 'Catatan gagal ditambahkan',
    });
    response.code(500);
    return response;
};

const displayNotesHandle = (request, h)=>({
    status: 'success',
    data:{
        notes,
    },
});

const getNoteByIdHandler = (request, h)=>{
    const {id} = request.params;
    const note = notes.filter((n)=> n.id===id)[0];
    
    if(note !== undefined){
        return {
            status: 'success',
            data:{
                note,
            },
        };
    }
    
    const response = h.response({
        status: 'fail',
        message: 'Catatan tidak ditemukan',
    });
    response.code(404);
    return response;
};

const editNoteHandler = (request, h)=>{
    const {id} = request.params;
    const {title, tags, body} = request.payload;
    const updatedAt = new Date().toISOString();
    
    const index = notes.findIndex((note)=>note.id === id);

    if(index!== -1){
        notes[index]={
            ...notes[index] ,title, tags, body, updatedAt
        };
        const response = h.response({
            status: 'success',
            message: 'Catatan berhasil diperbaharui',
        });
        response.code(200);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'Gagal memperbarui catatan. Id catatan tidak ditemukan',
    });
    response.code(404);
    return response;
}

const deleteNoteHandle=(request, h)=>{
    const {id} = request.params;
    
    const index = notes.findIndex((note)=> note.id === id);

    if(index !== -1){
        notes.splice(index, 1);
        const response = h.response({
            status: 'success',
            message: 'Catatan berhasil dihapus',
        });
        response.code(200);
        return response;
        // delete notes[index];
        // const isFailed = notes.filter((note) => note.id === id).length>0;
        // if(!isFailed){
            // const response = h.response({
            //     status: 'success',
            //     message: 'Catatan berhasil dihapus'
            // });
            // response.status(200);
            // return response;
        // }
    }
    const response = h.response({
        status: 'fail',
        message: 'Catatan gagal dihapus. Id catatan tidak ditemukan'
    });
    response.code(404);
    return response;
}


module.exports = {addNotesHandle, displayNotesHandle, getNoteByIdHandler, editNoteHandler, deleteNoteHandle};