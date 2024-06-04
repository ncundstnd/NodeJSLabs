const fs = require('fs');
const EventEmitter = require('events');

class DB extends EventEmitter {
  constructor() {
    super();
    const data = fs.readFileSync('database.json', 'utf8');
    this.database = JSON.parse(data);

    this.select = () => {
      console.log("[SELECT]\n");
      process.nextTick(() => {
        this.emit('select', JSON.stringify(this.database, null, 2));
      });
    };

    this.insert = (insertString) => {
      const newItem = JSON.parse(insertString);
      const exists = this.database.some(item => item.id === newItem.id);
      if (!exists) {
        this.database.push(newItem);
        console.log("[INSERT]\n");
        this.saveToFile();
        process.nextTick(() => {
          this.emit('insert', JSON.stringify(this.database, null, 2));
        });
      } else {
        process.nextTick(() => {
          this.emit('error', new Error('Item with this id already exists.'));
        });
      }
    };

    this.update = (updateString) => {
      console.log("[UPDATE]");
      const updatedItem = JSON.parse(updateString);
      const index = this.database.findIndex(item => item.id === updatedItem.id);
      if (index !== -1) {
        this.database[index] = { ...this.database[index], ...updatedItem };
        console.log(updatedItem);
        console.log("id to update: " + updatedItem.id + "\n");
        this.saveToFile();
        process.nextTick(() => {
          this.emit('update', JSON.stringify(this.database[index], null, 2));
        });
      } else {
        process.nextTick(() => {
          this.emit('error', new Error('Item with this id does not exist.'));
        });
      }
    };

    this.delete = (id) => {
      console.log("[DELETE]\n");
      const index = this.database.findIndex(item => item.id === parseInt(id));
      if (index !== -1) {
        const deleted = this.database.splice(index, 1)[0];
        this.saveToFile();
        process.nextTick(() => {
          this.emit('delete', JSON.stringify(deleted, null, 2));
        });
      } else {
        process.nextTick(() => {
          this.emit('error', new Error('Item with this id does not exist.'));
        });
      }
    };
  }

  saveToFile() {
    fs.writeFileSync('database.json', JSON.stringify(this.database, null, 2));
  }
}

module.exports = DB;
