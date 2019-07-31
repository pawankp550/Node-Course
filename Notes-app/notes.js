const fs = require('fs')
const chalk= require('chalk')

const getNotes = () => {
    return "your notes..."
}

debugger

const addNotes = (title, body) => {
    const notes = loadNotes()
    // const duplicateNotes = notes.filter((note) => {
    //     return note.title === title
    // })

    const duplicateNote = notes.find(note => note.title === title)

    if(!duplicateNote){
        notes.push({
            title,
            body
        })
        saveNotes(notes)
        console.log(chalk.green.inverse('Note Saved: ', title))
    } else {
        console.log(chalk.red.inverse('duplicate note: ', title))
    }
}

const removeNote = (title) => {
    let notes = loadNotes()
    let isPresent = notes.filter((note) => {
        return note.title === title
    })

    if(isPresent.length === 1){
        notesToKeep = notes.filter((note) => {
            return note.title !== title
        })
        saveNotes(notesToKeep)
        console.log(chalk.green.bold.inverse('Note removed: ',title))
    } else {
        console.log(chalk.red.bold.inverse('Note Does not exists'))
    }
}

const listNotes = () => {
    const allNotes = loadNotes()

    console.log(chalk.blue.inverse('Your Notes'))
    allNotes.forEach(note => {
        console.log(note.title)
    })
}

const readNote = (title) => {
    const allNotes = loadNotes()
    const note = allNotes.find(note => note.title === title)
    if(!note){
        console.log(chalk.red.inverse('No Note found'))
    } else {
        console.log(chalk.blue.inverse(note.title))
        console.log(note.body)
    }
}

const saveNotes = (notes) => {
    const jsonNotes = JSON.stringify(notes)
    fs.writeFileSync('notes.json', jsonNotes)
}

const loadNotes = () => {
    try{
        const notes = fs.readFileSync('notes.json')
        return JSON.parse(notes)
    }
    catch(err){
        return []
    }
}

module.exports = {
    getNotes,
    addNotes,
    removeNote,
    listNotes,
    readNote
}