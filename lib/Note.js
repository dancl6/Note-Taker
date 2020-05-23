function Note(title, text, id) {
  this.title = title;
  this.text = text;
  this.id = id;
}

Note.prototype.getTitle = function() {
  return `${this.title} is the note's title.`;
}

Note.prototype.getText = function() {
  return `${this.text} is the note's text.`
}

Note.prototype.getId = function() {
  return `${this.id} is the note's id.`;
}

module.exports = Note;