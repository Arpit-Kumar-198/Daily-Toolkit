const noteText = document.getElementById('noteText');
const addNoteBtn = document.getElementById('addNoteBtn');
const notesList = document.querySelector('.notes-list');

window.addEventListener('DOMContentLoaded', () => {
  const notes = JSON.parse(localStorage.getItem('notes-data')) || [];
    notes.forEach(createNoteCard);
    toggleDefaultNoteMessage();
});

// ✅ Add Note
addNoteBtn.addEventListener('click', () => {
  const text = noteText.value.trim();
  if (!text) return;

  const noteObj = {
    id: Date.now(),
    content: text
  };

  const notes = JSON.parse(localStorage.getItem('notes-data')) || [];
  notes.push(noteObj);
  localStorage.setItem('notes-data', JSON.stringify(notes));

  createNoteCard(noteObj);
    noteText.value = '';
    toggleDefaultNoteMessage();
});

// ✅ Create note in DOM
function createNoteCard(noteObj) {
  const noteCard = document.createElement('div');
  noteCard.classList.add('note-card');
  noteCard.setAttribute('data-id', noteObj.id);

  const notePara = document.createElement('p');
  notePara.innerText = noteObj.content;

  const deleteBtn = document.createElement('button');
  deleteBtn.classList.add('delete-note');
  const icon = document.createElement('i');
  icon.classList.add('fa-solid', 'fa-trash');
  deleteBtn.appendChild(icon);

  // ✅ Delete event
  deleteBtn.addEventListener('click', () => {
    noteCard.remove();
    let notes = JSON.parse(localStorage.getItem('notes-data')) || [];
    notes = notes.filter(n => n.id !== noteObj.id);
      localStorage.setItem('notes-data', JSON.stringify(notes));
      toggleDefaultNoteMessage();
  });

  noteCard.appendChild(notePara);
  noteCard.appendChild(deleteBtn);
  notesList.appendChild(noteCard);
}
function toggleDefaultNoteMessage() {
  const hasNotes = document.querySelectorAll('.note-card').length > 0;

  // Clean up old default elements first (prevent duplicates)
  const defaultNote = document.getElementById('default-note');
  const defaultIcon = document.querySelector('.note-span');
  if (defaultNote) defaultNote.remove();
  if (defaultIcon) defaultIcon.remove();

  // If no notes, add default message + icon
  if (!hasNotes) {
    const p = document.createElement('p');
    p.id = 'default-note';
    p.innerText = 'Add Note';

    const span = document.createElement('span');
    span.classList.add('material-symbols-outlined', 'note-span');
    span.innerText = 'assignment';

    notesList.appendChild(p);
    notesList.appendChild(span);
  }
}
