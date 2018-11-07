const db = require('./db');

class Todo {
    constructor(id, name, completed) {
        this.id = id;
        this.name = name;
        this.completed = completed;
    }
    // CREATE
    static add(name, completed) {
        return db.one(`insert into todos (name, completed)
            values
                ($1, $2)
            returning id    
        `, [name, completed])
        .then(data =>{
            const t = new Todo(data.id, name, completed);
            return t;
        });
    }    
    // RETRIEVE
    // example of grabbing all the rows
    static getAll() {
        return db.any('select * from todos')
        .then(todoArray => {
            const instanceArray = todoArray.map(todoObj => {
                const t = new Todo(todoObj.id, todoObj.name, todoObj.completed);
                return t;
            });
            return instanceArray;
        })
    }
    
    // example of grabbing one row
    static getById(id) {
        return db.one(`select * from todos where id = $1`, [id])
            .then(result => {
                const t = new Todo(result.id, result.name, result.completed);
                return t;
            })
        }
        
    // UPDATE
    
    assignToUser(userId) {
        return db.result(`
            update todos
                set user_id = $2
            where id = $1    
        `, [this.id, userId]);
    }
    
    // example of updating a row
    updateName(newTodoName) {
        this.name = newTodoName;
        return db.result(`update todos
            set name=$2
        where id=$1`, [this.id, name]);
    }
    
    
    toggleCompleted(id) {
        return db.result(`update todos 
            set completed=$2 
        where id=$1`, [id, !this.completed])
    }
    
    // DELETE
    // example of deleting a row
    deleteById(id) {
        return db.result(`delete from todos where id = $1`, [this.id])
    }
}



// function markCompleted(id) {
//     // return updateCompleted(id, true);
//     return db.result(`update todos 
// 	                    set completed=$2 
// 	                where id=$1`, [id, true]);
// }

// function markPending(id) {
//     // return updateCompleted(id, false);
//     return db.result(`update todos 
// 	                    set completed=$2 
// 	                where id=$1`, [id, false]);
// }


module.exports = {
    add,
    assignToUser,
    deleteById,
    getAll,
    getById,
    markCompleted,
    markPending,
    updateName,
};