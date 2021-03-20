import {
    READ_FILE_SUCCESS,
    CREATE_FILE_SUCCESS,
    UPDATE_FILE_SUCCESS,
    DELETE_FILE_SUCCESS,
} from "./actionTypes";
import {
    createFile,
    deleteFile,
    readFile,
    updateFileContent,
    updateFileName,
} from "../../services/api";

const readFileSucess = file => {
    return { type: READ_FILE_SUCCESS, file };
};

const createFileSucess = (file, parentID) => {
    return { type: CREATE_FILE_SUCCESS, item: file, parentID };
};

const updateFileSucess = file => {
    return { type: UPDATE_FILE_SUCCESS, file };
};

const deleteFileSucess = id => {
    return { type: DELETE_FILE_SUCCESS, id };
};

export const createFileDispatch = (name, parentID) => {
    return dispatch => {
        const file = createFile(name, parentID);
        setTimeout(() => {
            dispatch(createFileSucess(file, parentID));
        }, Math.random() * 25);
    };
};

export const readFileDispatch = id => {
    return dispatch => {
        const file = readFile(id);
        setTimeout(() => {
            dispatch(readFileSucess(file));
        }, Math.random() * 25);
    };
};

export const updateFileContentDispatch = (file, content) => {
    return dispatch => {
        const newFile = updateFileContent(file, content);
        setTimeout(() => {
            dispatch(updateFileSucess(newFile));
        }, Math.random() * 25);
    };
};

export const updateFileNameDispatch = (file, name) => {
    return dispatch => {
        const newFile = updateFileName(file, name);
        setTimeout(() => {
            dispatch(updateFileSucess(newFile));
        }, Math.random() * 25);
    };
};

export const deleteFileDispatch = id => {
    return dispatch => {
        const idToDelete = deleteFile(id);
        setTimeout(() => {
            dispatch(deleteFileSucess(idToDelete));
        }, Math.random() * 25);
    };
};
