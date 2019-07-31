const notes = require('./notes')
const yargs = require('yargs')

// console.log(process.argv)
// customize yargs version
yargs.version('1.1.0')

// setup add command
yargs.command({
    command: 'add',
    describe: 'add a note',
    builder: {
        title: {
            describe: 'New note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'note body',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        notes.addNotes(argv.title, argv.body)
    }
})

// setup remove command
yargs.command({
    command: 'remove',
    describe: 'remove a note',
    builder: {
        title: {
            describe: 'Note to remove',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        notes.removeNote(argv.title)
    }
})

// setup list command
yargs.command({
    command: 'list',
    describe: 'list all notes',
    handler(){
        notes.listNotes()
    }
})

// setup read command
yargs.command({
    command: 'read',
    describe: 'read a note',
    builder: {
        title: {
            describe: 'title of note to read',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
       notes.readNote(argv.title)
    }
})

yargs.parse()