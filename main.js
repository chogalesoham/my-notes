const addbtn = document.querySelector("#add");
const main = document.querySelector(".main");

const updateData = () => {
  const textAreaData = document.querySelectorAll("textarea");
  const notes = [];

  textAreaData.forEach((note) => {
    return notes.push(note.value);
  });

  // console.log(notes);

  localStorage.setItem("notes", JSON.stringify(notes));
};
const addNewNote = (text = "") => {
  const note = document.createElement("div");
  note.classList.add("note");

  const htmlData = ` <div class="operation">
  <button class="edit"><i class="fa-solid fa-pen-to-square"></i></button>
  <button class="dilete"><i class="fa-solid fa-trash"></i></button>
</div>
<div class="main1 ${text ? "" : "hedden"} "></div>
<textarea class="${text ? "hedden" : ""}" ></textarea> `;

  note.insertAdjacentHTML("afterbegin", htmlData);

  // ======= Getting The References =======

  const editBtn = note.querySelector(".edit");
  const delBtn = note.querySelector(".dilete");
  const mainDiv = note.querySelector(".main1");
  const textArea = note.querySelector("textarea");

  delBtn.addEventListener("click", () => {
    note.remove();
    updateData();
  });

  textArea.value = text;
  mainDiv.innerHTML = text;

  editBtn.addEventListener("click", () => {
    mainDiv.classList.toggle("hedden");
    textArea.classList.toggle("hedden");
  });

  textArea.addEventListener("change", (ev) => {
    const value = ev.target.value;
    mainDiv.innerHTML = value;

    updateData();
  });

  main.appendChild(note);
};

const notes = JSON.parse(localStorage.getItem("notes"));

if (notes) {
  notes.forEach((note) => addNewNote(note));
}

addbtn.addEventListener("click", () => addNewNote());
