const add = document.querySelector(".add");
const Notes = JSON.parse(localStorage.getItem("Notes")) || [];

// Function to create a new note element
function addNote() {
  const container = document.querySelector(".container");
  const note = document.createElement("div");
  note.classList.add("note");
  const noteHead = document.createElement("div");
  noteHead.classList.add("note-head");

  const editBtn = document.createElement("i");
  editBtn.classList.add("fa-solid", "fa-pen-to-square", "edit");
  editBtn.setAttribute("aria-label", "Click me to edit the note");
  const deleteBtn = document.createElement("i");
  deleteBtn.classList.add("fa-solid", "fa-trash", "delete");
  deleteBtn.setAttribute("aria-label", "Click me to delete the note");

  noteHead.append(editBtn, deleteBtn);
  const noteContent = document.createElement("div");
  noteContent.classList.add("note-content");

  const content = document.createElement("p");

  noteContent.append(content);
  note.append(noteHead, noteContent);
  container.appendChild(note);

  let editing = false;

  // Event listener for edit button
  editBtn.addEventListener("click", () => {
    let prevContent = content.textContent;
  
    editing = true;
    if (editing) {
      content.contentEditable = true;
      content.focus();
    }
  
    const blurHandler = () => {
      content.contentEditable = false;
      editing = false;
      let checker = true;
      const noteContent = content.textContent;
      if (prevContent !== "") {
        const index = Notes.indexOf(prevContent);
        Notes[index] = noteContent;
        localStorage.setItem("Notes", JSON.stringify(Notes));
        checker = false;
      }
      if (checker !== false) {
        Notes.push(noteContent);
        localStorage.setItem("Notes", JSON.stringify(Notes));
      }
      content.removeEventListener("blur", blurHandler);
    };
  
    content.addEventListener("blur", blurHandler);
  });
  


  // Event listener for delete button
  deleteBtn.addEventListener("click", () => {
    note.remove();
  
    const noteContent = content.textContent;
    const noteIndex = Notes.indexOf(noteContent);
  
    if (noteIndex > -1) {
      Notes.splice(noteIndex, 1);
      localStorage.setItem("Notes", JSON.stringify(Notes));
    }
  });
  

  return note;
}
window.addEventListener("load",()=>{
    Notes.forEach((e)=>{
       const note = addNote();
       note.querySelector("p").textContent = e;
    })
})
add.addEventListener("click",addNote);
