import { project, files } from "./objects";

export const readProject = () => {
    return project;
};

export const readFile = id => {
    for(const index in files){
        if(files[index].id==id){
            return files[index];
        }
    }
};

export function findElement(directory, elementID){
    if(elementID==4){
        return directory;
    }
    for(let index=0; index<directory.content.length; index++){
        console.log("checking element: ", directory.content[index]);
            if(directory.content[index].id==elementID){
                return directory.content[index];
            }
            else if(directory.content[index].type=='folder'){
                const returnPath = findElement(directory.content[index], elementID);
                if(typeof returnPath !== 'undefined'){
                    return returnPath;
                }
            }
    }
}

export function findParentFolder(directory, elementID){
    for(let index=0; index<directory.content.length; index++){
            if(directory.content[index].id==elementID){
                return directory.content;
            }
            else if (directory.content[index].type=='folder'){
                const returnPath = findParentFolder(directory.content[index], elementID);
                if(typeof returnPath !== 'undefined'){
                    return returnPath;
                }
            }
    }
}

export function numFileObjects() {
    let numFiles = 0;
    for(const f in files){
        numFiles = numFiles + 1;
    }
    return numFiles;
}

export const createFile = (name, parentID) => {
    const id = Date.now();
    //add file to files
    const fileForFiles = {id: id, name: name, type: "file", content: `# %% [markdown]
    # iFrame example for file ${name}
    Try editing a cell! 
    # %% [javascript]
    const x = "Hello world!"
    x`};
    const numFiles = numFileObjects();
    files[numFiles] = fileForFiles;
    //add files to project
    const fileForProject = {id: id, name: name, type: "file"};
    const createFilePath = findElement(project.fileSystem[0], parentID);
    createFilePath.content.push(fileForProject);
    return {
        id: id,
        type: "file",
        name,
        content: "",
    };
};

export const createFolder = (name, parentID) => {
    const id = Date.now();
    const folderForProject = {id: id, name: name, type: "folder", content:[]};
    const createFilePath = findElement(project.fileSystem[0], parentID)
    createFilePath.content.push(folderForProject)
    return {
        id: id,
        type: "folder",
        name,
        content: [],
    };
};

export const updateFolderName = (folder, name) => {
    const updateFilePath = findElement(project.fileSystem[0], folder.id)
    updateFilePath.name = name;
    return {
        ...folder,
        name,
    };
};

export const deleteFolder = id => {
    const folderParent = findParentFolder(project.fileSystem[0], id)
    for(let index=0; index < folderParent.length; index++){
        if(id===dfolderParent[index].id){
            folderParent.splice(index, 1)
            break;
        }
    }
    return id;
};

export const updateFileContent = (file, content) => {
    const numFiles = numFileObjects();
    for(let index=0; index<numFiles; index++){
        if(files[index].id===file.id){
            files[index].content = content;
            break;
        }
    }
    return { ...file, content };
};

export const updateFileName = (file, name) => {
    //update file name in files
    const numFiles = numFileObjects();
    for(let index=0; index<numFiles; index++){
        if(files[index].id===file.id){
            files[index].name = name;
            break;
        }
    }
    //update file name in project
    const updateFile = findElement(project.fileSystem[0], file.id);
    updateFile.name = name;
    return { ...file, name };
};

export const deleteFile = id => {
    const numFiles = numFileObjects();
    for(let index=0; index<numFiles; index++){
        if(files[index].id===id){
            delete files[index];
            break;
        }
    }
    let parentFolder = findParentFolder(project.fileSystem[0], id);
    for(let index=0; index < parentFolder.length; index++){
        if(id===parentFolder[index].id){
            parentFolder.splice(index, 1)
            break;
        }
    }
    return id;
};

export const updateProject = name => {
    project.name = name;
    return name;
};
